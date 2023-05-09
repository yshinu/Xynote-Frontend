<script setup lang="ts">
import {instance} from "../../axios/http.ts";

const test = ()=>{
    instance.get('/aaa',{
        params:{
            name:1
        }
    })
}
</script>

<template>
    <ul>
        <li><router-link to="/note/1">笔记本1</router-link></li>
        <li><router-link to="/note/2">笔记本2</router-link></li>

    </ul>
    <button @click="test">dianwo</button>
</template>

<style scoped lang="scss">

</style>