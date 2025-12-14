/**
 * 用户信息相关接口
 */
import { get, post } from '@/utils/request';

/** 获取积分购买套餐 */
export const packages = () => get('/api/Points/packages');

/** 获取积分流水记录 */
export const flow = params => get('/api/Points/flow', { params });

/** 创建积分购买订单 */
export const createOrder = data => post('/api/Points/createOrder', { data });
