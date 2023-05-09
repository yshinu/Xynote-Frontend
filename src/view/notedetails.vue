<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
const route = useRoute()
</script>

<template>
<div>这里是{{route.params.noteId}}笔记详情</div>
</template>

<style scoped lang="scss">

</style>