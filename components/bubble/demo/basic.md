---
order: 0
title:
  zh-CN: 文本溢出出现title
  en-US: get container size
---

## zh-CN

动态设置容器或者文本的长度，实现溢出时候才增加气泡。

## en-US

Classic mode. File selection dialog pops up when upload button is clicked.

```jsx
import { useState } from 'react';
import { Bubble, Button, Popover } from 'wanke-gui';

const Content = props => {
  const { str } = props;
  let strarr = str.split('、');
  return (
    <ul>
      {strarr.map((item, key) => {
        return <li key={key}>{item}</li>;
      })}
    </ul>
  );
};

function App() {
  const [text, setText] = useState('你好你好呢你好你好呢你好你好呢你好你好呢你好你好呢你好你好呢');
  const [str, setStr] = useState('南自、上海');
  const [width, setWidth] = useState(100);

  return (
    <div>
      <div
        style={{
          width: width + 'px',
          height: '100px',
          border: '1px solid #ccc',
          padding: '10px',
          marginBottom: '10px',
        }}
      >
        <Bubble placement="bottom" width={width}>
          {text}
        </Bubble>
      </div>
      <Button
        onClick={() => {
          setText('你好你好呢');
        }}
      >
        短文本
      </Button>
      <Button
        className="e-ml10"
        onClick={() => {
          setText('你好你好呢你好你好呢你好你好呢你好你好呢你好你好呢你好你好呢');
        }}
      >
        长文本
      </Button>
      <Button
        className="e-ml10"
        onClick={() => {
          setWidth(600);
        }}
      >
        宽度设置为600
      </Button>
      <Button
        className="e-ml10"
        onClick={() => {
          setWidth(200);
        }}
      >
        宽度设置为200
      </Button>
    </div>
  );
}

ReactDOM.render(<App />, mountNode);
```

<style>
.e-ml10 {
  margin-left: 10px;
}
</style>
