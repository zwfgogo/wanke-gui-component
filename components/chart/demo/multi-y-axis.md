---
order: 2
title:
  zh-CN: 折线图
  en-US: LineChart
---

## zh-CN

多y轴折线图。

```jsx
import {MultiLineChart} from 'wanke-gui/lib/chart'
import moment from 'moment'
 import { useEffect, useState } from 'react'
let ddd = {"series":[{"name":"实际发电量","unit":"kWh"},{"name":"理论发电量","unit":"kWh"},{"name":"收益情况","unit":"元"}],
"xData":["2020-06-28 00:00:00","2020-06-28 00:45:00","2020-06-28 01:00:00","2020-06-28 01:15:00","2020-06-28 01:45:00","2020-06-28 01:59:59","2020-06-28 02:00:00","2020-06-28 02:45:00","2020-06-28 03:00:00","2020-06-28 03:15:00","2020-06-28 03:45:00","2020-06-28 04:00:00","2020-06-28 04:15:00","2020-06-28 04:45:00","2020-06-28 05:15:00","2020-06-28 05:45:00","2020-06-28 06:00:00","2020-06-28 06:15:00","2020-06-28 06:45:00","2020-06-28 08:00:00","2020-06-28 08:15:00","2020-06-28 08:45:00","2020-06-28 09:00:00","2020-06-28 09:15:00","2020-06-28 09:45:00","2020-06-28 10:00:00","2020-06-28 10:45:00","2020-06-28 11:00:00","2020-06-28 11:30:00","2020-06-28 11:45:00","2020-06-28 12:00:00","2020-06-28 12:15:00","2020-06-28 12:45:00","2020-06-28 13:00:00","2020-06-28 13:15:00"],
"yData":[[46.8,46.8,46.8,46.8,46.8,117,46.8,23.4,46.8,46.8,46.8,46.8,46.8,46.8,46.8,46.8,46.8,46.8,23.4,46.8,46.8,23.4,140.4,46.8,23.4,0,0,0,0,0,0,0,0,0,0],
[undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined],
[51.48,51.48,51.48,51.48,51.48,undefined,51.48,25.74,51.48,51.48,51.48,51.48,51.48,51.48,51.48,51.48,51.48,51.48,25.74,51.48,51.48,25.74,25.74,51.48,25.74,0,0,0,0,0,0,0,0,0,0]]}

function Demo() {
    let [data, setData] = useState({xData: [], yData:[], series: []})

    useEffect(()=> {
      setTimeout(()=> {
        setData(ddd)
      }, 200)
    }, [])

    return (
        <div style={{height: 200}}>
            <MultiLineChart
                xData={data.xData}
                yData={data.yData}
                series={data.series}
                options={
                  {
tickValues: [
  moment('2020-06-28 00:00:00'),
  moment('2020-06-28 01:00:00'),
  moment('2020-06-28 02:00:00'),
  moment('2020-06-28 03:00:00'),
  moment('2020-06-28 04:00:00'),
  moment('2020-06-28 05:00:00'),
  moment('2020-06-28 06:00:00'),
  moment('2020-06-28 07:00:00'),
  moment('2020-06-28 08:00:00'),
  moment('2020-06-28 09:00:00'),
  moment('2020-06-28 10:00:00'),
  moment('2020-06-28 11:00:00'),
  moment('2020-06-28 12:00:00'),
  moment('2020-06-28 13:00:00'),
  moment('2020-06-28 14:00:00'),
  moment('2020-06-28 15:00:00'),
],
                    dateFormat: (d) => { return moment(d).format('YYYY-MM-DD HH:mm:ss') },tooltipDateFormat:'YYYY-MM-DD HH:mm:ss',

                  }
                }
            />
        </div>
    )
}

ReactDOM.render(<Demo />, mountNode);
```
