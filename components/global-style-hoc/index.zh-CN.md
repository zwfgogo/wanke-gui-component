---
category: Components
subtitle: 全局样式可配高阶组件
type: 通用
title: globalStyleHoc
cols: 1
---

全局样式可配置。

## 何时使用

- 建议使用在全局的布局上，一般一个项目中只需要引入一次

## API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| onChangeStyle | 修改样式的方法（高阶组件的props里获取） | (styleObj?: Partial<styleType\>, otherCss?: string) => void | ----- | --- |

styleType:

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| styleType | 样式对象字典（其中key值以'@'开头为定义的变量， 可以在样式中使用'{@xxx}', 以'$'开头为‘.ant’开头的类名） |  (key?: string): Partial<CSSProperties\> } | ----- | --- |

例子：

```js
    const style_map = {
        '@primary-color': '#3d7eff', // 定义变量
        '$btn': { // ant样式
            borderRadius: '4px',
            height: '32px',
            color: '#000',
            border: '1px solid {@primary-color}', // ==> border: '1px solid #3d7eff'
        },
        '.btn': { // 自定义样式（针对后续的深浅风格的主题切换需要）

        }
    }

```
