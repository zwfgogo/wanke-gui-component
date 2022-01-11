---
category: Components
subtitle: 图表
type: 通用
title: Chart
cols: 1
---



## 何时使用
需要可视化展示数据时，支持折线图，柱状图，饼图。

## API

| 成员 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| loading | loading效果 | boolean | - |
| xData | x轴数据 | [] | - |
| yData | y轴数据 | [[]] | - |
| series | 对应的y轴单位 | [{name: string, unit: string}] |
| options | 自定义配置 | object | object |

options 属性

| 成员 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| tickValues | 自定义x轴时间点 | number | - |
| tooltipDateFormat | 自定义时间tooltip格式 | number | - |
| dateFormat |  | x轴时间格式 | (date) => string |
| getColor | 自定义每条曲线的颜色 | function |
| startDate | 自定义x轴开始时间 | timestamp |
| endDate | 自定义x轴结束时间 | timestamp |

## 饼图API

| 参数 | 说明 | 类型 | 默认值 | 是否必填 |
| --- | --- | --- | --- | --- |
| data | 数据源 | [dataType](#数据源dataType)[] | --- | 是 |
| options | 配置项 | [PieOptions](#配置项PieOptions) | --- | 是 |
| onMouseEnter | 图形的鼠标移入 | (data: dataType) => void | --- | 否 |
| onMouseLeave | 图形的鼠标移出 | (data: dataType) => void | --- | 否 |
| onClick | 图形的单击事件 | (data: dataType) => void | --- | 否 |

## 数据源dataType

| 参数 | 说明 | 类型 | 默认值 | 是否必填 |
| --- | --- | --- | --- | --- |
| name | 名字 | string | --- | 是 |
| value | 数据 | number | --- | 是 |
| color | 颜色（如果设置全局颜色可以不用传） | string | --- | 否 |
| [propName: string] | 额外参数 | any | --- | 否 |

## 配置项PieOptions

| 参数 | 说明 | 类型 | 默认值 | 是否必填 |
| --- | --- | --- | --- | --- |
| viewBox | svg视野范围 | string | \`0 0 ${svg.width} ${svg.height}\` | 否 |
| globalColor | 全局设置图例颜色 | (data: dataType, index: number) => string | --- | 否 |
| radius | 环形的内圆和外圆的比例 | [number, number] | [0,0.8] | 否 |
| title | 标题设置 | null \| string \| [titleObj](#标题设置titleObj) | null | 否 |
| legend | 图例设置 | boolean \| [legendObj](## 图例设置legendObj) | false | 否 |
| tooltip | 提示窗口设置 | boolean \| [tooltipObj](#提示框tooltipObj) | false | 否 |

> 注：标题部分支撑用"\n"换行

## 标题设置titleObj

| 参数 | 说明 | 类型 | 默认值 | 是否必填 |
| --- | --- | --- | --- | --- |
| name | 标题 | string | --- | 是 |
| color | 标题颜色 | string | '#000' | 否 |
| fontSize | 文字大小 | number | 12 | 否 |
| fontFamily | 字体 | string | 'sans-serif' | 否 |
| textAnchor | 文本对齐方式 | 'start' \| 'middle' \| 'end' | 'middle' | 否 |
| position | 定位 | 'top' \| 'middle' \| 'bottom' | 'middle' | 否 |
| onClick | 标题点击 | () => void | --- | 否 |

## 图例设置legendObj

| 参数 | 说明 | 类型 | 默认值 | 是否必填 |
| --- | --- | --- | --- | --- |
| position | 定位 | 'left' \| 'right' \| 'top' \| 'bottom' | 'bottom' | 否 |
| shape | 图例形状 | 'circle' \| 'rect' \| (color: string) => ReactNode | --- | 否 |
| text | 文本内容 | ReactNode \| (item: dataType) => ReactNode | --- | 否 |
| boxStyle | 自定义样式 | CSSProperties | --- | 否 |
| onClick | 图例点击 | (data: dataType) => void | --- | 否 |

## 提示框tooltipObj

| 参数 | 说明 | 类型 | 默认值 | 是否必填 |
| --- | --- | --- | --- | --- |
| render | 文本内容 | (item: dataType, sum: number) => React.ReactNode | --- | 否 |
