<template>

    <div id="sidebar">
        <avatar class="ava"></avatar>
        <div class="icons">
          <router-link to="/note/1"  title="笔记"><img src="/Notes.png" alt=""></router-link>
          <router-link to="/notebooks"  title="笔记本"><img src="/notelist.png" alt=""></router-link>
          <router-link to="/trash/2"  title="回收站"><img src="/shanchu.png" alt=""></router-link>
        </div>
        <div class="logout" @click="onLogout">
            <img src="/tuichu.png" alt="">
        </div>
      </div>
  </template>
<script lang="ts" setup>
import Avatar from "./Avatar.vue";

import {useRouter} from "vue-router";
const router = useRouter()
const onLogout = ()=>{
    localStorage.removeItem('token')
    router.push('/login')
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

</style>