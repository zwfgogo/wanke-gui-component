---
order: 0
title:
  zh-CN: 页面返回
---


## zh-CN

返回按钮和导出按钮

```jsx
import { Tools } from 'wanke-gui'
function Demo() {
    return (
        <div style={{height: 200, position: 'relative'}}>
            <Tools>
               <Tools.Back onClick={()=>null}></Tools.Back>
               <Tools.Export onClick={()=>null}></Tools.Export>
            </Tools>
        </div>
    )
}

ReactDOM.render(<Demo />, mountNode)
```
