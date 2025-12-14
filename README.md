
使用uniapp+vite+vue3+typescript+uview-plus+unocss 搭建的适合团队协作的快速开发模版

[uview-plus官方文档](https://uiadmin.net/uview-plus/)

### 目录结构
项目中采用目前最新的技术方案来实现，目录结构清晰。
```
uniapp-vue3-project
├ build                 vite配置统一管理
│  ├ config
│  └ plugins
├ env                   环境变量
├ scripts               一些脚本
│  ├ post-upgrade.js     依赖库清理
│  └ verify-commit.js    git提交检验
├ src
│  ├ api                接口管理
│  ├ components         公共组件
│  ├ hooks              常用hooks封装
│  ├ locale             国际化语言管理
│  ├ pages              页面管理
│  ├ plugins            插件管理
│  ├ router             路由管理
│  ├ static             静态资源
│  ├ store              状态管理
│  ├ utils              一些工具
│  ├ App.vue
│  ├ main.ts
│  ├ manifest.json      项目配置
│  ├ pages.json         页面配置
│  └ uni.scss           全局scss变量
├ types                 全局typescript类型文件
│  ├ auto-imports.d.ts
│  ├ components.d.ts
│  ├ global.d.ts
│  └ module.d.ts
├ LICENSE
├ README.md
├ cz.config.js          cz-git配置
├ eslint.config.js      eslint配置
├ index.html
├ package.json
├ pnpm-lock.yaml
├ stylelint.config.js   stylelint配置
├ tsconfig.json
├ uno.config.ts         unocss配置
└ vite.config.ts        vite配置
```

#### vite插件管理
```
build
├ config            vite配置
│  ├ index.ts       入口文件
│  └ proxy.ts       跨域代理配置
└ plugins           vite插件
   ├ autoImport.ts  自动导入api
   ├ cleanImage.ts  自动清理图片文件
   ├ component.ts   自动导入组件
   ├ index.ts       入口文件
   ├ replaceUrl.ts  自动替换图片地址为CDN地址
   ├ unocss.ts      unocss配置
   └ visualizer.ts  包体积视图分析

```

#### 接口管理
```
api
├ common       通用api
│  ├ index.ts
│  └ types.ts
├ user         用户相关api
│  ├ index.ts
│  └ types.ts
└ index.ts     入口文件
```

#### hooks管理
```
hooks
├ use-clipboard  剪切板
│  └ index.ts
├ use-loading    loading
│  └ index.ts
├ use-modal      模态框
│  └ index.ts
├ use-permission 校验权限
│  └ index.ts
├ use-share      分享
│  └ index.ts
└ index.ts       入口文件
```

### 页面管理
```
pages
├ common           公共页面（分包common）
│  ├ login
│  │  └ index.vue
│  └ webview
│     └ index.vue
└ tab              主页面（主包）
   ├ home
   │  └ index.vue
   ├ list
   │  └ index.vue
   └ user
      └ index.vue
```

#### 状态管理
```
store
├ modules
│  ├ app          app状态
│  │  ├ index.ts
│  │  └ types.ts
│  └ user         用户状态
│     ├ index.ts
│     └ types.ts
└ index.ts        入口文件
```

### 工具方法
```
utils
├ auth                token相关方法
│  └ index.ts
├ common              通用方法
│  └ index.ts
├ modals              弹窗相关方法
│  └ index.ts
├ request             网络请求相关方法
│  ├ index.ts
│  ├ interceptors.ts
│  ├ status.ts
│  └ types.ts
└ index.ts            入口文件
```

### 使用方法

```bash
# 安装依赖
pnpm install

# 启动H5
pnpm dev:h5

# 启动微信小程序
pnpm dev:mp-weixin
```

### 发布

```bash
# 构建开发环境
pnpm build:h5
pnpm build:mp-weixin

# 构建测试环境
pnpm build:h5-test
pnpm build:mp-weixin-test

# 构建生产环境
pnpm build:h5-prod
pnpm build:mp-weixin-prod
```

### 代码提交
```bash
pnpm cz
```

### 更新uniapp版本

更新uniapp相关依赖到最新正式版
```bash
npx @dcloudio/uvm@latest
```
或者执行下面的命令
```bash
pnpm uvm
```

在升级完后，会自动添加很多无用依赖，执行下面的代码减小保体积
```
pnpm uvm-rm
```