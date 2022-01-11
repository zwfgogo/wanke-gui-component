---
order: 0
title:
  zh-CN: 自定义tip
  en-US: loading
---


## zh-CN

自定义tip


```jsx
import {FullLoading} from 'wanke-gui'
function Demo() {
    return (
        <div style={{height: 200, position: 'relative'}}>
            <FullLoading tip="刷新数据中"/>
        </div>
    )
}

ReactDOM.render(<Demo />, mountNode)
```
