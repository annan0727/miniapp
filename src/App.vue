<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
import { useMemberStore } from './stores/modules/member'
import { http } from '@/utils/http'
const memberStore = useMemberStore()
// 验证token是否过期，重新获取用户信息（包括token）
// const checkToken = () => {
//   http
// }

onLaunch(async () => {
  // 1、先从store中取出token做判断用
  const token: string = memberStore.profile.token
  if (!token) {
    // 2、如果没有token 去静默登录
    Login()
  }
})

// 2、静默登录
const Login = () => {
  wx.login({
    success: (res) => {
      console.log('login', res)
      const code = res.code
    },
  })
}
onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})
</script>
<style></style>
