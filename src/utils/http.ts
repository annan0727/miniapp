/**
 * 拼接基础地址
 * 设置超时时间
 * 添加请求头标识
 * 添加 token
 */

import { useMemberStore } from '@/stores/modules/member'

// 请求基地址
const baseURL = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'

// 请求拦截配置
const httpInterceptor = {
  // 拦截前触发
  invoke(options: UniApp.RequestOptions) {
    // 1、非http开头 需要拼接地址
    if (!options.url.startsWith('http')) {
      options.url = baseURL + options.url
    }

    // 2、设置超时时间 10s
    options.timeout = 10000

    // 3、添加小程序端请求头标识
    options.header = {
      ...options.header,
      'source-client': 'miniapp', // 为不同的端 添加标识
    }

    // 4、添加token 请求头标识 登录后才会有
    const memberStore = useMemberStore() // 获取存储的用户信息
    const token = memberStore.profile?.token // 获取用户token
    if (token) {
      // 设置请求头 token
      options.header.Authorization = token
    }
  },
}

// 拦截request请求
uni.addInterceptor('request', httpInterceptor)

// 拦截uploadFile 文件上传请求
uni.addInterceptor('uploadFile', httpInterceptor)

/**
 * 请求函数
 * @param UniApp.RequestOptions
 * @returns Promise
 * 1、返回Promise 对象，用于处理返回值类型
 * 2、获取数据成功
 *  2.1 提取核心数据 res.data
 *  2.2 添加类型、支持泛型
 * 3、获取数据失败
 *  3.1 401错误 用户token失效 -> 清理用户信息，跳转至登录页
 *  3.2 其他错误 -> 根据后端错误信息轻提示
 *  3.3 网络错误 -> 提示用户网络错误
 */

// 添加类型
interface ResponseData<T> {
  code: string
  data: T
  msg: string
}
// <T>泛型 添加请求传过来的类型
export const http = <T>(options: UniApp.RequestOptions) => {
  // 1、返回Promise 对象
  return new Promise<ResponseData<T>>((resolve, reject) => {
    // 发起请求
    uni.request({
      ...options,
      // 响应成功
      success(res) {
        // 状态码2xx，参考axios的设计
        if (res.statusCode >= 200 && res.statusCode < 300) {
          // 2.1 提取核心数据 res.data
          resolve(res.data as ResponseData<T>)
        } else if (res.statusCode === 401) {
          //401错误 用户token失效 清理用户信息 跳转登录页
          const memberStore = useMemberStore()
          memberStore.clearProfile()
          uni.navigateTo({ url: '/pages/login/login' })
          // 错误终止
          reject(res)
        } else {
          // 其它错误 -> 根据后端错误信息轻提示
          uni.showToast({
            icon: 'none',
            title: (res.data as ResponseData<T>).msg || '请求错误',
          })
          reject(res)
        }
      },
      // 响应失败
      fail(err) {
        uni.showToast({
          icon: 'none',
          title: '网络错误',
        })
        reject(err)
      },
    })
  })
}
