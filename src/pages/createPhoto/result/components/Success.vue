<template>
  <view class="safe-area-inset-bottom h-screen flex flex-col bg-white font-sans">
    <!-- 主体内容 -->
    <main class="flex flex-1 flex-col items-center justify-center text-center">
      <!-- 标题 -->
      <text class="text-3xl text-slate-900 font-bold">
        生成成功！
      </text>

      <!-- 图片展示区（添加点击事件） -->
      <view
        class="mt-8 aspect-square max-w-560rpx w-full overflow-hidden rounded-2xl bg-gray-100"
        @click="handlePreviewImage"
      >
        <image
          :src="resultImage"
          class="h-full w-full object-cover"
          mode="aspectFill"
          @error="onImageError"
          @load="onImageLoad"
        />
      </view>

      <!-- 有效期提示 -->
      <text class="mt-8 text-xs text-slate-500">
        30天内可通过【任务管理】查看，逾期自动删除
      </text>
    </main>

    <!-- 底部操作按钮 -->
    <footer class="mx-auto max-w-560rpx w-full flex-shrink-0 pb-[30rpx] pt-[30rpx]">
      <view class="flex flex-col space-y-3">
        <!-- 保存按钮 -->
        <u-button
          shape="circle"
          :custom-style="{
            height: '90rpx',
            background: '#7C3AED',
            color: '#fff',
            fontSize: '28rpx',
            fontWeight: 'bold',
            boxShadow: '0 4rpx 12rpx rgba(124, 58, 237, 0.2)',
          }"
          @click="handleSave"
        >
          保存到相册
        </u-button>

        <!-- 再生成按钮 -->
        <u-button
          shape="circle"
          plain
          :custom-style="{
            height: '90rpx',
            borderColor: '#cbd5e1',
            color: '#0f172a',
            fontSize: '28rpx',
            fontWeight: 'bold',
            backgroundColor: 'transparent',
          }"
          @click="handleRegenerate"
        >
          再生成一张
        </u-button>
      </view>
    </footer>
  </view>
</template>

<script setup>
const { resultImage } = defineProps({
  resultImage: {
    type: String,
    required: true,
  },
});

const handleSave = () => {
  if (!resultImage) {
    uni.showToast({ title: '图片加载中', icon: 'none' });
    return;
  }

  uni.showLoading({ title: '保存中...' });
  uni.downloadFile({
    url: resultImage,
    success: (res) => {
      if (res.statusCode === 200) {
        uni.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: () => {
            uni.showToast({ title: '已保存到相册', duration: 4000 });
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

// 点击图片预览
const handlePreviewImage = () => {
  if (!resultImage) {
    uni.showToast({ title: '图片加载中', icon: 'none' });
    return;
  }
  uni.previewImage({
    urls: [resultImage],
    current: 0,
    indicator: 'number',
    loop: false,
    longPressActions: {
      itemList: ['发送给朋友', '保存图片', '收藏'],
      success: (data) => {
        console.log('长按菜单选择:', data.tapIndex);
        if (data.tapIndex === 1) {
          handleSave();
        }
      },
    },
  });
};
const handleRegenerate = () => {
  // 跳回上传页重新生成
  // uni.redirectTo({
  //   url: '/pages/homeSub/createPhoto/index',
  // });
  uni.navigateBack();
};

const onImageLoad = () => {
  console.log('图片加载成功');
};

const onImageError = () => {
  uni.showToast({ title: '图片加载失败', icon: 'none' });
};
</script>

<style scoped>
/* 可选：如果未在 uno.config 中定义 slate 系列颜色 */
.text-slate-900 {
  color: #0f172a;
}
.text-slate-500 {
  color: #64748b;
}
.bg-gray-100 {
  background-color: #f1f5f9;
}
.border-slate-300 {
  border-color: #cbd5e1;
}

/* 确保图片容器比例正确 */
.aspect-square {
  aspect-ratio: 1 / 1;
}

/* 添加点击效果 */
.bg-gray-100 {
  transition: opacity 0.2s ease;
}

.bg-gray-100:active {
  opacity: 0.8;
}
</style>
