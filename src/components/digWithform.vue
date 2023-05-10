<template>
    <el-button text @click="dialogFormVisible=true" :digv="dialogFormVisible">
        +新增笔记本
    </el-button>
    {{bookList.notebooklist}}
    <el-dialog v-model="dialogFormVisible" title="请输入笔记本名称" center>
        <el-form :model="form">
            <el-form-item label="笔记本名称" :label-width="formLabelWidth" >
                <el-input v-model="form.notebookName" autocomplete="off" />
            </el-form-item>
        </el-form>
        <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="concle">
          确认
        </el-button>
      </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import {onBeforeMount, reactive, ref} from 'vue'
import {useBookListStore} from "../store/pinia.ts";
import {instance} from "../../axios/http.ts";
const bookList = useBookListStore()

onBeforeMount(()=>{
    instance.get('/booklist').then(
        res=> bookList.resetBookList(res.data.booklist)
    )
})

const dialogFormVisible = ref<boolean>(false)
const concle = ()=>{
    dialogFormVisible.value = false
    if (!form.notebookName){
        window.alert('还没有内容呢')
        return
    }
    if (form.notebookName.length>=12){
        window.alert('名字太长啦')
        return;
    }
    instance.patch('/booklist',{
        bookname:form.notebookName
    }).then(res=> bookList.resetBookList(res.data.result.booklist))

}
const formLabelWidth = '90px'

const form = reactive({
    notebookName: '',
})


</script>
<style scoped>
.el-button--text {
    margin-right: 15px;
}
.el-select {
    width: 300px;
}

.dialog-footer button:first-child {
    margin-right: 10px;
}
</style>
