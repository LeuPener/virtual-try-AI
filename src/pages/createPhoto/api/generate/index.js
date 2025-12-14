/**
 * 生成图片相关接口
 */
import { post } from '@/utils/request';

/** 生成照片 */
export const generatePhoto = data =>
  post('/api/Virtualtryon/tryonMulti', { data: data.data, header: data.header });
