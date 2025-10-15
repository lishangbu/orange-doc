# 前端快速开始

在开始之前，我们假定您已经：

- 熟悉现代化的前端开发流程，包括熟悉 Node.js 以及 npm 包管理工具，前端构建工具，比如 Vite 7.x
- 熟悉前端框架，比如 Vue 3.x
- 熟悉 TypeScript 5.x
- 熟悉 CSS 预处理器，比如 Tailwind CSS 4.x

## 准备

- 一个node 22+的环境,推荐[node](https://nodejs.org/zh-cn)下载最新的LTS即可
- 一款你熟悉的IDE或者编辑器，比如Webstorm或者Vs Code皆可

## 下载项目

```bash
git clone  https://github.com/lishangbu/orange-ui
```

## 安装依赖

项目可以使用pnpm、npm、yarn进行依赖管理,以npm为例:

通过以下命令安装依赖即可:

```bash
npm i
```

**注意**

项目严格要求了node版本，不符合版本的话会安装失败，请务必保证node 22的版本大于22.19.0或者使用node24及以上版本。

依赖安装完成然后在项目根目录执行以下命令即可:

```bash
npm run dev
```

就可以启动开发服务器了。

项目默认代理了后端的接口地址为`http://localhost:8080`，如果你的后端地址不是这个，请修改`vite.config.ts`中的`/api`代理地址。
默认配置下，此时已经可以与后端联动体验项目了。
