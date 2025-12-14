import { defineStore } from 'pinia';
import { GenerateApi } from '@/pages/createPhoto/api';

const useGenerateStore = defineStore('generate', () => {
  const photoResult = ref({});
  const outfitImages = ref({});
  const loading = ref(false);
  const error = ref(null);

  const setOutfitImages = (images) => {
    outfitImages.value = images;
  };

  const generatePhotoAction = async (data) => {
    return new Promise((resolve, reject) => {
      GenerateApi.generatePhoto(data).then((res) => {
        photoResult.value = res.data;
        resolve(res);
      }).catch((error) => {
        reject(error);
      });
    });
  };

  return {
    photoResult,
    outfitImages,
    loading,
    error,
    setOutfitImages,
    generatePhotoAction,
  };
});

export default useGenerateStore;
