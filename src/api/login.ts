import { http } from '@/utils/http'
import type { ProfileInfo } from '@/types/member'


/**
 * 小程序登录
 * @param data 请求参数
 */
export const userLogin = (code: string) => {
  return http<ProfileInfo>({
    method: 'GET',
    url: `/api/v1/ashome/wx/user/silentLogin?code=${code}`
  })
}
