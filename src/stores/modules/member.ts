import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMemberStore = defineStore(
  'member',
  () => {
    // 用户信息
    const profile = ref<any>({
      userCode: '',
      authStep: '',
      nickName: '',
      userMail: '',
      userPhone: '',
      userRemark: '',
      sex: '',
      birthday: '',
      picPath: '',
      status: '',
      token: '',
    })

    // 保存会员信息，登录时使用
    const setProfile = (data: any) => {
      profile.value = data
    }

    // 清楚会员信息，退出时使用
    const clearProfile = () => {
      profile.value = undefined
    }

    return {
      profile,
      setProfile,
      clearProfile,
    }
  },
  // TODO: 持久化配置
  {
    persist: {
      // 调整为多端兼容的API
      storage: {
        setItem(key, value) {
          uni.setStorageSync(key, value)
        },
        getItem(key) {
          return uni.getStorageSync(key)
        },
      },
    },
  },
)
