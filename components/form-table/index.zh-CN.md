---
category: Components
subtitle: 可编辑formTable控件
type: 通用
title: FormTable
cols: 1
---

## 何时使用

## API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| columns | 表头 | CloumnsProps | --- | --- |
| dataSource | 数据源 | any[] | --- | --- |
| isinitEdit | 是否初始化时全部为可编辑状态(在单元格为auto或者禁用状态下不生效) | boolean | ---- | --- |
| editCellKeys | 受控可编辑状态的单元格属性（key值的规律`${column.dataIndex}_${index}`） | string[] | --- | --- |
| onFinish |  提交表单且数据验证成功后回调事件 | (values: any) => void | ---- | --- |
| onValuesChange |  字段值更新时触发回调事件 | (changedValues: any, allValues: any) => void | ---- | --- |

### 注：其余字段可以参考antd表格api

## CloumnsProps（可以参考antd表头）多余的参数可以参考下面

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| renderType | 编辑状态时渲染类型(文本\|下拉\|数字框\|日期框) |'input'\|'select'\|'inputNumber'\|'datePicker'| 'input' | --- |
| rules | 表单验证规则(可参考antd表单验证) | any[] | --- | --- |
| valuePropName | 针对选择型组件的绑定数据的字段名 | string | ---- | --- |
| format | 针对时间类型的控件回显的数据格式化 | string | ---- | --- |
| dataSource | 针对下拉等选择型控件的数据源 | { value: string \| number; label: React.ReactNode }[] | --- | --- |
| disabledEdit |  是否禁用编辑 | boolean \| statusFunc | ---- | --- |
| allowAuto |  是否允许开启自动模式 | boolean \| statusFunc | ---- | --- |
| componentProps |  双向绑定组件的参数集合 | any | ---- | --- |

## statusFunc : (record: any) => boolean
