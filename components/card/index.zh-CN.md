---
category: Components
subtitle: 卡片控件
type: 通用
title: Card
cols: 1
---



## 何时使用

对antd的card进行2次封装

## API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| antd原生参数 | [antd参考文档](https://ant.design/components/card-cn/#API) | --- | --- | --- |
| extraType | 渲染类型(下拉\|单选按钮) | 'select' \| 'radioButtom' | 'select' | --- |
| extraList | 选择数据源 | { value: string, label: React.ReactNode }[] | ---- | --- |
| extraDefualtValue | 默认选中的值 | string | 数据源中第一个value | --- |
| onExtraChange |  右上角onchange事件 | (value:string) => void | ---- | --- |
