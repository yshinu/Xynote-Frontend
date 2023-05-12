<template>
    <div id="sidebar">
        <el-dialog v-model="dialogFormVisible" title="您还不是vip用户, 验证邮箱即可成为vip">
            <el-form :model="valiForm">
                <el-form-item label="请输入验证码" :label-width="formLabelWidth">
                    <el-input v-model="valiForm.valiCode" autocomplete="off" />
                    <el-button type="text" style="margin-left: 10px" @click="getvalicode">获取验证码</el-button>
                    <el-button type="success" @click="postcode">提交</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <avatar class="ava"></avatar>
        <div class="icons">
          <router-link to="/note/null/选择笔记本开始"  title="笔记"><img src="/Notes.png" alt=""></router-link>
          <router-link to="/notebooks"  title="笔记本"><img src="/notelist.png" alt=""></router-link>
            <button class="vip" @click="toMark"><img src="/shanchu.png" alt=""></button>
        </div>
        <div class="logout" @click="onLogout">
            <img src="/tuichu.png" alt="">
        </div>
      </div>
  </template>
<script lang="ts" setup>
import Avatar from "./Avatar.vue";

import {onBeforeRouteLeave, useRouter} from "vue-router";
import {instance} from "../../axios/http.ts";
import {useLoginStore} from "../store/pinia.ts";
const router = useRouter()
const isvip = useLoginStore()
import { reactive, ref } from 'vue'
const dialogFormVisible = ref(false)
const formLabelWidth = '100px'
const valiForm = reactive({
    valiCode:''
})
const getvalicode=()=>{
    instance.get('/vip/vali').then(res=>window.alert(res.data.msg))
}
const onLogout = ()=>{
    localStorage.removeItem('token')
    router.push('/login')
}
const toMark = () => {
    instance.get('/vip').then(res=> {
        isvip.isVip= res.data.isVip;
        if (res.data.isVip){
            router.push('/vip-markdown')
            return
        }
        dialogFormVisible.value = true
    })
}
const a = [{
    email:'1443@qq.com',
    books:[{
        title:'吃饭',
        content:'小鸡炖蘑菇',
        addtime:'2000-09-27',
        modifytime:'2022-09-22'
    },
        {
            title:'上学',
            content:'英语课',
            addtime:'2000-03-22',
            modifytime:'2022-09-01'
        }]
},{
    email:'144388@qq.com',
        books:[{
        title:'吃饭1',
        content:'小鸡炖蘑菇1',
        addtime:'2000-09-27',
        modifytime:'2022-09-22'
    },
        {
            title:'上学1',
            content:'英语课1',
            addtime:'2000-03-22',
            modifytime:'2022-09-01'
        }]
}]


const postcode = ()=>{
    instance.post('/vip/vali',{
        code:valiForm.valiCode
    }).then(res=>{window.alert(res.data.msg)
        location.reload() })
}
</script>

<style scoped lang="scss">
@import "src/style/share";
#sidebar{
  width: 70px;
  height: 100%;
  flex-shrink: 0;
  background-color: #333;
  color: white;
  .ava{
    position: absolute;
    left: 20px;
  }
}
.icons{
  @include center-items;
  background-color: #ccc;
  margin-top: 150px;
  position: relative;
}
img{
  width: 25px;
  height: 25px;
  margin:10px  0;
}
.logout{
  position: absolute;
  @include center-items;
  left: 25px;
  bottom: 10px;
  cursor: pointer;
}
.vip {
  margin: 0;
  padding: 0;
  border: none;
  font: inherit;
  color: inherit;
  background-color: transparent;
  cursor: pointer;
  outline: none;
  /* 其他样式 */
}
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>