<template>
  <u-popup :show="subShow" mode="bottom" :round="14" @close="close">
    <view class="flex flex-col items-center justify-center rounded-t-24rpx bg-white p-32rpx pb-40rpx">
      <!-- 标题 -->
      <view class="px-48rpx pb-20rpx pt-20rpx text-center">
        <text class="text-36rpx color-[#111827] font-bold">
          确认生成
        </text>
      </view>

      <!-- 信息列表 -->
      <view class="w-full px-32rpx py-32rpx">
        <view class="mb-20rpx min-h-112rpx flex items-center gap-32rpx rounded-32rpx bg-[#f7f7fa] p-24rpx">
          <view class="h-80rpx w-80rpx flex flex-shrink-0 items-center justify-center rounded-24rpx bg-[#eae8ff] color-[#7B61FF]">
            <u-icon name="gift" color="#7B61FF" size="24" />
          </view>
          <text class="flex-1 truncate text-28rpx color-[#374151] font-normal">
            当前积分：150
          </text>
        </view>

        <view class="mb-20rpx min-h-112rpx flex items-center gap-32rpx rounded-32rpx bg-[#f7f7fa] p-24rpx">
          <view class="h-80rpx w-80rpx flex flex-shrink-0 items-center justify-center rounded-24rpx bg-[#eae8ff] color-[#7B61FF]">
            <u-icon name="coupon" color="#7B61FF" size="24" />
          </view>
          <text class="flex-1 truncate text-28rpx color-[#374151] font-normal">
            本次扣除：5积分
          </text>
        </view>

        <view class="mb-20rpx min-h-112rpx flex items-center gap-32rpx rounded-32rpx bg-[#f7f7fa] p-24rpx">
          <view class="h-80rpx w-80rpx flex flex-shrink-0 items-center justify-center rounded-24rpx bg-[#eae8ff] color-[#7B61FF]">
            <u-icon name="clock" color="#7B61FF" size="24" />
          </view>
          <text class="flex-1 truncate text-28rpx color-[#374151] font-normal">
            预计耗时：3~5分钟
          </text>
        </view>
      </view>

      <!-- 免责声明 -->
      <view class="px-48rpx pb-48rpx pt-16rpx text-center">
        <text class="text-24rpx color-[#9ca3af]">
          免责声明：AI生成结果仅供参考，不保证100%贴合实际
        </text>
      </view>

      <!-- 按钮组 -->
      <view class="w-full flex items-center justify-center gap-32rpx px-32rpx">
        <u-button shape="circle" class="cancel-btn" :custom-style="{ height: '90rpx', background: '#f3f4f6', color: '#1f2937', fontSize: '28rpx', fontWeight: 'bold' }" @click="cancel">
          取消
        </u-button>
        <u-button shape="circle" class="confirm-btn" :custom-style="{ height: '90rpx', background: '#6a56e5', color: '#fff', fontSize: '28rpx', fontWeight: 'bold' }" @click="confirm">
          确认
        </u-button>
      </view>
    </view>
  </u-popup>
</template>

<script setup>
const props = defineProps({
  // 控制弹窗显示/隐藏
  show: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['close', 'cancel', 'confirm']);

const subShow = ref(false); // 内部状态

watch(
  () => props.show,
  (newVal) => {
    subShow.value = newVal;
  },
  { immediate: true },
);

const close = () => {
  emit('close');
};

const cancel = () => {
  close();
  emit('cancel');
};

const confirm = () => {
  close();
  emit('confirm');
};
</script>
