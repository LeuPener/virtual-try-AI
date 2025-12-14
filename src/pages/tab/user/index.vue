<template>
  <view class="p-30rpx">
    <!-- 用户ID卡片 -->
    <view class="mb-30rpx flex items-center justify-between rounded-16rpx bg-[#f5f5f5] px-30rpx py-24rpx text-32rpx color-[#333]">
      <text>用户ID 123456789</text>
    </view>

    <!-- 积分组件 -->
    <MyPoints :points="points" :show-tobtn="showTobtn" />

    <!-- 链接盒子 -->
    <view class="mt-20rpx rounded-16rpx bg-white">
      <u-cell-group :border="false">
        <u-cell
          title="联系客服"
          :border="false"
          :is-link="true"
          @click="handleLinkTo('/pages/contact/index')"
        />
      </u-cell-group>
    </view>
  </view>
</template>

<script setup>
const points = ref(100);
const showTobtn = ref(true);

const handleLinkTo = (url) => {
  uni.navigateTo({
    url,
  });
};
</script>
