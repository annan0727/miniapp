<template>
  <view>
    <uni-fab
      :pattern="pattern"
      :content="content"
      horizontal="right"
      vertical="bottom"
      direction="horizontal"
      @trigger="trigger"
      class="add-button"
      ref="fabRef"
    ></uni-fab>
  </view>
</template>

<script lang="ts" setup>
import type { toValue } from 'vue'
import { ref } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'

const fabRef = ref<any>(null)
onShow(() => {
  content.value.forEach((item, index) => {
    item.active = false
  })
  fabRef.value && fabRef.value.close()
})
const pattern = ref({
  color: '#000',
  buttonColor: '#a1d5ba',
  backgroundColor: '#fff',
  iconColor: '#fff',
  selectedColor: '#a1d5ba',
})

const content = ref([
  {
    iconPath: '/static/images/tabbar/exchange.png',
    selectedIconPath: '/static/images/tabbar/exchange_checked.png',
    text: '交流',
    active: false,
  },
  {
    iconPath: '/static/images/tabbar/strategy.png',
    selectedIconPath: '/static/images/tabbar/strategy_checked.png',
    text: '攻略',
    active: false,
  },
])

const trigger = (e) => {
  content.value.forEach((item, index) => {
    if (index === e.index) {
      item.active = true
      uni.navigateTo({
        url: '/pagesArticle/exchangeArticle',
      })
    } else {
      item.active = false
    }
  })
}
</script>

<style lang="scss">
.uni-fab--rightBottom {
  box-shadow: 0 0 10rpx 0 rgba(0, 0, 0, 0.2) !important;
}
</style>
