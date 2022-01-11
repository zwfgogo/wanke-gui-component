---
category: Components
subtitle: 流程图工具
type: 通用
title: mxGraph
cols: 1
---

Graph

## 何时使用

mxGraph 流程图工具，元件、连接线

## API


### mxGraph

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| extendParents | 是否调整父元件大小 | boolean | --- | --- |
| allowDanglingEdges | 连接线是否允许不连接到元件 | boolean | --- | --- |
| insertVertex | 插入元件 | function | --- | --- |
| insertEdge | 插入连接点 | function | --- | --- |
| getDefaultParent | 获取默认父元件 | function | --- | --- |
| translateCell | 移动指定元件 | function | --- | --- |
| resizeCell | 缩放元件 | function | --- | --- |
| getBoundingBoxFromGeometry | 获取指定元件组成的范围 | function | --- | --- |
| zoomIn | 放大画布 | function | --- | --- |
| zoomOut | 缩小画布 | function | --- | --- |

### mxRubberband
启动鼠标左键批量选择功能    


### mxModel

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| beginUpdate | 开始一次事物 | function | --- | --- |
| endUpdate | 结束一次事物 | function | --- | --- |
| add | 添加一个元件 | function | --- | --- |

### mxGraphView

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| validate | 重新渲染画布 | function | --- | --- |
| validateCellState | 重新计算元件的真实宽高 | function | --- | --- |
| getPerimeterPoint | 计算连接点的起始点 | function | --- | --- |
| updateEdgeState | 计算连接线的路径 | function | --- | --- |

### mxCellMarker

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| process | 处理鼠标事件，判断是否高亮元件 | function | --- | --- |
| intersects | 判断鼠标是否在元件的中心 | function | --- | --- |


### mxCell

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| value | 元件的label值 | string | --- | --- |
| style | 当前图形的样式 | object | --- | --- |
| vertex | 是否是元件 | boolean | --- | --- |
| edge | 是否是连接线 | boolean | --- | --- |
| children | 列表，当前图形的子图形 | [] | --- | --- |

