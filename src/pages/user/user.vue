<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { useMemberStore } from '@/stores'
import { autoLogin } from '@/utils/autoLogin'
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

// 获取会员信息
const memberStore = useMemberStore()

// 微信用户默认头像
const defaultAvatar = ref<string>('')
// 微信用户默认昵称
const defaultNickname = ref<string>('')

// 帖子项：我的帖子 我的评论 我的赞藏 我的关注
const postCateList = ref<any>([
  {
    text: '我的帖子',
    num: 0,
    path: '/pages/post/myPost',
  },
  {
    text: '我的评论',
    num: 0,
    path: '/pages/post/myComment',
  },
  {
    text: '我的收藏',
    num: 0,
    path: '/pages/post/myLike',
  },
  {
    text: '我的关注',
    num: 0,
    path: '/pages/post/myFollow',
  },
])
onLoad(async () => {
  console.log('memberStore', memberStore)
  // 获取微信用户默认头像昵称
  wx.getUserInfo({
    desc: '用于获取微信用户头像昵称',
    success: (res) => {
      defaultAvatar.value = res.userInfo.avatarUrl
      defaultNickname.value = res.userInfo.nickName
      if (!memberStore.profile?.picPath) {
        memberStore.profile!.picPath = defaultAvatar.value
      }
    },
  })
})
</script>

<template>
  <scroll-view class="viewport" scroll-y enable-back-to-top>
    <!-- 个人资料 -->
    <view class="profile" :style="{ paddingTop: safeAreaInsets!.top + 'px' }">
      <!-- 默认显示默认的昵称和头像 -->
      <view class="overview">
        <navigator url="/pagesMember/profile" hover-class="none">
          <image
            class="avatar"
            mode="aspectFill"
            :src="memberStore.profile?.picPath || defaultAvatar"
          ></image>
        </navigator>
        <view class="meta">
          <view class="nickname"> {{ memberStore.profile?.nickName || defaultNickname }} </view>
          <!-- <navigator class="extra" url="/pagesMember/profile" hover-class="none"> -->
          <text class="company">强友之家已经陪伴您10天了~</text>
          <!-- </navigator> -->
        </view>
      </view>
      <navigator class="settings icon-a-44tubiao-17" url="/pagesMember/profile" hover-class="none">
      </navigator>
    </view>
    <!-- 帖子信息 -->
    <view class="postinfo">
      <!-- 我的帖子 -->
      <navigator
        class="post-item"
        url="/pagesMember/profile"
        hover-class="none"
        v-for="item in postCateList"
        :key="item.text"
      >
        <text class="num">{{ item.num }}</text>
        <view class="text">{{ item.text }}</view>
      </navigator>
    </view>
    <!-- 绑定手机号 -->
    <view class="loginphone">
      <view class="left-text">
        <!-- <image class="tip" src="../../static/images//user/tip.png"></image> -->
        <text class="tip icon-a-44tubiao-62"></text>
        <text> 绑定手机号，同步自己的个人纪录哦！ </text>
      </view>
      <navigator url="/pagesMember/bindPhone" class="bind-phone" hover-class="none">
        <button hover-class="button-hover" size="mini" class="btn">登录/注册</button>
      </navigator>
    </view>
    <!-- 底部功能列表 -->
    <view class="functions">
      <button hover-class="none" class="item" open-type="openSetting">
        <text class="icon-text">
          <text class="icons icon-a-44tubiao-133"></text>
          <text>授权管理</text>
        </text>
        <uni-icons type="right" size="24" color="#e0e0e0"></uni-icons>
      </button>
      <button hover-class="none" class="item" open-type="feedback">
        <text class="icon-text">
          <text class="icons icon-a-44tubiao-149"></text>
          <text>问题反馈</text>
        </text>
        <uni-icons type="right" size="24" color="#e0e0e0"></uni-icons>
      </button>
      <button hover-class="none" class="item" open-type="contact">
        <text class="icon-text">
          <text class="icons icon-a-44tubiao-131"></text>
          <text>联系我们</text>
        </text>
        <uni-icons type="right" size="24" color="#e0e0e0"></uni-icons>
      </button>
      <button hover-class="none" class="item" open-type="contactShare">
        <text class="icon-text">
          <text class="icons icon-a-44tubiao-121"></text>
          <text>分享我们</text>
        </text>
        <uni-icons type="right" size="24" color="#e0e0e0"></uni-icons>
      </button>
      <button hover-class="none" class="item">
        <text class="icon-text">
          <text class="icons icon-a-44tubiao-147"></text>
          <text>关于我们</text>
        </text>
        <uni-icons type="right" size="24" color="#e0e0e0"></uni-icons>
      </button>
      <button hover-class="none" class="item">
        <text class="icon-text">
          <text class="icons icon-a-44tubiao-57"></text>
          <text>修改手机</text>
        </text>
        <uni-icons type="right" size="24" color="#e0e0e0"></uni-icons>
      </button>
      <button hover-class="none" class="item">
        <text class="icon-text">
          <text class="icons icon-a-44tubiao-47"></text>
          <text>系统设置</text>
        </text>
        <uni-icons type="right" size="24" color="#e0e0e0"></uni-icons>
      </button>
    </view>
  </scroll-view>
</template>

<style lang="scss">
$ashome-color-base: #a1d5ba;

page {
  height: 100%;
  overflow: hidden;
  background-color: #f7f7f8;
}

.viewport {
  height: 100%;
  background-repeat: no-repeat;
  background-image: url('@/static/images/user/background1.png');
  background-size: 100% auto;
}

/* 用户信息 */
.profile {
  margin-top: 60rpx;
  position: relative;

  .overview {
    display: flex;
    height: 120rpx;
    padding: 0 36rpx;
    color: #3d3d3d;
  }

  .avatar {
    width: 120rpx;
    height: 120rpx;
    border-radius: 50%;
    background-color: #eee;
  }

  .gray {
    filter: grayscale(100%);
  }

  .meta {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    line-height: 30rpx;
    padding: 16rpx 0;
    margin-left: 20rpx;
  }

  .nickname {
    max-width: 350rpx;
    margin-bottom: 16rpx;
    font-size: 30rpx;
    font-weight: bold;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .tips {
    font-size: 30rpx;
  }

  .company {
    font-size: 24rpx;
    padding: 3rpx 0rpx 1rpx;
  }

  .settings {
    font-size: 34rpx;
    position: absolute;
    bottom: 0rpx;
    right: 40rpx;
    color: #3d3d3d;
    font-weight: bold;
  }
}

.postinfo {
  display: flex;
  justify-content: space-around;
  align-items: center;
  // width: 80%;
  height: 160rpx;
  background-color: #fff;
  margin: 20rpx 36rpx;
  margin-top: 30rpx;
  border-radius: 20rpx;
  box-shadow: 0rpx 6rpx 18rpx 0rpx rgba(0, 0, 0, 0.3);

  .post-item {
    font-size: 24rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .num {
      font-size: 26rpx;
      font-weight: bold;
      color: $ashome-color-base;
    }

    .text {
      margin-top: 20rpx;
    }
  }
}
/* 列表 */
.functions {
  padding: 0 20rpx;
  background-color: #fff;
  margin-bottom: 20rpx;
  border-radius: 10rpx;
  .item {
    line-height: 90rpx;
    padding-left: 10rpx;
    font-size: 30rpx;
    color: #3d3d3d;
    border-top: 1rpx solid #ddd;
    position: relative;
    text-align: left;
    border-radius: 0;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &::after {
      width: auto;
      height: auto;
      left: auto;
      border: none;
    }
    &:first-child {
      border: none;
    }
    &::after {
      right: 5rpx;
    }
    .icon-text {
      display: flex;
      align-items: center;
      .icons {
        font-size: 34rpx;
        margin-right: 20rpx;
        color: $ashome-color-base;
        font-weight: bold;
      }
    }
  }
}

.loginphone {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20rpx;
  background-color: #fdf4ed;
  height: 70rpx;
  .left-text {
    display: flex;
    align-items: center;
    .tip {
      font-size: 40rpx;
      color: red;
    }
    text {
      margin-left: 10rpx;
      font-size: 24rpx;
      color: #d3a557;
    }
  }
  .bind-phone {
    display: flex;
    align-items: center;
    .btn {
      background-color: #fe9e14;
      font-size: 24rpx;
      color: #fff;
      font-weight: bold;
    }
  }
}

/* 我的订单 */
.orders {
  position: relative;
  z-index: 99;
  padding: 30rpx;
  margin: 50rpx 20rpx 0;
  background-color: #fff;
  border-radius: 10rpx;
  box-shadow: 0 4rpx 6rpx rgba(240, 240, 240, 0.6);

  .title {
    height: 40rpx;
    line-height: 40rpx;
    font-size: 28rpx;
    color: #1e1e1e;

    .navigator {
      font-size: 24rpx;
      color: #939393;
      float: right;
    }
  }

  .section {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 40rpx 20rpx 10rpx;

    .navigator,
    .contact {
      text-align: center;
      font-size: 24rpx;
      color: #333;

      &::before {
        display: block;
        font-size: 60rpx;
        color: #ff9545;
      }
    }

    .contact {
      padding: 0;
      margin: 0;
      border: 0;
      background-color: transparent;
      line-height: inherit;
    }
  }
}

/* 猜你喜欢 */
.guess {
  background-color: #f7f7f8;
  margin-top: 20rpx;
}
</style>
