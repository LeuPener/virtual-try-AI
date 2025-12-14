import { defineStore } from 'pinia';
import { PointsApi } from '@/pages/points/api';

const usePointsStore = defineStore('points', () => {
  const pointsList = ref([]);

  const fetchPackages = async () => {
    const result = await PointsApi.packages();
    pointsList.value = result.data;
  };

  const fetchCreateOrder = async (data) => {
    return new Promise((resolve, reject) => {
      PointsApi.createOrder(data).then((res) => {
        resolve(res);
      }).catch((error) => {
        reject(error);
      });
    });
  };

  return {
    pointsList,
    fetchPackages,
    fetchCreateOrder,
  };
});

export default usePointsStore;
