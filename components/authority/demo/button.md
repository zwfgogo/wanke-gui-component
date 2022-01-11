---
order: 0
title:
  zh-CN: 组件式调用
  en-US: get container size
---

## zh-CN

不同的角色有不同的按钮显示

```jsx
import { useState } from 'react';
import { Button, Authority } from 'wanke-gui';
function App() {
  const [codes, setCodes] = useState(['01', '02']);
  return (
    <div>
      <div>
        <a
          onClick={() => {
            setCodes(['01', '02']);
          }}
        >
          我是管理员
        </a>
        <br />
        <a
          onClick={() => {
            setCodes(['01']);
          }}
          className="e-ml20"
        >
          我只能新增
        </a>
        <br />
        <a
          onClick={() => {
            setCodes([]);
          }}
          className="e-ml20"
        >
          我是游客
        </a>
      </div>
      <Authority code="01" codes={codes}>
        <Button>新增</Button>
      </Authority>
      <Authority code="02" codes={codes}>
        <Button style={{ marginLeft: '20px' }}>删除</Button>
      </Authority>
    </div>
  );
}
ReactDOM.render(<App />, mountNode);
```
