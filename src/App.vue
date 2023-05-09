<template>
    <Sidebar v-show="isShow"></Sidebar>
    <router-view>
    </router-view>

</template>

<script setup lang="ts">
import Sidebar from "./components/Sidebar.vue";
import {useRoute} from "vue-router";
import {ref, watch, watchEffect} from "vue";
import {instance} from "../axios/http.ts";
import axios from "axios";

const isShow = ref(true)
const route = useRoute()
watch(() => route.path, (newPath, oldPath) => {
    isShow.value = !(newPath === '/login' || newPath === '/reg');
}, {immediate: true})


</script>

<style>
#app {
    width: 100vw;
    height: 100vh;
    display: flex;
}

.view {
    flex: 1;
}
</style>