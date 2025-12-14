/**
 * 用户信息相关接口
 */
import { get, post } from '@/utils/request';

/** 获取用户信息 */
export const profile = params => get('/api/user/userinfo', { params });

/** 登录 */
export const login = data => post('/api/user/third', { data });

/** 验证码登录 */
export const loginByCode = data => post('/user/loginByCode', { data });

/** 退出登录 */
export const logout = () => post('/user/logout');

/** 获取积分概览 */
export const overview = () => get('/api/Points/overview');
