<script setup lang="ts">
import {onMounted, ref} from "vue";
import {instance} from "../../axios/http.ts";
import {useVipBookListsStore} from "../store/pinia.ts";
import * as dayjs from "dayjs";
import {useTitle} from "@vueuse/core";
const vipBook = useVipBookListsStore()
const value = ref('')
const clickWho = ref('')
const refrash=()=>{
    instance.get('/vipbooks').then(res=>{
        vipBook.resetBooks(res.data.list)})
}
onMounted(()=>{
refrash()
})
function generateRandomNumber(min, max) {
    // 随机生成一个介于min和max之间的数字
    return Math.floor(Math.random() * (max - min + 1) + min);
}
const choose = (bookid)=>{
    console.log(bookid)
    clickWho.value=bookid
    instance.get('/vipbook/content',{
        params:{
            code:clickWho.value
        }
    }).then(res=>{
       value.value = res.data.content.content
    })
}

const newBook = ()=>{
    instance.patch('/vipbooks',{
        title: `新笔记本${generateRandomNumber(1, 10000)}`,
        content: '',
        addtime: `${dayjs(new Date()).format('YYYY-MM-DD HH:mm')}`,
        modifytime: `${dayjs(new Date()).format('YYYY-MM-DD HH:mm')}`
    }).then(()=>{
        refrash()
    })
}
const deleteone =()=>{
    if (!clickWho.value){
        window.alert('为确保数据安全，请打开文档再确定是否删除')
        return
    }
    instance.delete('/vipbooks',{
        params:{
            code:clickWho.value
        }
    }).then(()=>{
        refrash()
        clickWho.value = ''
    })


}
const save=function () {
    const text = value.value;
    const regex = /^(#+)\s(.+)$/gm;
    let match;
    const data = {
        content:value.value,
        id:clickWho.value,
        modifytime:`${dayjs(new Date()).format('YYYY-MM-DD HH:mm')}`,
        title:''
    }
    if (value.value){
        data.title= `新笔记本${generateRandomNumber(1, 10000)}`
    }
    while ((match = regex.exec(text))) {
        const level = match[1].length;
        const title = match[2];
        if (level === 1) {
           data.title=title
            break; // 如果匹配到一级标题就结束循环
        } else if (level === 2) {
            data.title=title
            break
        }
        else if (level === 3) {
            data.title=title
            break
        }
    }

    instance.put('/vipbooks',{
        data
    }).then(()=>{
        refrash()
    })
}
</script>

<template>
    <div class="slid">
        <div class="header">笔记列表<el-button style="margin-left: 1px" type="info" @click="newBook">新建笔记</el-button></div>

        <ul class="items" v-for="book in vipBook.list" :key="book.bookid">
            <li  :class="clickWho===book.bookid?'active':''" >
                <span @click="choose(book.bookid)">{{book.title}}</span>
                <span  style="color: rgba(0,0,0,0.2);font-size: 12px">{{`修改时间：${book.modifytime}`}}<el-button type="danger" style="margin-left: 5px" size="small" @click="deleteone">删除</el-button></span>
            </li>
        </ul>
    </div>
    <div class="msg" v-show="!clickWho"><h1>点击任意开始享用vip专属功能吧！🎉🎉🎉🎉🎉🎉</h1><h1 style="color: #f2b81c">点击保存时笔记标题会自动保存为markdown语法标题</h1></div>

    <v-md-editor  v-show="clickWho" v-model="value" height="100vh"  @save="save"></v-md-editor>

</template>

<style scoped lang="scss">
.msg{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    & h1{
        margin-top: 100px;
        color: rgba(0,0,0,0.4);
    }
}
    .slid{
        width: 300px;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow-y: scroll;
        &::-webkit-scrollbar{
            display: none;
        }


        & .header{
            height: 50px;
            width: inherit;
            border-bottom: 1px solid #ccc;
            text-align: center;
            padding-top: 10px;
        }
    }
    .items {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 50px;

        & li {
            text-align: center;
            width: 250px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.3);
            font-size: 18px;
            margin-top: 10px;
            cursor: pointer;
            display: flex;
            flex-direction: column;
        }
    }
    .active{
        color: green;
    }
</style>