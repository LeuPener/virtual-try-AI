<template>
  <view class="safe-area-inset-bottom h-full h-screen flex flex-col bg-white">
    <view class="flex flex-1 flex-col items-center justify-center px-[40rpx] text-center">
      <view class="flex flex-1 flex-col items-center justify-center">
        <view class="mb-6 h-160rpx w-160rpx flex items-center justify-center rounded-full bg-red-100">
          <!-- 使用 uView 的 error 图标（或自定义） -->
          <u-icon name="error-circle-fill" color="#ef4444" size="80rpx" />
        </view>

        <text class="text-3xl text-slate-900 font-bold">
          生成失败
        </text>
        <text class="mt-4 text-red-500">
          {{ errorMsg }}
        </text>
      </view>
      <!-- <view class="max-w-600rpx w-full text-center text-sm space-y-2">
        <text class="text-primary">
          已为您退还5积分，建议重新上传清晰照片
        </text>
        <text class="text-slate-500">
          每个账户每日最多自动退还2次，第3次请联系客服
        </text>
      </view> -->
      <view class="mt-a w-full">
        <view class="pb-[60rpx]">
          <u-button
            :custom-style="{
              height: '90rpx',
              fontSize: '28rpx',
              background: '#7C3AED',
              color: '#fff',
            }"
            plain
            shape="circle"
            @click="handleReport"
          >
            反馈问题
          </u-button>
        </view>
      </view>
    </view>
  </view>
  <up-modal
    :show="showAppealModal"
    title="申诉"
    content="申诉后自动退还本次生成图片消耗的积分"
    :show-cancel-button="true"
    confirm-color="#7C3AED"
    cancel-text="取消"
    confirm-text="提交申诉"
    @confirm="handleAppeal"
    @cancel="showAppealModal = false"
  />
</template>

<script setup>
defineProps({
  errorMsg: {
    type: String,
    required: true,
  },
});

const showAppealModal = ref(false);

const handleAppeal = () => {
  // 处理申诉逻辑
  showAppealModal.value = false;
};
const handleReport = () => {
  showAppealModal.value = true;
};
</script>
