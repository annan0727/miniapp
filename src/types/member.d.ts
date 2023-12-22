/** 用户信息 */
export type ProfileInfo = {
  /*用户编码 */
  userCode: string;

  /*认证阶段 1,2,3 */
  authStep?: number;

  /*用户昵称 */
  nickName: string;

  /*邮箱 */
  userMail: string;

  /*手机号 */
  userPhone: string;

  /*备注 */
  userRemark: string;

  /*0(男) or 1(女),-1 未定 */
  sex: number;

  /*生日 */
  birthDate: string;

  /*头像图片路径 */
  picPath: string;

  /*状态 1 正常 0 无效 */
  status?: number;

  /** token  */
  token?: string
}

// 参数接口
export type UpdateUserParams = {
  /*用户编码 */
  userCode?: string;

  /*用户昵称 */
  nickName?: string;

  /*邮箱 */
  userMail?: string;

  /*手机号 */
  userPhone?: string;

  /*备注 */
  userRemark?: string;

  /*0(男) or 1(女),-1 未定 */
  sex?: number;

  /*生日 */
  birthDate?: string;

  /*头像图片路径 */
  picPath?: string;
}

