<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { useMemberStore } from '@/stores'
import { autoLogin } from '@/utils/autoLogin';
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
  // {
  //   text: '我的赞藏',
  //   num: 0,
  //   path: '/pages/post/myLike',
  // },
  {
    text: '我的关注',
    num: 0,
    path: '/pages/post/myFollow',
  },
])
onLoad(async () => {
  console.log('memberStore', memberStore);

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
          <image class="avatar" mode="aspectFill" :src="memberStore.profile?.picPath || defaultAvatar"></image>
        </navigator>
        <view class="meta">
          <view class="nickname"> {{ memberStore.profile?.nickName || defaultNickname }} </view>
          <!-- <navigator class="extra" url="/pagesMember/profile" hover-class="none"> -->
          <text class="company">强友之家已经陪伴您10天了~</text>
          <!-- </navigator> -->
        </view>
      </view>
      <navigator class="settings" url="/pagesMember/profile" hover-class="none">
        <uni-icons type="compose" size="24" color="#3d3d3d"></uni-icons>
      </navigator>
    </view>
    <!-- 帖子信息 -->
    <view class="postinfo">
      <!-- 我的帖子 -->
      <navigator class="post-item" url="/pagesMember/profile" hover-class="none" v-for="item in postCateList"
        :key="item.text">
        <text class="num">{{ item.num }}</text>
        <view class="text">{{ item.text }}</view>
      </navigator>
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
  margin-top: 20rpx;
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
    font-size: 22rpx;
  }

  .company {
    font-size: 24rpx;
    padding: 3rpx 0rpx 1rpx;
  }

  .settings {
    // font-size: 20rpx;
    position: absolute;
    bottom: 40rpx;
    right: 40rpx;
    color: #3d3d3d;
  }
}

.postinfo {
  display: flex;
  justify-content: space-around;
  align-items: center;
  // width: 80%;
  height: 140rpx;
  background-color: #fff;
  margin: 20rpx 36rpx;
  border-radius: 20rpx;
  box-shadow: 0rpx 6rpx 18rpx 0rpx rgba(0, 0, 0, 0.3);

  .post-item {
    font-size: 26rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .num {
      color: $ashome-color-base;
    }

    .text {
      margin-top: 20rpx;
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
