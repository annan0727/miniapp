<script lang="ts" setup>
import { ref } from 'vue'
import { onLoad, onReady } from '@dcloudio/uni-app'

onLoad(() => { })

const items = ref(['选项1', '选项2'])
const current = ref(0)
// 上滑加载状态
const status: any = ref('nomore')

// 搜索关键词查询
const search = (e: UniHelper.UniSearchBarBaseEvent) => {
  console.log(e.value);

}

const tabBars = ref([
  {
    name: '最新',
    id: 'zuixin'
  }, {
    name: '精选',
    id: 'jingxuna'
  }
])

// 当前选中分类
const tabIndex = ref(0)

// 分类查询
// 顶部分类点击 
const ontabtap = (e: number) => {
  tabIndex.value = e
}

// 下拉刷新状态
const isTriggered = ref(false)

// 自定义下拉刷新被触发
const onRefresher = async () => {
  // 开启动画
  isTriggered.value = true
  // 重置猜你喜欢组件数据
  // guessRef.value?.resetData() // 加载数据
  // await Promise.all([getHomeBannerData(), getHomeCategoryData(), getHomeHotData()]) // 关闭动画
  setTimeout(() => {
    isTriggered.value = false
  }, 2000)
}

const scrollTop = ref(0)
//头部固定
const scrollTopFun = (e: UniHelper.ScrollViewOnScrollEvent) => {
  let top = e.detail.scrollTop;
  scrollTop.value = top;

}
// 滚动条触底 上滑加载更多
const onScrolltolower = () => {
  console.log('触底了');
  // 加载更多
  setTimeout(() => {
    status.value = 'nomore' // 加载完成
  }, 2000)

}
// 预览图片
const previewImage = () => {
  wx.previewImage({
    urls: ["https://img.yzcdn.cn/vant/cat.jpeg"], //多张的时候加，
    current: "https://img.yzcdn.cn/vant/cat.jpeg", // 点击后显示的图片路径，默认是第一个
  })
}
</script>

<template>
  <scroll-view class="container" :scroll-y="true" :show-scrollbar="false" :refresher-enabled="true" enable-back-to-top
    @refresherrefresh="onRefresher" :refresher-triggered="isTriggered" @scroll="scrollTopFun"
    @scrolltolower="onScrolltolower">
    <!-- 顶部搜索 -->
    <uni-search-bar placeholder="搜索" bgColor="#fff" @confirm="search" :radius="20" />
    <!-- 顶部分类 -->
    <scroll-view class="scroll-cate" :class="scrollTop > 50 ? 'topnav' : ''" :scroll-x="true">
      <view v-for="( tab, index ) in  tabBars " :key="tab.id" class="uni-tab-item" :id="tab.id" :data-current="index"
        @click="ontabtap(index)">
        <text class="uni-tab-item-title" :class="tabIndex == index ? 'uni-tab-item-title-active' : ''">{{ tab.name
        }}</text>
      </view>
    </scroll-view>
    <!-- 文章交流列表 -->
    <view class="exchange-list">
      <view class="list-item" v-for="item in 3">
        <view class="item-top">
          <view class="let-info">
            <image src="https://img.yzcdn.cn/vant/cat.jpeg" class="item-avator"></image>
            <view class="item-name">{{ '章益帆' }}</view>
          </view>
          <view class="right-time">{{ '2022-01-01' }}</view>
        </view>
        <view class="item-content">
          <view class="item-title">{{ '强直患者的吃什么药强直患者的吃什么药强直患者的吃什么药强直患者的吃什么药~' }}</view>
          <view class="item-desc">
            高祖刘邦，沛县丰邑中阳里人，汉朝开国皇帝，汉民族和汉文化伟大的开拓者之一、中国历史上杰出的政治家、卓越的战略家和指挥家。对汉族的发展，以及中国的统一和强大有突出贡献。
          </view>
        </view>
        <view class="item-image">
          <image src="https://img.yzcdn.cn/vant/cat.jpeg" class="as-image" mode="aspectFill" lazy-load
            @click="previewImage"></image>
          <image src="https://img.yzcdn.cn/vant/cat.jpeg" class="as-image" mode="aspectFill" lazy-load></image>
          <image src="https://img.yzcdn.cn/vant/cat.jpeg" class="as-image" mode="aspectFill" lazy-load></image>
          <image src="https://img.yzcdn.cn/vant/cat.jpeg" class="as-image" mode="aspectFill" lazy-load></image>
          <image src="https://img.yzcdn.cn/vant/cat.jpeg" class="as-image" mode="aspectFill" lazy-load></image>
        </view>
        <!-- 底部 浏览 评论 点赞 收藏 栏  -->
        <view class="item-bottom">
          <view class="bottom-item">
            <text class="item-icon icon-a-44tubiao-113"></text>
            <text class="item-text">{{ 80 }}</text>
          </view>
          <view class="bottom-item">
            <text class="item-icon icon-a-44tubiao-112"></text>
            <text class="item-text">{{ 100 }}</text>
          </view>
          <view class="bottom-item">
            <text class="item-icon icon-a-44tubiao-21"></text>
            <text class="item-text">{{ 60 }}</text>
          </view>
          <view class="bottom-item">
            <text class="item-icon icon-a-44tubiao-134"></text>
            <text class="item-text">{{ 40 }}</text>
          </view>
        </view>
      </view>
    </view>
    <view class="loading-text">
      <uni-load-more :status="status" color="#a1d5ba" :contentText="{
        contentdown: '上滑显示更多', contentrefresh: '正在加载...'
        , contentnomore: '没有更多内容了~'
      }"></uni-load-more>
    </view>
  </scroll-view>
</template>

<style lang="scss">
$ashome-color-base: #a1d5ba;

page {
  background-color: #f4f4f4;
}

.container {
  height: 100vh;

  // 分类 tab区
  .scroll-cate {
    // width: 100%;
    height: 86rpx;
    flex-direction: row;
    white-space: nowrap;
    // border-bottom: 1rpx solid #e1e1e1;
    // margin: 16rpx;
    background-color: #fff;

    .uni-tab-item {
      /* #ifndef APP-PLUS */
      display: inline-block;
      /* #endif */
      flex-wrap: nowrap;
      padding-left: 34rpx;
      padding-right: 20rpx;
    }

    .uni-tab-item-title {
      color: #3d3d3d;
      font-weight: bold;
      font-size: 30rpx;
      height: 80rpx;
      line-height: 86rpx;
      flex-wrap: nowrap;
      /* #ifndef APP-PLUS */
      white-space: nowrap;
      /* #endif */
    }

    .uni-tab-item-title-active {
      color: $ashome-color-base;
      font-size: 34rpx;
    }
  }

  /* 头部固定 */
  .topnav {
    position: sticky;
    top: 0rpx;
    left: 0;
    background: #fff;
    z-index: 999;
  }

  // 中间文章列表区
  .exchange-list {

    .list-item {
      background-color: #fff;
      border-radius: 10rpx;
      margin-bottom: 10rpx;
      padding: 20rpx;
      margin: 10rpx;
      color: #3d3d3d;

      .item-top {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .let-info {
          display: flex;
          align-items: center;

          .item-avator {
            width: 64rpx;
            height: 64rpx;
            border-radius: 50%;
          }

          .item-name {
            font-size: 28rpx;
            margin-left: 10rpx;
          }
        }

        .right-time {
          font-size: 24rpx;
          color: #767676;
        }
      }

      .item-content {
        margin-top: 10rpx;
        font-size: 26rpx;

        .item-title {
          font-weight: bold;
          margin-bottom: 10rpx;
          // 多行文字超出显示省略号
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;

        }

        .item-desc {
          margin-top: 10rpx;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
        }
      }

      .item-image {
        margin-top: 10rpx;
        display: flex;
        align-items: center;
        flex-wrap: wrap;

        .as-image {
          width: 162rpx;
          height: 162rpx;
          margin-right: 12rpx;
          margin-bottom: 12rpx;
          border-radius: 10rpx;

        }
      }

      .item-bottom {
        margin-top: 10rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .bottom-item {
          display: flex;
          align-items: center;
          font-size: 24rpx;
        }
      }
    }
  }

  // 加载提示文字
  .loading-text {
    text-align: center;
    font-size: 28rpx;
    color: #666;
    padding: 20rpx 0;
  }

}
</style>
