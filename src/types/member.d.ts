/** 用户信息 */
export type ProfileInfo = {
  /** 用户编码  */
  userCode: string
  /** 认证阶段  */
  authStep: number
  /** 用户昵称  */
  nickName: string
  /** 邮箱  */
  userMail: string
  /** 手机号  */
  userPhone: string
  /** 备注  */
  userRemark: string
  /** 性别  */
  sex: string
  /** 生日  */
  birthday: string
  /** 头像图片路径  */
  picPath: string
  /** 状态  */
  status: string
  /** token  */
  token: string
}
