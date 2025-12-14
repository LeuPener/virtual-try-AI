<template>
  <view class="safe-area-inset-bottom h-full h-screen flex flex-col bg-white">
    <view class="flex flex-1 flex-col items-center justify-center px-[40rpx] text-center">
      <view class="sparkle-loader" aria-label="AI 正在生成穿搭效果图">
        <view class="sparkle" />
        <view class="sparkle" />
        <view class="sparkle" />
        <view class="sparkle" />
        <view class="sparkle" />
        <view class="sparkle" />
        <view class="sparkle" />
        <view class="sparkle" />
      </view>

      <view class="mt-8">
        <text class="text-2xl text-gray-900 font-bold">
          正在生成中...
        </text>
        <text class="mt-4 block text-base text-gray-600">
          AI正在为你智能合成穿搭图，请稍候
        </text>
        <text class="mt-2 block text-sm text-[#7C3AED]">
          可关闭页面，完成后将通过微信通知您
        </text>
      </view>
      <view class="mt-a w-full">
        <view class="pb-[60rpx]">
          <u-button
            :custom-style="{
              height: '90rpx',
              fontSize: '28rpx',
              color: '#64748b',
            }"
            plain
            shape="circle"
            @click="handleCancel"
          >
            返回
          </u-button>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
const handleCancel = () => {
  uni.navigateBack();
};
</script>

<style lang="scss" scoped>
.sparkle-loader {
  width: 240rpx;
  height: 240rpx;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 200rpx;;
}

.sparkle {
  position: absolute;
  width: 20rpx;
  height: 20rpx;
  background: #7C3AED;
  border-radius: 50%;
  animation: sparkle-anim 2s infinite ease-in-out;
  transform-origin: center;
}

.sparkle:nth-child(1) { top: 20rpx; left: 110rpx; animation-delay: 0s; }
.sparkle:nth-child(2) { top: 50rpx; left: 190rpx; animation-delay: -0.25s; }
.sparkle:nth-child(3) { top: 140rpx; left: 210rpx; animation-delay: -0.5s; }
.sparkle:nth-child(4) { top: 200rpx; left: 150rpx; animation-delay: -0.75s; }
.sparkle:nth-child(5) { top: 190rpx; left: 50rpx; animation-delay: -1s; }
.sparkle:nth-child(6) { top: 110rpx; left: 0; animation-delay: -1.25s; }
.sparkle:nth-child(7) { top: 30rpx; left: 30rpx; animation-delay: -1.5s; }
.sparkle:nth-child(8) {
  width: 48rpx;
  height: 48rpx;
  background: #A78BFA;
  animation-delay: -1.75s;
}

@keyframes sparkle-anim {
  0%, 100% {
    transform: scale(0.2);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
}
</style>
