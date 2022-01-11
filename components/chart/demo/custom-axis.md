---
order: 10
title:
  zh-CN: 自定义时间轴
  en-US: LineChart
---

## zh-CN

基本使用。

```jsx
import {LineChart} from 'wanke-gui/lib/chart'
import moment from 'moment'

function Demo() {
    return (
        <div style={{height: 200}}>
            <LineChart
xData={['2020-04-13 00:00:00', '2020-05-14 12:00:00', '2020-06-15 20:00:00']}
yData={[[50, 65, 60]]}
series={[{name: '体重', unit: 'kg'}]}
options={
{
    tickValues: [
        moment('2020-03-01 00:00:00'),
        moment('2020-04-01 00:00:00'),
        moment('2020-05-01 00:00:00'),
        moment('2020-06-01 00:00:00'),
        moment('2020-07-01 00:00:00'),
    ],
    dateFormat: (d)=> moment(d).format('YYYY-MM'),
    startDate: moment('2020-03-01 00:00:00'),
    endDate: moment('2020-07-01 00:00:00'),
}
}
            />
        </div>
    )
}

ReactDOM.render(<Demo />, mountNode);
```
