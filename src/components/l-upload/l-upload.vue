<template>
  <view class="l-upload">
    <view class="upload-box">
      <view
        v-for="(item, index) in fileList"
        :key="index"
        class="image-item"
        :style="{
          'width': parseWidth(width),
          'height': `${height}rpx`,
          'margin-right': `${marginRight}rpx`,
        }"
      >
        <block v-if="item.split('.')[1] === 'mp4'">
          <video
            :src="item"
            class="img"
            :style="{ width: parseWidth(width), height: `${height}rpx` }"
          />
          <view class="img-del" @tap.stop="delVideo(index)" />
        </block>
        <block v-else>
          <image
            :src="item"
            class="img"
            :style="{ width: parseWidth(width), height: `${height}rpx` }"
            @tap.stop="previewImage(index)"
          />
          <view class="img-del" @tap.stop="delImage(index)" />
        </block>
      </view>
      <view
        v-if="isShowAdd"
        class="upload-add"
        :style="{ width: parseWidth(width), height: `${height}rpx` }"
        @tap="chooseFile"
      >
        <view class="upload-icon flex-col items-center">
          <view>
            <!-- 使用 props 传入的 iconUrl, iconWidth, iconHeight -->
            <image
              :style="{ width: `${iconWidth}rpx`, height: `${iconHeight}rpx` }"
              :src="iconUrl"
            />
          </view>
          <view>
            <slot name="title" />
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { computed, ref, watch } from 'vue';

// --- Props 定义 ---
const props = defineProps({
  slotTitle: {
    type: [Number, String],
    default: '',
  },
  width: {
    type: String,
    default: '220rpx',
  },
  height: {
    type: [Number, String],
    default: 220,
  },
  iconUrl: {
    type: String,
    default: '/static/images/common/camera.png',
  },
  iconWidth: {
    type: [Number, String],
    default: 120,
  },
  iconHeight: {
    type: [Number, String],
    default: 120,
  },
  uploadType: {
    type: String,
    default: 'all',
  },
  disableAdd: {
    type: Boolean,
    default: false,
  },
  limit: {
    type: Number,
    default: 9,
  },
  sizeType: {
    type: Array,
    default() {
      return ['original', 'compressed'];
    },
  },
  sourceType: {
    type: Array,
    default() {
      return ['album', 'camera'];
    },
  },
  imageFormat: {
    type: Array,
    default() {
      return [];
    },
  },
  images: {
    type: Array,
    default() {
      return [];
    },
  },
  videos: {
    type: Array,
    default() {
      return [];
    },
  },
  serverUrl: {
    type: String,
    default: '',
  },
  fileKeyName: {
    type: String,
    default: 'file',
  },
  header: {
    type: Object,
    default() {
      return {};
    },
  },
  formData: {
    type: Object,
    default() {
      return {};
    },
  },
});

// --- Emits 定义 ---
const emit = defineEmits(['complete', 'remove']);

// --- 响应式数据 ---
const imageList = ref([...props.images]);
const videoList = ref([...props.videos]);
const fileList = ref([...props.videos, ...props.images]);
const marginRight = ref(0);

// --- 计算属性 ---
const isShowAdd = computed(() => {
  let isShow = true;
  if (
    props.disableAdd
    || (props.limit
      && imageList.value.length + videoList.value.length >= props.limit)
  ) {
    isShow = false;
  }
  return isShow;
});

// --- 侦听器 ---
watch(
  () => props.images,
  (newImages) => {
    imageList.value = [...newImages];
    fileList.value = [...videoList.value, ...newImages];
  },
  { immediate: true, deep: true },
);

watch(
  () => props.videos,
  (newVideos) => {
    videoList.value = [...newVideos];
    fileList.value = [...imageList.value, ...newVideos];
  },
  { immediate: true, deep: true },
);

// --- 方法 ---

// 1. 将 change 定义移到 uploadImage 之前
const change = () => {
  fileList.value = [...videoList.value, ...imageList.value];
  emit('complete', {
    imageArr: [...imageList.value],
    videoArr: [...videoList.value],
  });
};

const toast = (text) => {
  if (text) {
    uni.showToast({
      title: text,
      icon: 'none',
    });
  }
};
// 2. 现在 uploadImage 可以安全地调用 change 了
const uploadImage = (index, url, type) => {
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url: props.serverUrl,
      name: props.fileKeyName,
      header: props.header,
      formData: props.formData,
      filePath: url,
      success: (res) => {
        if (res.statusCode === 200) {
          // 返回结果 此处需要按接口实际返回进行修改
          // --- 语法修正：\ufeff ---
          const data = JSON.parse(res.data.replace(/\uFEFF/g, '') || '{}');
          if (data.code === 200) {
            if (type === 'image') {
              // 图片 -此处无需修改
              // --- 注意：如果 index 是为了替换特定位置的临时路径，应使用 splice ---
              // imageList.value.splice(index, 1, data.accessPath);
              imageList.value.push(data.accessPath); // 根据实际情况修改-（this.imageList不能改）- 保留原逻辑，但注意可能的问题
            }
            else if (type === 'video') {
              // 视频 -此处无需修改
              videoList.value.push(data.accessPath); // 根据实际情况修改-（this.videoList不能改）
            }
          }
          else {
            // 上传失败
          }
          resolve();
        }
        else {
          reject(res.msg);
        }
      },
      fail(res) {
        reject(res);
      },
    });
  }).finally(() => {
    // 确保无论成功失败都调用 change 更新状态
    change();
  });
};

const chooseImage = () => {
  uni.chooseImage({
    count: props.limit - imageList.value.length - videoList.value.length,
    sizeType: props.sizeType,
    sourceType: props.sourceType,
    success: (e) => {
      const imageArr = [];
      for (let i = 0; i < e.tempFiles.length; i++) {
        const len = imageList.value.length + videoList.value.length;
        if (len >= props.limit) {
          toast(`最多可上传${props.limit}张图片/视频`);
          break;
        }
        // 过滤图片类型
        const path = e.tempFiles[i].path;

        if (props.imageFormat.length > 0) {
          let format = '';
          // #ifdef H5
          const type = e.tempFiles[i].type;
          format = type.split('/')[1];
          // #endif

          // #ifndef H5
          format = path.split('.')[path.split('.').length - 1];
          // #endif

          // --- 语法修正：使用 includes ---
          if (!props.imageFormat.includes(format)) {
            const text = `只能上传 ${props.imageFormat.join(',')} 格式图片！`;
            toast(text);
            continue;
          }
        }

        imageArr.push(path);
        imageList.value.push(path);
      }

      const start = imageList.value.length - imageArr.length;
      for (let j = 0; j < imageArr.length; j++) {
        const index = start + j;
        // 服务器地址
        if (props.serverUrl) {
          uploadImage(index, imageArr[j], 'image') // <--- 调用 uploadImage
            .then(() => {
              // change(); // 由 uploadImage 的 finally 触发
            })
            .catch(() => {
              // change(); // 由 uploadImage 的 finally 触发
            });
        }
        else {
          // 无服务器地址则直接返回成功
          change();
        }
      }
    },
  });
};

const chooseVideo = () => {
  uni.chooseVideo({
    sizeType: props.sizeType,
    camera: 'back', // 默认摄像头是后置摄像头
    success: (e) => {
      videoList.value.push(e.tempFilePath);
      // 服务器地址
      if (props.serverUrl) {
        uploadImage(null, e.tempFilePath, 'video') // <--- 调用 uploadImage
          .then(() => {
            // change(); // 由 uploadImage 的 finally 触发
          })
          .catch(() => {
            // change(); // 由 uploadImage 的 finally 触发
          });
      }
      else {
        // 无服务器地址则直接返回成功
        change();
      }
    },
  });
};

// 解析 width prop，处理数字、带 rpx 或 % 的字符串
const parseWidth = (value) => {
  if (typeof value === 'number') {
    return `${value}rpx`;
  }
  if (typeof value === 'string') {
    if (value.endsWith('rpx') || value.endsWith('%')) {
      return value;
    }
    // 如果是纯数字字符串，也加上 rpx
    const num = Number(value);
    if (!Number.isNaN(num)) {
      return `${num}rpx`;
    }
  }
  // 默认返回 220rpx 以防无效输入
  console.warn(`Invalid width value: ${value}, using default.`);
  return '220rpx';
};

const chooseFile = () => {
  if (props.uploadType === 'img') {
    chooseImage();
  }
  else if (props.uploadType === 'video') {
    chooseVideo();
  }
  else {
    uni.showActionSheet({
      itemList: ['图片', '视频'],
      success: (res) => {
        if (res.tapIndex + 1 === 1) {
          chooseImage();
        }
        else {
          chooseVideo();
        }
      },
      fail(res) {
        console.log(res.errMsg);
      },
    });
  }
};

const delVideo = (index) => {
  uni.showModal({
    title: '提示',
    content: '确认删除该视频吗？',
    success: (res) => {
      if (res.confirm) {
        videoList.value.splice(index, 1);
        emit('remove', {
          index,
          type: 'video',
        });
        change();
      }
    },
  });
};

const delImage = (index) => {
  uni.showModal({
    title: '提示',
    content: '确认删除该图片吗？',
    success: (res) => {
      if (res.confirm) {
        imageList.value.splice(index, 1);
        emit('remove', {
          index,
          type: 'image',
        });
        change();
      }
    },
  });
};

const previewImage = (index) => {
  if (!imageList.value.length) return;
  uni.previewImage({
    current: imageList.value[index],
    loop: true,
    urls: imageList.value,
  });
};
</script>

<style lang="scss" scoped>
.upload-icon {
  font-style: 28rpx;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 10rpx;
}

.l-upload {
  width: 100%;

  .upload-box {
    width: 100%;
    display: flex;
    flex-wrap: wrap;

    .image-item {
      position: relative;
      margin-bottom: var(--margin-right);

      .img {
        display: block;
        background-color: #f6f6f6;
        border-radius: 16rpx;
        overflow: hidden;
      }

      .img-del {
        width: 36rpx;
        height: 36rpx;
        position: absolute;
        right: -12rpx;
        top: -12rpx;
        background-color: #ff205c;
        border-radius: 50%;
        color: white;
        font-size: 34rpx;
        z-index: 200;

        &::before {
          content: "";
          width: 16rpx;
          height: 1px;
          position: absolute;
          left: 10rpx;
          top: 18rpx;
          background-color: #fff;
        }
      }
    }

    .upload-add {
      color: #999;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
    }
  }
}
</style>
