---
order: 5
title:
  zh-CN: 自定义颜色
  en-US: custom color
---

## zh-CN

负值的柱状图。

```jsx
import {LineChart} from 'wanke-gui/lib/chart'
import {BarChart} from 'wanke-gui/lib/chart'
import {MultiLineChart} from 'wanke-gui/lib/chart'
const colorArray = [
  '#2f4554', '#da00ff'
]

let xData = []
let yData = [[], []]
let timestamp = +new Date('2020/05/18 00:00:00')
for (let i = 0; i < 1000; i++) {
 xData.push(timestamp + 15 * i * 1000)
 yData[0].push(2)
 yData[1].push(2)
}

function Demo() {
  const getColor = (count, index) => {
    return colorArray[index]
  }

  return (
    <>
      <div style={{height: 200}}>
          <BarChart
              xData={['2020-05-13 00:00:00', '2020-05-13 10:00:00', '2020-05-13 20:00:00']}
              yData={[[50, 65, 60]]}
              series={[{name: '体重', unit: 'kg'}]}
              options={{
                getColor
              }}
          />
      </div>
      <div style={{height: 200}}>
          <MultiLineChart
              xData={xData}
              yData={yData}
              series={[{name: '体重', unit: 'kg'}, {name: '年龄', unit: '岁'}]}
              options={{
                getColor,
                showSeries: true,
                // backOpacity: [0, 0],
              }}
          />
      </div>
        <div style={{height: 200}}>
            <LineChart
              xData={['2020-05-13 00:00:00', '2020-05-13 12:00:00', '2020-05-13 20:00:00']}
              yData={[[50, 65, 60], [20, 30, 40]]}
              series={[{name: '体重', unit: 'kg'}, {name: '年龄', unit: '岁'}]}
              options={{
                getColor,
                showSeries: true
              }}
            />
        </div>
    </>
  )
}

ReactDOM.render(<Demo />, mountNode);
```
