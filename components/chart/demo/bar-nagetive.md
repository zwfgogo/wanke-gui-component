---
order: 4
title:
  zh-CN: 柱状图
  en-US: BarChart
---

## zh-CN

负值的柱状图。

```jsx
import {BarChart} from 'wanke-gui/lib/chart'
function Demo() {
    return (
        <div style={{height: 200}}>
            <BarChart
                xData={['2020-05-13 00:00:00', '2020-05-13 04:00:00', '2020-05-13 08:00:00', '2020-05-13 12:00:00']}
                yData={[[40, 50, -65, -60]]}
                series={[{name: '体重', unit: 'kg'}]}
            />
        </div>
    )
}

ReactDOM.render(<Demo />, mountNode);
```
