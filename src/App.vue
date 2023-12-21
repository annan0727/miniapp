<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
import { useMemberStore } from './stores/modules/member'
import { autoLogin } from '@/utils/autoLogin'
const memberStore = useMemberStore()

onLaunch(async () => {
  // 从store中取出token做判断用
  const token: string | undefined = memberStore.profile?.token
  // 检查session 是否过期
  wx.checkSession({
    success: async () => {
      // 未过期
      console.log('未过期')
      // 3、没有token 或者 session过期 去登录
      if (!token) {
        await autoLogin()
      }
    },
    fail: async () => {
      // 过期 去登录
      console.log('过期')
      await autoLogin()
    }
  })
})

onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})
</script>
<style lang="scss">
@import './uni.scss';

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
