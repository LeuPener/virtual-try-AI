<template>
  <view class="min-h-screen flex flex-col bg-[#f8f9fc] text-[#1f2937] antialiased">
    <view class="flex-1 p-32rpx">
      <!-- 全身照上传区域 -->
      <view class="mb-32rpx rounded-32rpx bg-white p-32rpx shadow-[0_2rpx_4rpx_rgba(0,0,0,0.05)]">
        <view class="border-2rpx border-[#e5e7eb] rounded-28rpx border-dashed text-center">
          <LUpload
            width="100%"
            height="450"
            icon-url="/static/images/createPhotos/alternate.png"
            :limit="1"
            :images="formdata.full_body_image"
            upload-type="img"
            @complete="(data) => successPhoto(data, 'full_body_image')"
            @remove="(removeData) => removePhoto(removeData, 'full_body_image')"
          >
            <template #title>
              <view class="mx-auto flex flex-col items-center gap-32rpx">
                <view class="max-w-960rpx flex flex-col items-center gap-16rpx">
                  <text class="text-center text-28rpx text-[#1f2937] font-bold">
                    请上传全身照
                  </text>
                  <text class="text-center text-28rpx text-[#6b7280] font-normal">
                    正面、无遮挡、光线充足、背景简洁
                  </text>
                </view>
              </view>
            </template>
          </LUpload>
        </view>
      </view>

      <!-- 服饰照上传区域 -->
      <view class="mb-32rpx rounded-32rpx bg-white p-32rpx shadow-[0_2rpx_4rpx_rgba(0,0,0,0.05)]">
        <view class="flex items-center justify-between pb-10rpx">
          <view class="pb-24rpx text-28rpx text-[#1f2937] font-bold">
            上传服饰照
          </view>
          <!-- <text class="text-24rpx text-[#6b7280]">示例说明 ></text> -->
        </view>
        <text class="pb-32rpx text-28rpx text-[#6b7280] font-normal">
          服饰图要求：正面单品、无杂物、清晰衣型
        </text>

        <view class="grid grid-cols-3 mt-30rpx gap-32rpx">
          <view
            v-for="item in clothingItems"
            :key="item.name"
            class="rounded-28rpx bg-[#f4f2ff] text-center"
          >
            <LUpload
              width="100%"
              height="200"
              :icon-url="item.iconUrl"
              :icon-width="72"
              :icon-height="72"
              :limit="1"
              :images="formdata[item.name]"
              upload-type="img"
              @complete="(data) => successPhoto(data, item.name)"
              @remove="(removeData) => removePhoto(removeData, item.name)"
            >
              <template #title>
                <view class="mx-auto flex flex-col items-center gap-32rpx">
                  <view class="max-w-960rpx flex flex-col items-center gap-16rpx">
                    <text class="text-center text-28rpx text-[#1f2937] font-bold">
                      {{ item.title }}
                    </text>
                  </view>
                </view>
              </template>
            </LUpload>
          </view>
        </view>
      </view>
    </view>

    <!-- 底部操作栏 -->
    <view class="fixed bottom-0 left-0 right-0 border-t-2rpx border-[#e5e7eb] bg-white/90 p-32rpx shadow-[0_-4rpx_20rpx_rgba(0,0,0,0.05)] backdrop-blur-[8px]">
      <view class="flex flex-col items-center gap-16rpx">
        <text v-if="!canSubmit" class="h-32rpx text-center text-24rpx text-[#ef4444] font-normal">
          请至少上传全身照 + 1张服饰图才能继续
        </text>
        <u-button
          shape="circle"
          :disabled="!canSubmit"

          :custom-style="{
            height: '90rpx',
            background: '#6a56e5',
            color: '#fff',
            fontSize: '28rpx',
            fontWeight: 'bold',
          }"
          @click="submit"
        >
          <!-- -->

          一键换衣
        </u-button>
        <!-- <text class="text-24rpx text-[#6b7280] font-normal">
          消耗 5 积分
        </text> -->
      </view>
    </view>

    <GenerationPopup
      :show="showPopup"
      @confirm="onConfirm"
      @cancel="onClose"
      @close="onClose"
    />
  </view>
</template>

<script setup>
import GenerationPopup from '@/pages/createPhoto/components/GenerationPopup.vue';
import { useGenerateStore } from '@/pages/createPhoto/store';

const generateStore = useGenerateStore();

const formdata = ref({
  full_body_image: [],
  top_image: [],
  bottom_image: [],
  shoes_image: [],
});
const formdataName = ref('');

const clothingItems = ref([
  {
    iconUrl: '/static/images/createPhotos/shirt.png',
    title: '上衣',
    name: 'top_image',
  },
  {
    iconUrl: '/static/images/createPhotos/cloakroom.png',
    title: '裤子/裙子',
    name: 'bottom_image',
  },
  {
    iconUrl: '/static/images/createPhotos/shoes.png',
    title: '鞋子',
    name: 'shoes_image',
  },
]);
const showPopup = ref(false);
const canSubmit = computed(() => {
  // 检查是否上传了全身照和至少一张服饰照
  return (
    formdata.value.full_body_image.length
    && (formdata.value.top_image.length
      || formdata.value.bottom_image.length
      || formdata.value.shoes_image.length)
  );
});

const successPhoto = (data, name) => {
  formdataName.value = name;
  formdata.value[name] = data.imageArr; // 服饰照路径
};

const removePhoto = ({ index }, name) => {
  formdata.value[name].splice(index, 1);
};

const onClose = () => {
  showPopup.value = false;
};

const onConfirm = async () => {
  generateStore.setOutfitImages(formdata.value);
  uni.navigateTo({
    url: '/pages/createPhoto/result/index',
  });
  onClose();
};

const submit = () => {
  showPopup.value = true;
};

onShow(() => {
  // formdata.value = {
  //   full_body_image: [],
  //   top_image: [],
  //   bottom_image: [],
  //   shoes_image: [],
  // };
});
</script>
