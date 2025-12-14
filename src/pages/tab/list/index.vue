<template>
  <view class="relative h-auto min-h-screen w-full flex flex-col bg-[#f7f6f8] dark:bg-[#191022]">
    <view class="flex-1">
      <view class="px-4 pt-4">
        <z-paging ref="pagingRef" v-model="dataList" @query="queryList">
          <view
            v-for="(item, index) in dataList"
            :key="item.id || index"
            class="mb-4 rounded-lg bg-white p-4 dark:bg-[rgba(30,41,59,0.5)]"
          >
            <!-- 任务头部信息 -->
            <view class="mb-3 flex items-center justify-between">
              <view class="flex items-center gap-2">
                <!-- 任务状态标签 -->
                <view
                  class="rounded-full px-3 py-1 text-xs font-medium"
                  :class="getStatusClass(item.status)"
                >
                  {{ getStatusText(item.status) }}
                </view>
                <!-- 消耗积分 -->
                <text class="text-sm color-[#64748b] dark:color-[#94a3b8]">
                  消耗 {{ item.points || 0 }} 积分
                </text>
              </view>
              <!-- 提交时间 -->
              <text class="text-xs color-[#64748b] dark:color-[#94a3b8]">
                {{ formatTime(item.create_time) }}
              </text>
            </view>

            <!-- 任务图片预览（如果有） -->
            <view v-if="item.image_url && canViewImage(item.create_time)" class="mb-3">
              <image
                :src="item.image_url"
                class="h-400rpx w-full rounded-lg object-cover"
                mode="aspectFill"
                @click="handlePreviewImage(item.image_url)"
              />
            </view>

            <!-- 过期提示 -->
            <view
              v-if="!canViewImage(item.create_time)"
              class="mb-3 flex items-center justify-center rounded-lg bg-gray-100 py-8 dark:bg-[rgba(30,41,59,0.3)]"
            >
              <text class="text-sm color-[#94a3b8]">
                图片已过期（超过 30 天）
              </text>
            </view>

            <!-- 操作按钮 -->
            <view class="flex gap-2">
              <!-- 查看图片按钮（仅已完成且30天内） -->
              <u-button
                v-if="item.status === 'success' && canViewImage(item.create_time) && item.image_url"
                size="small"
                shape="circle"
                :custom-style="{
                  flex: 1,
                  height: '70rpx',
                  fontSize: '26rpx',
                  borderColor: '#7C3AED',
                  color: '#7C3AED',
                  backgroundColor: 'transparent',
                }"
                plain
                @click="handlePreviewImage(item.image_url)"
              >
                查看图片
              </u-button>

              <!-- 保存图片按钮（仅已完成且30天内） -->
              <u-button
                v-if="item.status === 'success' && canViewImage(item.create_time) && item.image_url"
                size="small"
                shape="circle"
                :custom-style="{
                  flex: 1,
                  height: '70rpx',
                  fontSize: '26rpx',
                  background: '#7C3AED',
                  color: '#fff',
                }"
                @click="handleSaveImage(item.image_url)"
              >
                保存图片
              </u-button>

              <!-- 失败状态提示 -->
              <view
                v-if="item.status === 'failure'"
                class="flex flex-1 items-center justify-center rounded-lg bg-red-50 py-3 dark:bg-[rgba(220,38,38,0.1)]"
              >
                <text class="text-xs color-[#dc2626]">
                  {{ item.error_msg || '生成失败' }}
                </text>
              </view>

              <!-- 执行中状态提示 -->
              <view
                v-if="item.status === 'pending'"
                class="flex flex-1 items-center justify-center rounded-lg bg-blue-50 py-3 dark:bg-[rgba(59,130,246,0.1)]"
              >
                <u-loading-icon mode="spinner" color="#3b82f6" size="20" />
                <text class="ml-2 text-xs color-[#3b82f6]">
                  生成中...
                </text>
              </view>
            </view>
          </view>
        </z-paging>
      </view>
    </view>
  </view>
</template>

<script setup>
import dayjs from 'dayjs';
import { usePermission } from '@/hooks';

const pagingRef = ref(null);
const dataList = ref([]);

// 格式化时间
const formatTime = (time) => {
  if (!time) return '';
  return dayjs(time).format('YYYY-MM-DD HH:mm:ss');
};

// 判断是否在30天内
const canViewImage = (createTime) => {
  if (!createTime) return false;
  const daysDiff = dayjs().diff(dayjs(createTime), 'day');
  return daysDiff <= 30;
};

// 获取状态文本
const getStatusText = (status) => {
  const statusMap = {
    pending: '执行中',
    success: '已完成',
    failure: '生成失败',
  };
  return statusMap[status] || '未知';
};

// 获取状态样式类
const getStatusClass = (status) => {
  const classMap = {
    pending: 'bg-blue-100 color-[#3b82f6] dark:bg-[rgba(59,130,246,0.2)]',
    success: 'bg-green-100 color-[#059669] dark:bg-[rgba(5,150,105,0.2)]',
    failure: 'bg-red-100 color-[#dc2626] dark:bg-[rgba(220,38,38,0.2)]',
  };
  return classMap[status] || 'bg-gray-100 color-[#64748b]';
};

// 生成模拟数据
const generateMockData = (pageNo, pageSize) => {
  const now = dayjs();
  const mockList = [];

  // 生成不同状态和时间的任务数据
  const statuses = ['success', 'success', 'pending', 'failure', 'success'];
  const pointsList = [5, 10, 5, 5, 10];

  // 创建不同时间的任务（有些在30天内，有些超过30天）
  const timeOffsets = [
    { days: 1, hours: 2 }, // 1天前 - 30天内
    { days: 15, hours: 5 }, // 15天前 - 30天内
    { days: 0, hours: 1 }, // 1小时前 - 执行中
    { days: 5, hours: 3 }, // 5天前 - 失败
    { days: 35, hours: 0 }, // 35天前 - 超过30天
  ];

  const imageUrls = [
    'https://picsum.photos/400/800?random=1',
    'https://picsum.photos/400/400?random=2',
    'https://picsum.photos/400/400?random=3',
    '',
    'https://picsum.photos/400/400?random=4',
  ];

  const errorMessages = [
    '',
    '',
    '',
    '图片处理失败，请重新上传清晰照片',
    '',
  ];

  // 根据页码生成数据
  const startIndex = (pageNo - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  for (let i = startIndex; i < endIndex; i++) {
    const statusIndex = i % statuses.length;
    const status = statuses[statusIndex];
    const timeOffset = timeOffsets[statusIndex];
    const createTime = now.subtract(timeOffset.days, 'day').subtract(timeOffset.hours, 'hour');

    mockList.push({
      id: i + 1,
      create_time: createTime.format('YYYY-MM-DD HH:mm:ss'),
      points: pointsList[statusIndex],
      status,
      image_url: status === 'success' ? imageUrls[statusIndex] : '',
      error_msg: status === 'failure' ? errorMessages[statusIndex] : '',
    });
  }

  return mockList;
};

// 查询列表
const queryList = (pageNo, pageSize) => {
  // 模拟网络请求延迟
  setTimeout(() => {
    try {
      const mockData = generateMockData(pageNo, pageSize);
      // 模拟最后一页（假设总共50条数据）
      const totalPages = Math.ceil(50 / pageSize);
      if (pageNo > totalPages) {
        pagingRef.value?.complete([]);
      }
      else {
        pagingRef.value?.complete(mockData);
      }
    }
    catch (error) {
      console.error('获取数据失败:', error);
      pagingRef.value?.complete(false);
    }
  }, 500);

  // 真实接口调用（已注释，需要时可取消注释）
  // import { GenerateApi } from '@/pages/createPhoto/api';
  // GenerateApi.getHistoryTasks({ page: pageNo, pagesize: pageSize })
  //   .then((res) => {
  //     const list = (res.data?.list || []).map(item => ({
  //       id: item.id,
  //       create_time: item.create_time,
  //       points: item.points,
  //       status: item.status || 'pending',
  //       image_url: item.image_url || '',
  //       error_msg: item.error_msg || '',
  //     }));
  //     pagingRef.value?.complete(list);
  //   })
  //   .catch(() => {
  //     pagingRef.value?.complete(false);
  //   });
};

// 预览图片
const handlePreviewImage = (imageUrl) => {
  if (!imageUrl) {
    uni.showToast({ title: '图片加载中', icon: 'none' });
    return;
  }
  uni.previewImage({
    urls: [imageUrl],
    current: 0,
    indicator: 'number',
    loop: false,
  });
};

// 保存图片到相册
const handleSaveImage = (imageUrl) => {
  if (!imageUrl) {
    uni.showToast({ title: '图片加载中', icon: 'none' });
    return;
  }

  uni.showLoading({ title: '保存中...' });
  uni.downloadFile({
    url: imageUrl,
    success: (res) => {
      if (res.statusCode === 200) {
        uni.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: () => {
            uni.showToast({ title: '已保存到相册', duration: 2000 });
          },
          fail: (err) => {
            uni.showToast({ title: '保存失败', icon: 'none' });
            console.error('相册保存失败:', err);
          },
          complete: () => uni.hideLoading(),
        });
      }
      else {
        uni.hideLoading();
        uni.showToast({ title: '下载失败', icon: 'none' });
      }
    },
    fail: (err) => {
      uni.hideLoading();
      uni.showToast({ title: '网络错误', icon: 'none' });
      console.error('下载失败:', err);
    },
  });
};

onShow(async () => {
  const hasPermission = await usePermission();
  if (!hasPermission) {
    console.log('未登录，拦截跳转');
    return;
  }
  // 刷新列表
  pagingRef.value?.reload();
});
</script>
