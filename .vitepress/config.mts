import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Orange",
  description: "Orange Site",
  themeConfig: {
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
          {text: '快速开始', link: '/zh-cn/backend/intro/getting-started'},
        ]
      },
      {
        text: '前端指南',
        items: [
          {text: '快速开始', link: '/zh-cn/frontend/intro/getting-started'},
        ]
      }
    ],

    socialLinks: [
      {icon: 'github', link: 'https://github.com/lishangbu/orange-doc'}
    ]
  }
})
