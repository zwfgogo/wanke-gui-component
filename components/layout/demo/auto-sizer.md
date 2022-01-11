---
order: 0
title:
  zh-CN: 计算容器宽高
---


## zh-CN

基本用法，可用于Tree组件需要虚拟滚动时，Table组件的滚动计算

```jsx
import { AutoSizer } from 'wanke-gui'
function Demo() {
    return (
        <div style={{height: 200, position: 'relative', border: '1px solid #ddd'}}>
            <AutoSizer>
                {
                    ({width, height})=> {
                        return (
                            <div>
                                <div>容器高度： {height}</div>
                                <div>容器宽度： {width}</div>
                            </div>
                        )
                    } 
                }
            </AutoSizer>
        </div>
    )
}

ReactDOM.render(<Demo />, mountNode)
```
