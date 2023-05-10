<script setup lang="ts">


import DigWithform from "../components/digWithform.vue";
import {useBookListStore} from "../store/pinia.ts";

const booklist = useBookListStore()
const jump = function (i){
    console.log(i);
}
const a = {
    email:'1@qq.com',
    notebooks:[{
        name:'笔记',
        content:[{
            title:'数学课',
            text:"今天学习了二元一次方程"
        }]
    },{
        name:'记账',
        content:[{
            title:'吃饭',
            text:"请别人吃饭花了500"
        }]
    }
    ]
}
</script>

<template>
    <div class="wrapper">
        <div class="head">
            <digWithform></digWithform>
        </div>
        <div class="lists">
            <h2>笔记本列表</h2>
            <ul>
                <li v-for="(item,i) in booklist.notebooklist" :key="i" @click="jump(i)"><span>{{item}}</span> <span class="x">x</span></li>
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