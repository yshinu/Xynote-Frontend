<script setup lang="ts">
import {useRouter, useRoute} from 'vue-router'
import {nextTick, onMounted, reactive, ref, watch} from 'vue'
import {useBookListStore, useBooksStore} from "../store/pinia.ts";
import {instance} from "../../axios/http.ts";
import {router} from "../router";
import axios from "axios";

const books = useBooksStore()
const bookList = useBookListStore()
const route = useRoute()
const notebookId = ref(route.params.notebookName)
const ifAdd = ref(false)
const button = ref('添加笔记')
const input = ref('')
const flag = ref(true)
const clickWho = ref('')
const showContent = ref('')
const isWrite = ref(false)
const msg = ref('开始写作吧')
const currentInfo = reactive({
    noteBookId:route.params.noteId,
    noteId:''
})
const fetchNewBookList = () => {
    instance.get('/notebookdetail', {
        params: {
            bookDetailId: route.params.noteId
        }
    }).then(res => {
        books.resetBooks(res.data.content)
    })
}
onMounted(() => {
    console.log(books.books)
    fetchNewBookList()
})
watch(route, () => {
    fetchNewBookList()
    currentInfo.noteBookId =  route.params.noteId
})
const options = Object.entries(bookList.notebooklist).map(subArr => {
    return {
        value: subArr[1],
        label: subArr[0]
    }
})
const selected = (val) => {
    const label = options.find(obj => obj.value === val)?.label;
    router.push(`/note/${val}/${label}`)

}

const addNote = () => {
    if (button.value === '添加笔记') {
        ifAdd.value = true
        button.value = '提交'
        return
    }
    if (button.value === '提交') {
        books.books.forEach(item => {
            if (item.title === input.value) {
                flag.value = false
                window.alert('名称重复')
                return
            }
        })
        if (flag.value && input.value.length >= 1 && input.value.length <= 12) {
            instance.put('/notebookdetail', {
                newName: input.value,
                noteId: route.params.noteId
            }).then(() => {
                fetchNewBookList()
            })
        } else {
            window.alert('名字不能为空或太长哦')
        }
        ifAdd.value = false
        button.value = '添加笔记'
        return
    }
}
const write = (title, id) => {
    clickWho.value = title
    currentInfo.noteId=id
    instance.get('/content',{
        params:{
            noteBookId:route.params.noteId,
            noteId:id
        }
    }).then(res=>showContent.value = res.data.content)
    console.log(id)
}
const submit = ()=>{
    isWrite.value=false
    instance.put('/content', {
        noteBookId:currentInfo.noteBookId,
        noteId:currentInfo.noteId,
        text:showContent.value
    }).then(res=>msg.value=(res.data.msg) )
}
const confirmDelete = () => {
    isWrite.value=false
    instance.delete('/content', {
        data:{
            noteBookId:currentInfo.noteBookId,
            noteId:currentInfo.noteId,
        }
    }).then(res=>{msg.value=(res.data.msg)
        fetchNewBookList()
        clickWho.value=''}
    )
}
</script>

<template>
<!--    {{currentInfo}}-->
    <div class="wrapper">
        <div class="menu">
            <header class="head">
                <el-input v-show="ifAdd" v-model="input" placeholder="请输入笔记名，不要重复哦"/>
                <div v-show="!ifAdd">
                    <el-select v-model="notebookId" class="m-2" @change="selected" placeholder='请选择一个笔记本'>
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"

                        />
                    </el-select>
                </div>
                <el-button @click="addNote" round>{{ button }}</el-button>
            </header>
            <div class="main">
                <ul v-for="items in books.books" :key="items.id" class="items">
                    <li @click="write(items.title,items.id)" :class="items.title===clickWho?'active':''">{{
                        items.title
                        }}
                    </li>
                </ul>
            </div>
        </div>
        <div class="content">
            <div class="detail-header">
                <div class="status">{{msg}}</div>
                <div>{{ clickWho }}</div>
                <div>
                    <el-button type="success" @click="submit" round>提交</el-button>
                    <el-popconfirm
                        width="220"
                        confirm-button-text="是"
                        cancel-button-text="否"
                        icon-color="#333333"
                        title="确定要删除吗"
                        @confirm="confirmDelete"
                    >
                        <template #reference>
                            <el-button type="danger">删除</el-button>
                        </template>
                    </el-popconfirm>
                </div>

            </div>
            <div class="detail">
                <el-input
                        v-model="showContent"
                        :rows="44"
                        maxlength="5000"
                        type="textarea"
                        show-word-limit
                        :disabled="!clickWho"
                        @focus="msg='正在输入...'"
                        @blur="submit"
                />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;

  & .menu {
    width: 300px;
    height: inherit;
    border: 1px solid black;
    background-color: #eee;

    & .head {
      font-size: 14px;
      border: 1px solid grey;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 60px;
    }

    & .main {
      margin-top: 50px;
        overflow: hidden;
    }
  }
}

.items {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;


  & li {
    text-align: center;
    width: 250px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    font-size: 18px;
    margin-top: 10px;
    cursor: pointer;
  }
}

.active {
  color: green;
}

.content {
  display: flex;
  flex-direction: column;
  width: inherit;

  & .detail-header {
    display: flex;
    height: 60px;
    border-bottom: 1px solid #ccc;
    justify-content: space-between;
    align-items: center;
    width: inherit;
    padding: 0 15px;
  }
}
</style>