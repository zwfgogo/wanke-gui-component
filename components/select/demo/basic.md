---
order: 0
title:
  zh-CN: 选择器
  en-US: Select
---

## zh-CN

基本使用。

```jsx
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Select } from 'wanke-gui';
import { Table } from 'antd';

function Demo() {
  const [dataSource, setDataSource] = useState([
    {
      name: '有效',
      value: 1,
      test: 'ooo',
    },
    {
      name: '无效',
      value: 2,
      test: 'iii',
    },
    {
      name: '无效',
      value: 3,
      test: 'iii',
    },
    {
      name: '有效',
      value: 4,
      test: 'ooo',
    },
    {
      name: '无效',
      value: 5,
      test: 'iii',
    },
    {
      name: '无效',
      value: 6,
      test: 'iii',
    },
    {
      name: '有效',
      value: 7,
      test: 'ooo',
    },
    {
      name: '无效',
      value: 8,
      test: 'iii',
    },
    {
      name: '无效',
      value: 9,
      test: 'iii',
    },
    {
      name: '有效',
      value: 10,
      test: 'ooo',
    },
    {
      name: '无效',
      value: 11,
      test: 'iii',
    },
    {
      name: '无效',
      value: 12,
      test: 'iii',
    },
  ]);
  function onChange(o, option) {
    console.log(o, option);
  }
  return (
    <React.Fragment>
      <Select
        defaultValue={dataSource[1].value}
        dataSource={dataSource}
        label={'有效性：'}
        className={'selectTest'}
        style={{ width: '140px' }}
        onSelect={onChange}
      />
      <Select defaultValue="1">
        <Select.Option key="1" value="1">
          111
        </Select.Option>
        <Select.Option key="2" value="2">
          2222
        </Select.Option>
      </Select>
    </React.Fragment>
  );
}
ReactDOM.render(<Demo />, mountNode);
```
