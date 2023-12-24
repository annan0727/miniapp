<script setup lang="ts">
import { useMemberStore } from '@/stores'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

const loginForm = ref({
  account: '',
  password: '',
})

const onSubmit = () => {
  console.log('submit', loginForm.value)
}
</script>

<template>
  <view class="viewport">
    <view class="logo">
      <!-- <image
        src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/logo_icon.png"
      ></image> -->
      强友之家
    </view>
    <view class="login">
      <!-- 网页端表单登录 -->
      <input
        v-model="loginForm.account"
        class="input"
        type="text"
        placeholder="请输入用户名/手机号码"
      />
      <input
        v-model="loginForm.password"
        class="input"
        type="text"
        password
        placeholder="请输入验证码"
      />
      <button @tap="onSubmit" class="button phone">登录</button>
      <view class="tips">登录/注册即视为你同意《服务条款》和《强友之家隐私协议》</view>
    </view>
  </view>
</template>

<style lang="scss">
$ashome-color-base: #a1d5ba;

page {
  height: 100%;
}

.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20rpx 40rpx;
}

.logo {
  flex: 1;
  text-align: center;
}

.login {
  display: flex;
  flex-direction: column;
  height: 70vh;
  padding: 40rpx 20rpx 20rpx;

  .input {
    width: 100%;
    height: 80rpx;
    font-size: 28rpx;
    border-radius: 72rpx;
    border: 1px solid #ddd;
    padding-left: 30rpx;
    margin-bottom: 20rpx;
  }

  .button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 80rpx;
    font-size: 28rpx;
    border-radius: 72rpx;
    color: #fff;
    .icon {
      font-size: 40rpx;
      margin-right: 6rpx;
    }
  }

  .phone {
    background-color: $ashome-color-base;
  }
}

.tips {
  position: absolute;
  bottom: 80rpx;
  left: 20rpx;
  right: 20rpx;
  font-size: 22rpx;
  color: #999;
  text-align: center;
}
</style>
