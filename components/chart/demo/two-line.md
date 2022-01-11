---
order: 1
title:
  zh-CN: 折线图
  en-US: LineChart
---

## zh-CN

多条折线。

```jsx
import {LineChart} from 'wanke-gui/lib/chart'
function Demo() {
    return (
        <div style={{height: 200}}>
            <LineChart
xData={['2020-05-13 00:00:00', '2020-05-13 12:00:00', '2020-05-13 20:00:00']}
yData={[[50, 65, 60], [20, 30, 40]]}
series={[{name: '体重', unit: 'kg'}, {name: '年龄', unit: '岁'}]}
            />
        </div>
    )
}

ReactDOM.render(<Demo />, mountNode);
```
