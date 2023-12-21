import { userLogin } from '@/api/login'
import { useMemberStore } from '@/stores';

/** 是否开始登录的标记 */
let isStartedLogin: boolean = false;

/** 自动静默登录 节流 */
export const autoLogin = async () => {
    if (isStartedLogin) return false;
    // 状态设置为true
    isStartedLogin = true;

    // 执行登录
    // 获取唯一code码
    const code: string = (await wx.login()).code
    console.log('code', code);

    // 发起静默登录请求
    const res = await userLogin(code)
    if (res.code === "200") {
        const memberStore = useMemberStore();
        memberStore.setProfile(res.data)
        // 登录流程结束后置为false
        isStartedLogin = false;
        // 刷新当前页面
        return true;
    }
}
