<template>
  <view class="h-screen min-h-screen w-full flex flex-col bg-white">
    <view class="flex flex-1 flex-col px-6 py-0">
      <!-- 页面标题 -->
      <view class="pt-64rpx">
        <text class="text-3xl text-gray-900 font-bold">
          登录
        </text>
      </view>

      <!-- 内容区域 -->
      <view class="flex flex-grow flex-col items-center justify-center">
        <!-- 登录按钮 -->
        <u-button
          shape="circle"
          size="large"
          :custom-style="{
            background: '#6a56e5',
            color: '#fff',
          }"
          icon-color="#ffffff"
          icon="weixin-fill"
          text="微信一键登录"
          @click="handleWechatLogin"
        />

        <!-- 协议勾选 -->
        <view class="w-full flex items-center justify-center px-4 pt-32rpx">
          <up-checkbox
            v-model:checked="agreedToTerms"
            label="登录即表示您同意"
            label-size="24rpx"
            label-color="#9ca3af"
            active-color="#6a56e5"
            name="agree"
            used-alone
            @change="onAgreementChange"
          />
          <text class="text-left text-xs text-gray-400 font-normal leading-normal">
            <text
              url="/pages/agreement/user-agreement"
              hover-class="none"
              class="text-gray-600 underline"
            >
              《用户协议》
            </text>
            和
            <text
              url="/pages/agreement/privacy-policy"
              hover-class="none"
              class="text-gray-600 underline"
            >
              《隐私政策》
            </text>
          </text>
        </view>
      </view>

      <!-- 底部预留空间 -->
      <view class="flex-shrink-0 pb-64rpx" />
    </view>
  </view>
</template>

<script setup>
import { HOME_PATH, isTabBarPath, LOGIN_PATH, removeQueryString } from '@/router';
import { useUserStore } from '@/store';

const userStore = useUserStore();

const agreedToTerms = ref(false);
const loginCode = ref('');
let redirect = HOME_PATH;

const userInfo = computed(() => store.getters.userInfo);
console.log(userInfo);

const handleWechatLogin = () => {
  if (!agreedToTerms.value) {
    uni.showToast({
      title: '请先阅读并同意用户协议和隐私政策',
      icon: 'none',
    });
    return;
  }
  uni.showLoading({ title: '登录中...' });
  wx.getUserProfile({
    desc: '获取用户信息',
    success: async (profileRes) => {
      const postData = {
        code: loginCode.value,
        encryptedData: profileRes.encryptedData,
        iv: profileRes.iv,
        rawData: profileRes.rawData,
        signature: profileRes.signature,
        userInfo: profileRes.userInfo,
      };
      const loginRes = await userStore.login(postData).catch(() => {
        uni.$u.toast('登录失败');
      });
      if (loginRes.code === 200) {
        uni.showToast({
          title: '登录成功',
          icon: 'none',
        });

        // 用户信息
        // userStore.info();
        setTimeout(() => {
          uni.$u.route({
            type: isTabBarPath(redirect) ? 'switchTab' : 'redirectTo',
            url: redirect,
          });
        }, 800);
      }
      else {
        uni.showToast({
          title: '登录失败',
          icon: 'none',
        });
      };
    },
  });
};
onLoad((options) => {
  if (options.redirect && removeQueryString(options.redirect) !== LOGIN_PATH) {
    redirect = decodeURIComponent(options.redirect);
  }
  uni.login({
    success: (res) => {
      console.log(res);
      loginCode.value = res.code;
    },
  });
});

const onAgreementChange = (n) => {
  agreedToTerms.value = n;
};
</script>
