---
category: Components
subtitle: 级联选择
type: 通用
title: Cascader
cols: 1
---



## 何时使用

级联选择组件与ant-design的区别较大

## API

部分参数可以参考[an-design的select组件](https://ant.design/components/select-cn/#API)

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| value | 指定选中项 | string[] \| number[] | --- | --- |
| defaultValue | 指定选中项 | string[] \| number[] | --- | --- |
| options | 可选项数据源 | [option[]](#option) | --- | --- |
| selectStyle | select样式 | CSSProperties | --- | --- |
| style | select外层控件的style | CSSProperties | --- | --- |
| level | 当前需要展示的下拉框的个数，默认为1(初始化显示一个下拉数据，当选择完后根据具体情况来逐一添加) | number | 1 | --- |
| onChange | 选择完成后的回调 | (value: (string[] | number[])) => void | --- | --- |
| allowClear | 是否支持清除 | boolean | false | --- |
| disabled | 禁用 | boolean | false | --- |
| placeholder | 选择框默认文字 | string[] | \['请选择'\] | --- |
| prefix | 每一级的前缀 | React.ReactNode[] | \[\] | --- |
| suffix | 每一级的后缀 | React.ReactNode[] | \[\] | --- |
| loading | loading状态，异步加载中使用 | boolean | false | --- |
| loadIcon | 自定义loading图标 | React.ReactNode | <LoadingOutlined /\> | --- |
| showfilter | 是否过滤 | boolean | false | --- |

## option

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| label | 文本 | React.ReactNode | --- | --- |
| value | 绑定的唯一值 | string \| number | --- | --- |
| disabled | 是否禁用 | boolean | --- | --- |
| children | 子节点 | option[] | --- | --- |
