<template>
  <view class="min-h-screen flex flex-col bg-[#ffffff] text-[#1a1a1a]">
    <view class="flex-1 p-32rpx pb-64rpx">
      <!-- 积分卡片 -->
      <MyPoints ref="myPointsRef" />
      <!-- 任务标题 -->
      <view class="mb-28rpx text-32rpx font-bold">
        如何赚取积分
      </view>

      <!-- 任务列表 -->
      <view class="flex flex-col gap-32rpx">
        <!-- 任务1：注册 -->
        <view class="flex items-center gap-32rpx rounded-28rpx bg-[#f8f8f8] p-32rpx">
          <view class="h-96rpx w-96rpx flex flex-shrink-0 items-center justify-center">
            <view class="h-96rpx w-96rpx flex items-center justify-center rounded-full bg-[#f0eefd]">
              <u-icon name="gift" size="24" color="#6A56E5" />
            </view>
          </view>
          <view class="flex flex-1 flex-col gap-16rpx">
            <text class="font-bold">
              新用户注册即送10积分
            </text>
            <text class="text-28rpx text-[#666666]">
              有效期6个月
            </text>
          </view>
          <view class="flex items-center gap-8rpx">
            <u-icon name="checkmark-circle" size="20" color="#10B981" />
            <text class="text-28rpx text-[#10b981] font-500">
              已完成
            </text>
          </view>
        </view>

        <!-- 任务2：邀请 -->
        <view class="flex items-center gap-32rpx rounded-28rpx bg-[#f8f8f8] p-32rpx">
          <view class="h-96rpx w-96rpx flex flex-shrink-0 items-center justify-center">
            <view class="h-96rpx w-96rpx flex items-center justify-center rounded-full bg-[#f0eefd]">
              <u-icon name="plus-people-fill" size="24" color="#6A56E5" />
            </view>
          </view>
          <view class="flex flex-1 flex-col gap-16rpx">
            <text class="font-bold">
              邀请好友得10积分
            </text>
            <text class="text-28rpx text-[#666666]">
              被邀请人完成注册并首次生成
            </text>
            <view style="width: 176rpx">
              <u-button
                shape="circle"
                :custom-style="{
                  width: '180rpx',
                  height: '70rpx',
                  background: '#6a56e5',
                  color: '#fff',
                  fontSize: '28rpx',
                }"
                @click="handleInvite"
              >
                立即邀请
              </u-button>
            </view>
          </view>
          <view class="flex items-center gap-8rpx">
            <u-icon name="checkmark-circle" size="20" color="#10B981" />
            <text class="text-28rpx text-[#10b981] font-500">
              已完成
            </text>
          </view>
        </view>

        <!-- 任务3：登录 -->
        <view class="flex items-center gap-32rpx rounded-28rpx bg-[#f0eefd] p-32rpx">
          <view class="h-96rpx w-96rpx flex flex-shrink-0 items-center justify-center">
            <view class="h-96rpx w-96rpx flex items-center justify-center rounded-full bg-[#ffffff]">
              <u-icon name="calendar" size="24" color="#6A56E5" />
            </view>
          </view>
          <view class="flex flex-1 flex-col gap-16rpx">
            <text class="text-[#6a56e5] font-bold">
              已登录{{ continuous_days }}天获得2积分
            </text>
            <text class="text-28rpx text-[#666666]">
              明日登录可得3积分
            </text>
          </view>
          <view class="flex items-center gap-8rpx">
            <u-icon name="checkmark-circle" size="20" color="#10B981" />
            <text class="text-28rpx text-[#10b981] font-500">
              已完成
            </text>
          </view>
        </view>

        <!-- 任务4：充值 -->
        <view class="flex flex-col rounded-24rpx bg-[#f8f8f8]">
          <!-- 充值主任务项 -->
          <view class="flex items-center gap-32rpx p-32rpx">
            <view class="h-96rpx w-96rpx flex flex-shrink-0 items-center justify-center">
              <view class="h-96rpx w-96rpx flex items-center justify-center rounded-full bg-[#f0eefd]">
                <u-icon name="shopping-cart" size="24" color="#6A56E5" />
              </view>
            </view>
            <view class="flex flex-1 flex-col gap-16rpx">
              <text class="font-bold">
                充值积分
              </text>
              <text class="text-28rpx text-[#666666]">
                积分有效期2年
              </text>
            </view>
            <view class="flex items-center gap-8rpx" @click="handleToFlow">
              <text style="color: #6a56e5">
                查看记录
              </text>
              <u-icon name="arrow-right" size="16" color="#6A56E5" />
            </view>
          </view>

          <!-- 充值选项 -->
          <view class="grid grid-cols-3 gap-24rpx p-32rpx text-center">
            <view
              v-for="(item, index) in pointsStore.pointsList"
              :key="index"
              class="border-[2rpx] border-transparent rounded-28rpx border-solid bg-[#f3f4f6] px-0 py-18rpx"
              :style="selectedRecharge === item.points ? { backgroundColor: 'rgba(106, 86, 229, 0.1)', borderColor: '#6a56e5' } : {}"
              @click="selectRecharge(item)"
            >
              <view>
                <text class="font-bold" :class="selectedRecharge === item.points ? 'text-[#6a56e5]' : ''">
                  {{ item.name }}
                </text>
              </view>
              <view>
                <text class="text-28rpx text-[#666666]">
                  ¥{{ item.price }}
                </text>
              </view>
            </view>
          </view>

          <!-- 充值按钮 -->
          <view class="p-32rpx">
            <u-button
              shape="circle"
              :custom-style="{
                height: '90rpx',
                background: '#6a56e5',
                color: '#fff',
                fontSize: '28rpx',
              }"
              @click="handleRecharge"
            >
              立即充值
            </u-button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { usePointsStore } from '@/pages/points/store';

const pointsStore = usePointsStore();

const selectedRecharge = ref(null);
const myPointsRef = ref(null);
const continuous_days = ref(0);

watch(
  () => myPointsRef.value?.userPoints?.continuous_days,
  (newDays) => {
    if (newDays) {
      continuous_days.value = newDays;
    }
  },
);

const loadPointsData = () => {
  pointsStore.fetchPackages();
};

const handleToFlow = () => {
  uni.navigateTo({
    url: '/pages/points/pointsFlow/index',
  });
};

const handleInvite = () => {
  uni.showToast({ title: '邀请功能待开发', icon: 'none' });
};

const selectRecharge = ({ id, points }) => {
  selectedRecharge.value = points;
  console.log(id, points);
};

const handleRecharge = async () => {
  if (selectedRecharge.value === null) {
    uni.$u.toast('请选择充值积分');
    return;
  }
  const createOrderRes = await pointsStore.fetchCreateOrder({ package_id: selectedRecharge.value }).catch((error) => {
    uni.$u.toast(error.msg);
  });
  console.log(createOrderRes);
  // uni.showToast({ title: '即将跳转支付', icon: 'loading' });
  // 实际项目中调用支付API
};

onShow(() => {
  loadPointsData();
});
</script>
