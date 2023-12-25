import { http } from '@/utils/http'
import type { ProfileInfo, UpdateUserParams } from '@/types/member'


/**
 * 小程序登录
 */
export const getUserInfo = () => {
  return http<ProfileInfo>({
    method: 'GET',
    url: '/api/v1/ashome/wx/user/userInfo'
  })
}

/** 
 * 修改用户信息
 * @param {object} params 用户信息修改form
 * @param {string} params.userCode 用户编码
 * @param {string} params.nickName 用户昵称
 * @param {string} params.userMail 邮箱
 * @param {string} params.userPhone 手机号
 * @param {string} params.userRemark 备注
 * @param {number} params.sex 0(男) or 1(女),-1 未定
 * @param {object} params.birthDate 生日
 * @param {string} params.picPath 头像图片路径
 * @returns
 */
export const updateUser = (params: UpdateUserParams) => {
  return http<Boolean>({
    method: 'POST',
    url: '/api/v1/ashome/wx/user/updateUser',
    data: params
  })
}
