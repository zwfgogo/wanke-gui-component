---
category: Components
subtitle: 按钮
type: 通用
title: Button
cols: 1
---

## 产生

目前是对antd的Button组件进行二次封装，支持之前组件的所有api参数(建议可以和全局样式--global-style-hoc一起使用)

## API（注：antd原生api入参可以参考：[antd参考文档](https://ant.design/components/button-cn/#API)）

目前Button组件的type值替换了antd组件的type和danger属性：

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| antd原生参数(原生type废弃) | [antd参考文档](https://ant.design/components/button-cn/#API) | --- | --- | --- |
| type | 按钮类型 | 'default' \| 'primary' \| 'text' \| 'danger' | 'default' | --- |
