<template>
  <view>
    <Pending v-if="status === 'pending'" />
    <Success v-else-if="status === 'success'" :result-image="result.image_url" />
    <Failure v-else-if="status === 'failure'" :error-msg="result.error_msg" />
  </view>
</template>

<script setup>
import Failure from '@/pages/createPhoto/result/components/Failure';
import Pending from '@/pages/createPhoto/result/components/Pending';
import Success from '@/pages/createPhoto/result/components/Success';
import { useGenerateStore } from '@/pages/createPhoto/store';
import { FormData } from '@/pages/createPhoto/utils/formData';

const generateStore = useGenerateStore();

const status = ref('pending');
const result = reactive({
  // https://fuzhuang.doushou.top/uploads/et_images/20251122/virtual_tryon_20251122105800_692126b8d97f8.png
  image_url: '',
  error_msg: '',
});

const loadResult = async () => {
  const pathData = Object.fromEntries(
    Object.entries(generateStore.outfitImages).map(([k, v]) => [k, Array.isArray(v) ? v[0] || '' : v]),
  );
  const formData = new FormData();
  const fields = ['full_body_image', 'top_image', 'bottom_image', 'shoes_image'];

  fields.forEach((field) => {
    const path = pathData[field];
    if (path) {
      const timestamp = Date.now();
      const randomPart = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
      const ext = path.match(/\.([a-z0-9]{2,5})$/i)?.[1] || 'jpg';
      const filedName = `${timestamp}${randomPart}.${ext}`;
      formData.appendFile(field, path, filedName);
    }
  });

  const uploadData = formData.getData();
  const generatePhotoRes = await generateStore.generatePhotoAction({ data: uploadData.buffer, header: {
    'content-type': uploadData.contentType,
  } }).catch((error) => {
    status.value = 'failure';
    result.error_msg = error.msg || '服务器繁忙，请稍后重试';
  });

  if (generatePhotoRes.code && generatePhotoRes.code === 200) {
    status.value = 'success';
    result.image_url = generatePhotoRes.data.image_url;
  }
};

onShow(() => {
  loadResult();
});
</script>
