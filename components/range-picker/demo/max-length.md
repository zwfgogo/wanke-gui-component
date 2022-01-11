---
order: 0
title:
  zh-CN: 开始和结束时间不能超过10天
---


## zh-CN

基本用法

```jsx
import { RangePicker } from 'wanke-gui'
function Demo() {
    let [value, setValue] = React.useState([])
    return (
        <div style={{height: 200, position: 'relative'}}>
            <RangePicker maxLength={10} value={value} onChange={setValue}/>
        </div>
    )
}

ReactDOM.render(<Demo />, mountNode)
```
