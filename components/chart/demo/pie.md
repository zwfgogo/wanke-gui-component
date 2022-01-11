---
order: 8
title:
  zh-CN: 饼图
  en-US: PieChart
---

## zh-CN

饼图

```jsx
import { PieChart } from 'wanke-gui/lib/chart';

function Demo() {
    return (
        <div style={{height: 200}}>
            <PieChart
              options={{
                radius: [0.45, 0.75],
                // title: '统计\n图',
                title: {
                    name: '统计图',
                    position: 'middle',
                    fontSize: 14,
                    color: '#f00',
                    onClick: () => { console.log('标题点击') }
                },
                // legend: true,
                legend:{
                    position: 'right',
                    shape: 'circle',
                    text: item => `${item.name}  ${item.value}条`,
                    onClick: (data) => { console.log(data) }
                },
                tooltip: true,
                // tooltip: {
                //     render: (item, sum) => <div className="wanke-tooltip-children"><i style={{ backgroundColor: item.color }} />{item.name}-->{item.value}({sum ? (item.value / sum * 100).toFixed(2) : 0}%)</div>
                // },
                transform: (width, height) => `200,${height/2}`
              }}
              data={[
                  { name: '张三', value: 0 },
                  { name: '李四', value: 0 },
                  { name: '王五', value: 0 },
                //   { name: '赵六', value: 80 },
                //   { name: '孙七', value: 100 },
                //   { name: '刘八', value: 100 },
                //   { name: '钱九', value: 50 },
                //   { name: '周十', value: 70 },
                //   { name: '吴十一', value: 20 },
                //   { name: '郑十二', value: 110 },
                //   { name: '胡十三', value: 90 },
                //   { name: '黄十四', value: 40 },
              ]}
            />
        </div>
    )
}

ReactDOM.render(<Demo />, mountNode);
```
