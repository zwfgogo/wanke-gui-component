---
order: 0
title:
  zh-CN: 确认取消编辑操作
---


## zh-CN

基本用法

```jsx
import { Confirm, Button } from 'wanke-gui'
function Demo() {
    let [showConfirm, setShowConfirm] = React.useState(false)
    return (
        <div style={{height: 200, position: 'relative'}}>
            <Button onClick={()=> setShowConfirm(true)}>取消编辑</Button>
            {
                showConfirm && (
                    <Confirm
                        visible={showConfirm}
                        message={'是否取消编辑'}
                        onConfirm={()=> setShowConfirm(false)}
                        onCancel={()=> setShowConfirm(false)}
                    />
                )
            }
        </div>
    )
}

ReactDOM.render(<Demo />, mountNode)
```
