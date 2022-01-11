---
order: 0
title:
  zh-CN: 折线图
  en-US: LineChart
---

## zh-CN

基本使用。

```jsx
import {useEffect} from 'react'
import moment from 'moment'
import {LineChart} from 'wanke-gui/lib/chart'

let data1 = {
    xData : ['2020-05-13 00:00:00', '2020-05-13 04:00:00', '2020-05-13 08:00:00', '2020-05-13 12:00:00', '2020-05-13 16:00:00'],
    yData: [
      [50, 65, null, 60, -10],
    ],
    series: [
      {name: '体重体重体重体重1', unit: 'kg'},
    ]
}

function Demo() {
    let [data, setData] = React.useState({})
    useEffect(() => {
      setTimeout(()=> {
        setData(data1)
      }, 600)

    }, [])

    return (
        <div style={{height: 200}}>
            <LineChart
                xData={data.xData}
                yData={data.yData}
                series={data.series}
            />
        </div>
    )
}

ReactDOM.render(<Demo />, mountNode);
```
