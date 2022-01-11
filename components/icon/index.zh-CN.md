---
category: Components
subtitle: 图标
type: 通用
title: Icon
toc: false
---

请升级wanke-icon到1.1.1

## 图标列表

```__react
import IconDisplay from 'site/theme/template/IconDisplay';
ReactDOM.render(<IconDisplay />, mountNode);
```

## API

从 4.0 开始，antd 不再内置 Icon 组件，请使用独立的包 `wanke-icon`。

### 通用图标

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| className | 设置图标的样式名 | `string` | - |  |
| style | 设置图标的样式，例如 `fontSize` 和 `color` | CSSProperties | - |  |
| spin | 是否有旋转动画 | boolean | false |  |
| rotate | 图标旋转角度（IE9 无效） | number | - |  |
| twoToneColor | 仅适用双色图标。设置双色图标的主要颜色 | string (十六进制颜色) | - |  |

其中我们提供了三种主题的图标，不同主题的 Icon 组件名为图标名加主题做为后缀。

```jsx
import { StarOutlined, StarFilled, StarTwoTone } from 'wanke-icon';

<StarOutlined />
<StarFilled />
<StarTwoTone twoToneColor="#eb2f96" />
```

### 自定义 Icon/Custom Icon

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| style | 设置图标的样式，例如 `fontSize` 和 `color` | CSSProperties | - |  |
| spin | 是否有旋转动画 | boolean | false |  |
| rotate | 图标旋转角度（IE9 无效） | number | - |  |
| component | 控制如何渲染图标，通常是一个渲染根标签为 `<svg>` 的 `React` 组件 | ComponentType<CustomIconComponentProps\> | - |  |

### 双色图标主色

对于双色图标，可以通过使用 `getTwoToneColor()` 和 `setTwoToneColor(colorString)` 来全局设置图标主色。

```jsx
import { getTwoToneColor, setTwoToneColor } from '@ant-design/icons';

setTwoToneColor('#eb2f96');
getTwoToneColor(); // #eb2f96
```

`Icon` 中的 `component` 组件的接受的属性如下：

| 字段      | 说明                    | 类型             | 只读值         | 版本 |
| --------- | ----------------------- | ---------------- | -------------- | ---- |
| width     | `svg` 元素宽度          | string \| number | '1em'          |      |
| height    | `svg` 元素高度          | string \| number | '1em'          |      |
| fill      | `svg` 元素填充的颜色    | string           | 'currentColor' |      |
| className | 计算后的 `svg` 类名     | string           | -              |      |
| style     | 计算后的 `svg` 元素样式 | CSSProperties    | -              |      |
