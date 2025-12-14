<template>
  <view class="container box-border min-h-screen bg-white p-20rpx">
    <!-- 积分卡片 -->
    <MyPoints v-if="isLogin()" :show-tobtn="showTobtn" />
    <!-- AI智能穿搭模块 -->
    <view class="ai-module mb-60rpx rounded-24rpx bg-[#f0ebff] px-30rpx py-40rpx text-center" @click="handleClick()">
      <image src="@/static/images/home/sparkle.png" class="ai-icon mb-20rpx h-300rpx w-300rpx" mode="widthFix" />
      <view>
        <text class="ai-title mb-10rpx text-36rpx color-[#333] font-bold">
          AI智能穿搭
        </text>
      </view>
      <view class="">
        <text class="ai-desc text-28rpx color-[#666]">
          上传你的照片，即刻生成专属时尚造型
        </text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { isLogin } from '@/utils/auth';

const showTobtn = ref(true);

const handleClick = () => {
  uni.navigateTo({
    url: '/pages/createPhoto/index',
  });
};
</script>
