---
category: 功能实现解析
order: 8
title: 面包屑
---

## 面包屑

由 global 中的 crumbs 字段维护。

在点击面包屑的时候，由面包屑组件 Crumbs 中 linkCallback 方法处理 crumbs 字段以及模块跳转。

在其他场景点击跳转的时候，通过派发在 home/layout/effects 中的 updateCrumbs 方法，完成 crumbs 的数据处理，来实现面包屑的更新。

## 页面下钻

通过 forward 方法实现

## 页面返回

通过 back 方法实现
