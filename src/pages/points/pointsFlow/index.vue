<template>
  <view class="relative h-auto min-h-screen w-full flex flex-col bg-[#f7f6f8] dark:bg-[#191022]">
    <view class="flex-1">
      <view class="px-4 pt-4">
        <view class="grid grid-cols-12 gap-4 px-4 py-2">
          <text class="col-span-4 text-xs color-[#64748b] font-bold tracking-wider uppercase dark:color-[#94a3b8]">
            时间
          </text>
          <text class="col-span-4 text-xs color-[#64748b] font-bold tracking-wider uppercase dark:color-[#94a3b8]">
            用途
          </text>
          <text class="col-span-4 text-right text-xs color-[#64748b] font-bold tracking-wider uppercase dark:color-[#94a3b8]">
            积分变动/剩余
          </text>
        </view>
        <view class="flex flex-col gap-24rpx">
          <z-paging ref="pagingRef" v-model="dataList" @query="queryList">
            <view
              v-for="(record, index) in dataList"
              :key="index"
              class="grid grid-cols-12 min-h-18 items-center gap-4 rounded-lg bg-white p-4 dark:bg-[rgba(30,41,59,0.5)]"
            >
              <view class="col-span-4 flex flex-col justify-center">
                <text class="text-sm color-[#1e293b] font-medium leading-normal dark:color-[#cbd5e1]">
                  {{ record.date }}
                </text>
                <text class="text-xs color-[#64748b] font-normal leading-normal dark:color-[#94a3b8]">
                  {{ record.time }}
                </text>
              </view>
              <view class="col-span-4 flex items-center">
                <text class="truncate text-sm color-[#1e293b] font-medium leading-normal dark:color-[#cbd5e1]">
                  {{ record.reason }}
                </text>
              </view>
              <view class="col-span-4 flex-shrink-0 text-right">
                <text
                  class="text-base font-semibold leading-normal"
                  :class="[record.change > 0 ? 'color-[#059669]' : 'color-[#dc2626]']"
                >
                  {{ record.change > 0 ? '+' : '' }}{{ record.change }}
                </text>
                <text class="block text-xs color-[#64748b] font-normal leading-normal dark:color-[#94a3b8]">
                  {{ record.remaining }}
                </text>
              </view>
            </view>
          </z-paging>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { PointsApi } from '@/pages/points/api';

const pagingRef = ref(null);
const dataList = ref([]);

const queryList = (pageNo, pageSize) => {
  PointsApi.flow({ page: pageNo, pagesize: pageSize }).then((res) => {
    pagingRef.value.complete(res.data.list);
  }).catch(() => {
    pagingRef.value.complete(false);
  });
};
</script>
