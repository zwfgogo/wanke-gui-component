---
order: 0
title:
  zh-CN: 提供垂直方向的布局容器
---


## zh-CN

容器内一部分元素高度固定，一部分自适应时使用

```jsx
import { FullContainer } from 'wanke-gui'
function Demo() {
    return (
        <div style={{height: 200, position: 'relative'}}>
            <FullContainer>
                <div style={{height: 50, border: '1px solid #ccc'}}>
                    50px
                </div>
                <div className="wanke-flex1" style={{background: '#ddd'}}>
                    填充剩余容器
                </div>
            </FullContainer>
        </div>
    )
}

ReactDOM.render(<Demo />, mountNode)
```
