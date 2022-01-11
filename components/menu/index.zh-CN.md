---
category: Components
subtitle: 菜单
type: 通用
title: Menu
cols: 1
---



## 何时使用

对antd的menu进行2次封装(采用数据渲染)

## API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| antd原生参数 | [antd参考文档](https://ant.design/components/menu-cn/#API) | --- | --- | --- |
| data | 数据源 | dataType[] | --- | --- |
| globalIcon | 全局icon | React.ReactNode \| (menu: dataType, level: number) => React.ReactNode | --- | --- |

## dataType

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| key | 唯一键值 | number \| string | --- | --- |
| name | 显示文本 | React.ReactNode | --- | --- |
| title | 显示的title | React.ReactNode| --- | --- |
| children | 子节点 | treeData[] | --- | --- |
| disabled | 是否禁用 | boolean | false | --- |
| danger | 展示错误状态样式 | boolean | false | --- |
| icon | 自定义图标 | React.ReactNode | --- | --- |
