<script setup lang="ts">
import {useRouter} from "vue-router";

const router = useRouter()
const props=defineProps({
    path:{
        default:"",
    },
    btnName:{
        default:"next"
    }
})
const jump =()=>{
    router.push(`${props.path}`)
}
defineExpose({
    jump
})

</script>

<template>
    <button class="next" @click="">{{props.btnName}}</button>
</template>

<style scoped lang="scss">
.next{
  width: 350px;
  height: 60px;
  background-color: var(--button-color);
  color: white;
  border-radius: 10px;
  font-size: 20px;
  font-weight: 500;
    cursor: pointer;
}
</style>