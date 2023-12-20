import { http } from '@/utils/http'
import type { ProfileInfo } from '@/types/member'

type LoginParams = {
  code: string
}

/**
 * 小程序登录
 * @param data 请求参数
 */
export const userLogin = (data: LoginParams) => {
  return http<ProfileInfo>({
    method: 'POST',
    url: '/api/v1/wx/user/silentLogin',
    data,
  })
}
