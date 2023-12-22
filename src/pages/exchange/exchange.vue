<template>
  <button @click="triggerWebViewSubmit">提交内容</button>

  <div class="exchange" style="margin-top: 100px;">

    <web-view :src="editorUrl" ref="webViewRef" :webview-styles=webviewStyle></web-view>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { onLoad, onReady } from '@dcloudio/uni-app';
const editorUrl = ref('http://192.168.20.196:8080/index.html')

const webViewRef = ref(null)
const pages = getCurrentPages();
const webviewStyle = {}
onLoad(() => {

})

const triggerWebViewSubmit = () => {
  const page: any = pages[pages.length - 1];

  const currentWebview = page.$getAppWebview();
  console.log(currentWebview);
  // // 向web-view发送一个自定义的消息
  // const webview = webViewRef.value;
  // if (webview) {
  //   // let pages = getCurrentPages();
  // }
}
</script>

<style scoped></style>
