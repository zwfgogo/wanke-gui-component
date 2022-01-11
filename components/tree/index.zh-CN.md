---
category: Components
subtitle: 树形控件
type: 通用
title: Tree
cols: 1
---



## 何时使用

对antd的tree进行2次封装(本组件建议使用数据来渲染tree组件，不在推荐用treeNode来渲染)

## API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| antd原生参数 | [antd参考文档](https://ant.design/components/tree-cn/#API) | --- | --- | --- |
| filterable | 是否开启过滤功能 | boolean | false | --- |
| filterFunc | 过滤规则方法 | (treeNode: treeData, filterValue: string) => boolean | (treeNode: treeData, filterValue: string) => innerText(treeNode.title).indexOf(filterValue) >= 0 | --- |
| treeData | 树形控件的数据 | treeData[] | --- | --- |
| isAsync | 是否异步搜素（后台请求）(异步搜素是在搜索框点击搜素或者回车时触发，前端过滤为onChange时触发) | boolean | false | --- |
| asyncFunc | 异步搜素执行的回调（isAsync=true时生效） | (value: string): void | --- | --- |
| icon | 自定义图标 | (nodeProps: treeData) => React.ReactNode \| React.ReactNode | --- | --- |
| disabled | 是否禁用 | (nodeProps: treeData) => boolean \| boolean | --- | --- |
| selectable | 是否可选择 | (nodeProps: treeData) => boolean \| boolean | --- | --- |
| scrollX | 是否出现横向滚动条 | boolean | false | --- |

## treeData

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| key | 唯一键值 | number \| string | --- | --- |
| title | 显示的标题 | React.ReactNode| --- | --- |
| children | 树形控件的子节点 | treeData[] | --- | --- |
| disabled | 是否禁用 | boolean | false | --- |
| selectable | 是否可选择 | boolean | false | --- |
| icon | 自定义图标 | React.ReactNode | --- | --- |
