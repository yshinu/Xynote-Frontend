<script setup lang="ts">
import {reactive, ref} from 'vue'
import type {FormInstance, FormRules} from 'element-plus'
import Button from "../share/Button.vue";
import {useRouter} from "vue-router";
import {instance} from "../../axios/http.ts";
import {useLoginStore} from "../store/pinia.ts";
const ruleFormRef = ref<FormInstance>()
const avainfo = useLoginStore()
const isValidEmail = function (email) {
    const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegExp.test(email);
}
const router=useRouter();
const validateEmail = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入邮箱'))
    } else {
        if (!isValidEmail(value)) {
            callback(new Error("请确认邮箱格式"))
        }
        callback()
    }
}
const validatePass = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入密码'))
    } else {
        callback()
    }
}
const ruleForm = reactive({
    email: '1@qq.com',
    pass: '1'
})
const rules = reactive<FormRules>({
    email: [{validator: validateEmail, trigger: 'blur'}],
    pass: [{validator: validatePass, trigger: 'blur'}],
})
const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(  (valid) => {
        if (valid) {
            instance.post('/login',ruleForm).then(res=>{
                if (res.data.code === '0000'){
                    localStorage.setItem('token',res.data.token)
                    window.alert('登陆成功')
                    avainfo.email=ruleForm.email
                    router.push('/notebooks')
                }else {
                    window.alert(res.data.msg)
                }
            })
        } else {
            console.log('error submit!')
            return false
        }
    })
}

</script>
<template>
    <div class="wrapper">
        <header class="head">
            <h1>欢迎回来</h1>
            <h2 @click="router.push('/reg')">还没有账户？点我去注册</h2>
        </header>
        <main class="main">
            <el-form
                ref="ruleFormRef"
                :model="ruleForm"
                status-icon
                :rules="rules"
                class="login-form"
            >
                <span class="title">邮箱</span>
                <el-form-item prop="email">
                    <el-input v-model="ruleForm.email" autocomplete="off" placeholder="example@example.com"
                              class="input"/>
                </el-form-item>
                <span class="title">密码</span>
                <el-form-item prop="pass" class="f-wrapper">
                    <el-input
                        v-model="ruleForm.pass"
                        type="password"
                        autocomplete="off"
                        class="input"
                    />
                </el-form-item>
            </el-form>
        </main>
        <footer>
            <Button @click="submitForm(ruleFormRef)" :btnName="'登录'"></Button>
        </footer>
    </div>
</template>

<style scoped lang="scss">
h2{
    cursor: pointer;
}
.input {
    height: 54px;
    width: 350px;
    border-width: 0;
    margin-top: 20px;
}

.main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.f-wrapper {
    width: 350px;
    height: 95px;
}

.title {
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0px;
    line-height: 22px;
}

.wrapper {
    background-color: rgba(235, 236, 237, 1);
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #ccc;
    z-index: 2;
}
.head{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 70px;
    margin-top: -20px;
    & h1{
        margin-bottom: 8px;
        font-size: 26px;
        font-weight: 500;
        font-family:Poppins,serif;
    }
    & h2{
        margin-bottom: 40px;
    }
}
.icon{
    display: flex;
    justify-content: center;
    align-items: center;
    & .apple,.google,.facebook{
        width: 48px;
        height: 48px;
        border-radius: 24px;
        background-color: #333;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 17px;
    }

}
</style>


<style>
.el-input__wrapper {
    border-radius: 10px;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.05);
}

</style>