---
order: 3
title:
  zh-CN: 柱状图
  en-US: BarChart
---

## zh-CN

柱状图。

```jsx
import {BarChart, LineChart} from 'wanke-gui/lib/chart'
import moment from 'moment'

let data = {
xData:["2020-08-13 00:00:00","2020-08-14 00:00:00","2020-08-15 00:00:00","2020-08-16 00:00:00"],
yData:[["825","833","820","839"],[635,627,648,655]],
}

function Demo() {
    return (
        <div style={{height: 200}}>
            <BarChart
                xData={data.xData}
                yData={data.yData}
                series={[{name: '体重', unit: 'kg'}, {name: '体重2', unit: 'kg'}]}
options={{

dateFormat: (d) => { return moment(d).format('MM-DD') },
tooltipDateFormat: 'MM-DD',
tickWidth: 80,

}}
            />
        </div>
    )
}

ReactDOM.render(<Demo />, mountNode);
```
