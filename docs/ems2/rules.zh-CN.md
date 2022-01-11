---
category: 代码规范
order: 5
title: 代码组织
---

## 文件目录规则

文件夹首先以独立的业务模块为区分, 每个模块包含三个文件夹和一个入口文件, components 下面是组件.

## 样式规范

- 样式和业务关联程度越低越好；
- 样式嵌套层级越深，会影响浏览器的渲染性能；
- 皮肤和结构分离，便于后期多皮肤

## 文件夹目录

<img src='/images/AAC5911A-816A-4713-BE19-B1F0A9CBC18B.png' width=360/>

- pages 里的每个文件夹 表示工作台下每个菜单的路由
- 用驼峰的方式表示一级和二级菜单。比如权限管理下的四个菜单,用户权限对应 rightsUser，角色权限对应 rightsRole，电站类型管理对应 rightsMenu,设备类型管理对应 rightsEquipment，
- 每个路由由四部分组成，入口： index.tsx，组件文件夹： components，请求文件夹 ：services，redux 派发：effects。
- 如果路由内部包含页面下钻的话，在 layout 里面会使用 Flow 组件，通过 Forward 和 Back 组件实现页面的下钻和回退。在 components 文件夹中每个文件夹对应一个页面。比如设备类型管理里面,设备类型管理列表 数据项配置 数据参数库 批量添加数据项分别对应独立的文件夹 rightsEquipmentList、dataItemView、ParameterLibrary、BatchAddition。
- 如果是路由之间的跳转，使用 nuomi 的 Link 组件就可以

## 代码规范工具

借鉴 antd 的代码管理，我们 [采用 husky 和 prettier 保证团队代码格式一致性](https://aisensiy.github.io/2018/02/28/husky-and-prettier/)。
