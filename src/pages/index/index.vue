<template>
  <view class="content">
    <CustomNavbar></CustomNavbar>
    <XtxSwiper></XtxSwiper>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CustomNavbar from "./components/CustomNavbar.vue"
const title = ref('Hello app')
</script>

<style></style>
