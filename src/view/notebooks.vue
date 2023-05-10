<script setup lang="ts">
import DigWithform from "../components/digWithform.vue";
import {instance} from "../../axios/http.ts";
import {refrash} from "../hooks/reFrash.ts";
import {useBookListStore} from "../store/pinia.ts";
import { reactive, ref } from 'vue'
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

const readyToModify = reactive({
    name: '',
})
const booklist = useBookListStore()
const modifyId = ref('')
let timer = null
const jump = function (i){
    clearTimeout(timer)
    timer=setTimeout(()=>{
        console.log(i);
    },300)

}
const modify=function (i){
    clearTimeout(timer)
    modifyId.value = i
    dialogFormVisible.value = true
}

const deleteNote = (value)=>{
    if (Object.keys(booklist.notebooklist).length===1){
        window.alert('至少留一个哦')
        return
    }
    instance.delete('/booklist',{
        data:{
            id:value
        }
    }).then(()=>refrash())
}
const confirmModify=()=>{
    dialogFormVisible.value = false
    if (Object.keys(booklist.notebooklist).some(val=> val.includes(readyToModify.name))){
        window.alert('这个名字存在了，换一个吧')
        return
    }
     instance.put('/booklist',{
         modifyId:modifyId.value,
         modifyName:readyToModify.name
     }).then(()=>refrash())
}
</script>

<template>
    <el-dialog v-model="dialogFormVisible" title="修改笔记本名称">
        <el-form :model="readyToModify">
            <el-form-item label="笔记本名称" :label-width="formLabelWidth">
                <el-input v-model="readyToModify.name" autocomplete="off" />
            </el-form-item>
        </el-form>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmModify">
          确认
        </el-button>
      </span>
        </template>
    </el-dialog>

    <div class="wrapper">
        <div class="head">
            <digWithform></digWithform>
        </div>
        <div class="lists">
            <h2>笔记本列表</h2>
            <ul>
                <li  v-for="(value,key) in booklist.notebooklist"
                    :key="value"
                    @click="jump(value)"
                     @dblclick="modify(value)"

                ><span>{{key}}</span>
                    <el-popconfirm
                        width="220"
                        confirm-button-text="是"
                        cancel-button-text="否"
                        icon-color="#333333"
                        title="确定要删除吗"
                        @confirm="deleteNote(value)"
                    >
                        <template #reference>
                            <el-button>删除</el-button>
                        </template>
                    </el-popconfirm>
                </li>
            </ul>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  position: relative;
  & .head {
    width: 100%;
    height: 76px;
    border-bottom: 1px solid #cccccc;
    position: absolute;
    top: 0;
    flex-shrink: 0;
  }
  & .lists {
      h2{
          margin-bottom: 50px;
          position: absolute;
          top: 90px;
          transform: translate(-50%);
      }
      & ul{
          width: 50vw;
          display: flex;
          flex-direction: column;
          justify-content: center;
      }
      background-color: #cccccc;
      padding: 50px;
      border-radius: 5px;
  }
}
li{
    height: 50px;
    border-bottom: 3px solid rgba(0, 0, 0, 0.3);
    margin-top: 3px;
    font-size: 20px;
    align-items: center;
    padding-top: 10px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    & .x{
        display: block;
        width: 30px;
        height: 30px;
        border-radius: 15px;
        text-align: center;
        color: #cccccc;
        background-color: black;
        cursor: pointer;
    }
}
</style>