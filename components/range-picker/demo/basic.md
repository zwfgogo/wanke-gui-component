---
order: 0
title:
  zh-CN: 时间范围选择
---


## zh-CN

基本用法

```jsx
import { RangePicker, ConfigProvider } from 'wanke-gui'

function Demo() {
    let [value, setValue] = React.useState([])
    return (
        <div style={{height: 200, position: 'relative'}}>
            <RangePicker value={value} onChange={setValue}/>
        </div>
    )
}

ReactDOM.render(<Demo />, mountNode)
```
