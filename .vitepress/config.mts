import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/orange-site/docs/',
  title: "Orange",
  description: "Orange Site",
  themeConfig: {
    search: {
      provider: 'local'
    },
    // https://vitepress.dev/reference/default-theme-config
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025-present Shangbu Li'
    },
    nav: [
      {text: '首页', link: '/'},
      {
        text: '获取源码', items: [
          {text: '前端源码', link: 'https://github.com/lishangbu/orange-ui'},
          {text: '服务端源码', link: 'https://github.com/lishangbu/orange'},
          {text: '文档源码', link: 'https://github.com/lishangbu/orange-doc'}
        ]
      },
    ],

    sidebar: [
      {
        text: '后端指南',
        items: [
          {text: '环境搭建', link: '/zh-cn/backend/intro/environment-setup'},
          {text: '快速开始', link: '/zh-cn/backend/intro/getting-started'},
          {text: '开发规约', link: '/zh-cn/backend/intro/development-guidelines'},
        ]
      },
      {
        text: '前端指南',
        items: [
          {text: '快速开始', link: '/zh-cn/frontend/intro/getting-started'},
          {text: 'BasicForm 组件使用', link: '/zh-cn/frontend/features/components/basic-form'},
        ]
      }
    ],

    socialLinks: [
      {icon: 'github', link: 'https://github.com/lishangbu/orange-doc'}
    ]
  }
})
