<template>
  <view
    class="points-card mb-40rpx rounded-24rpx bg-[linear-gradient(135deg,#9933ff,#6600cc)] color-white shadow-[0_8rpx_20rpx_rgba(153,51,255,0.2)]"
  >
    <view class="points-header-box p-30rpx">
      <view class="points-header flex items-center justify-between">
        <view>
          <text class="label text-28rpx opacity-80">
            可用积分
          </text>
        </view>
        <view v-if="showTobtn">
          <u-button
            :custom-style="{ fontWeight: 'bold', color: '#7f13ec', borderRadius: '24rpx' }"
            text="获取积分"
            @click="handleToGongLue"
          />
        </view>
      </view>
      <view class="points-value mb-20rpx text-60rpx font-bold">
        {{ userPoints.available_points }}
      </view>
    </view>
    <view
      class="points-footer flex items-center justify-between rounded-b-24rpx bg-[rgba(0,0,0,0.1)] p-30rpx text-28rpx opacity-90"
    >
      <view class="expire-info flex items-center gap-8rpx">
        <u-icon name="info-circle" size="16" color="#FFA500" />
        <text>即将到期:</text>
        <text class="font-bold">
          {{ userPoints.expiring_points }}
        </text>
      </view>
      <text>到期日期: 2024-07-31</text>
    </view>
  </view>
</template>

<script setup>
import { useUserStore } from '@/store';
import { isLogin } from '@/utils/auth';

defineProps({
  showTobtn: {
    type: Boolean,
    default: false,
  },
});

const userStore = useUserStore();
const userPoints = computed(() => userStore.user_points || {});

const loadPoints = async () => {
  if (isLogin()) {
    await userStore.fetchUserPoints();
  }
};

const handleToGongLue = () => {
  uni.navigateTo({
    url: '/pages/points/index',
  });
};

onShow(async () => {
  loadPoints();
});

defineExpose({
  userPoints,
  loadPoints,
});
</script>
