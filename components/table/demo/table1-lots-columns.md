---
order: 4
title:
  zh-CN: 列++
  en-US: 
---


## zh-CN

使用x属性处理很多列的情况，指定最小滚动宽度

```jsx
import { Table1 } from 'wanke-gui'

let columns = [
    {dataIndex: 'num', title: '序号', width: 60},
    {dataIndex: 'name1', title: '名称1', width: 200},
    {dataIndex: 'name2', title: '名称2', width: 200},
    {dataIndex: 'name3', title: '名称3', width: 200},
    {dataIndex: 'name4', title: '名称4', width: 200},
    {dataIndex: 'name5', title: '名称5', width: 200},
    {dataIndex: 'name6', title: '名称6', width: 200},
    {dataIndex: 'name7', title: '名称7', width: 200},
    {dataIndex: 'name8', title: '名称8', width: 200},
    {dataIndex: 'name9', title: '名称9', width: 200},
]
let list = []
for (let i = 0; i < 20; i++) {
  list.push({
    id: i, num: i + 1, 
    name1: '名称1_' + (i + 1),
    name2: '名称2_' + (i + 1),
    name3: '名称3_' + (i + 1),
    name4: '名称4_' + (i + 1),
    name5: '名称5_' + (i + 1),
    name6: '名称6_' + (i + 1),
    name7: '名称7_' + (i + 1),
    name8: '名称8_' + (i + 1),
    name9: '名称9_' + (i + 1),
  })
}

function Demo() {
    return (
        <div style={{height: 200}}>
            <Table1
                key="id"
                dataSource={list}
                columns={columns}
            />
        </div>
    )
}

ReactDOM.render(<Demo />, mountNode)
```
