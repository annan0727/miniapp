<template>
    <view>
        <uni-fab :pattern="pattern" :content="content" horizontal="right" vertical="bottom" direction="horizontal"
            @trigger="trigger"></uni-fab>
    </view>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue'
import { onLoad, onReady } from '@dcloudio/uni-app'

onLoad(() => { })
const pattern = ref({
    color: '#7A7E83',
    buttonColor: 'a1d5ba',
    backgroundColor: '#fff',
    iconColor: '#fff'
})

const content = ref([
    {
        iconPath: '/static/image.png',
        selectedIconPath: '/static/image-active.png',
        text: '相册',
        active: false
    },
    {
        iconPath: '/static/home.png',
        selectedIconPath: '/static/home-active.png',
        text: '首页',
        active: false
    },
])

const trigger = () => { }

</script>
  
<style scoped></style>
  