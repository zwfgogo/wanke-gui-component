---
order: 0
title: 前言
---

下面的说明文档是对 2.0 代码的解析说明，用来辅助大家理解，不作为最佳实践，毕竟时间有限，项目里面还是有很多需要斟酌和优化的地方。

## 数据流解决方案

2.0 后台管理系统是使用 nuomi 框架，nuomi 提供数据流管理工具，实现路由功能。

## 项目初始化

项目入口 src/App.tsx

### 路由

路由是增强的 Nuomi 组件，也就是在 Nuomi 组件的基础上增加了路由监听的功能。

- Route 路由
- NuomiRoute 实现了类似子路由的功能，在 src/home/layout/components/Layout/index.tsx 组件内部注册了工作台所需要的路由。
- Redirect 如果访问的路由在已注册的路由中找不到，则进行路由重定向。

### Nuomi 组件的配置

nuomi.config 提供了 Nuomi 组件的基础属性。

- 1 提供了公共的 effects 方法。
- 2 路由切换的时候 都执行 changeCrumbs 方法。 onChange 表示的是路由切换，它支持对象的形式，方法自上而下执行。

### wanke 组件公共配置

wanke.config 提供了公共组件的基础的 props

### 语言 皮肤

通过读取 localStorage 中的皮肤或者语言，来按需加载 css 样式文件和语言配置文件
