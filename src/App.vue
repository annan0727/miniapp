<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
import { useMemberStore } from './stores/modules/member'
import { http } from '@/utils/http'
import { userLogin } from '@/api/login'
const memberStore = useMemberStore()
// 验证token是否过期，重新获取用户信息（包括token）
// const checkToken = () => {
//   http
// }

onLaunch(async () => {
  // 1、先从store中取出token做判断用
  const token: string | undefined = memberStore.profile?.token
  if (!token) {
    // 2、如果没有token 去登录
    // login()
  }
})

// 2、静默登录
const login = async () => {
  // 获取唯一code码
  const code: string = (await wx.login()).code
  console.log('code', code)
  // 发起静默登录请求
  const res = await userLogin({ code })
  console.log('res', res)
}
onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})
</script>
<style lang="scss">
// 字体图标
@import '@/styles/fonts.scss';

view,
navigator,
input,
scroll-view {
  box-sizing: border-box;
}

button::after {
  border: none;
}

swiper,
scroll-view {
  flex: 1;
  height: 100%;
  overflow: hidden;
}

image {
  width: 100%;
  height: 100%;
  vertical-align: middle;
}

// 两行省略
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
