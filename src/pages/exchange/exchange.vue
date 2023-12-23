<template>
  <button @click="triggerWebViewSubmit">提交内容</button>

  <div class="exchange">
    <web-view
      :src="`http://192.168.101.5:8080/index.html?timestamp=${new Date().getTime()}`"
      ref="webViewRef"
    >
      <!-- <cover-view class="footer">
        <cover-view class="button_box" bindtap="nextStep1"> 下一步 </cover-view>
      </cover-view> -->
    </web-view>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { onLoad, onReady } from '@dcloudio/uni-app'

const webViewRef = ref(null)
const pages = getCurrentPages()
onLoad(() => {})

const triggerWebViewSubmit = () => {
  const page: any = pages[pages.length - 1]

  const currentWebview = page.$getAppWebview()
  console.log(currentWebview)
  // // 向web-view发送一个自定义的消息
  // const webview = webViewRef.value;
  // if (webview) {
  //   // let pages = getCurrentPages();
  // }
}
</script>

<style scoped>
.footer {
  position: fixed;
  bottom: 100px;
  left: 50%;
  /* color: red; */
  z-index: 999999999;
  transform: translateX(-50%);
}
.button_box {
  height: 30px;
  line-height: 30px;
  width: 200px;
  text-align: center;
  border-radius: 8px;
  color: #ffffff;
  /* background: linear-gradient(90deg, #FF2E2E 0%, #FA6E4D 100%); */
  background-color: #ff2e2e;
  opacity: 0.6;
  margin: 10px 0;
}
</style>
