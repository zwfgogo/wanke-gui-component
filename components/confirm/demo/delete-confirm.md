---
order: 0
title:
  zh-CN: 确认取消编辑操作
---


## zh-CN

基本用法

```jsx
import { DeleteConfirmPopover } from 'wanke-gui'
function Demo() {
    let [showConfirm, setShowConfirm] = React.useState(false)
    return (
        <div style={{height: 200, position: 'relative'}}>
            <DeleteConfirmPopover>
                <a>删除</a>
            </DeleteConfirmPopover>
        </div>
    )
}

ReactDOM.render(<Demo />, mountNode)
```
