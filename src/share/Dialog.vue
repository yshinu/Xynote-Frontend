<script setup lang="ts">

import {reactive, ref} from "vue";
import {useRouter} from "vue-router";


const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
const router = useRouter()
const readyForm = reactive({
    name: '',
})



const confirm = () => {
}

</script>

<template>
    <el-button text @click="dialogFormVisible=true">
        +新增笔记本
    </el-button>
    <el-dialog v-model="dialogFormVisible" title="修改笔记本名称">
        <el-form :model="readyForm">
            <el-form-item label="笔记本名称" :label-width="formLabelWidth">
                <el-input v-model="readyForm.name" autocomplete="off"/>
            </el-form-item>
        </el-form>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="confirm">
          确认
        </el-button>
      </span>
        </template>
    </el-dialog>
</template>

<style scoped lang="scss">

</style>