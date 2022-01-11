---
order: 1
title:
  zh-CN: 表格基本使用
  en-US: Table1-basic
---


## zh-CN

自动适应容器高度，处理滚动条

```jsx
import { Table1 } from 'wanke-gui'

let columns = [
    {dataIndex: 'num', title: '序号', width: 60, sorter: true },
    {dataIndex: 'name', title: '名称', width: 200, sorter: true }
]
let list = []
for (let i = 0; i < 20; i++) {
    list.push({id: i, num: i + 1, name: '名称' + (i + 1)})
}

function Demo() {
    return (
        <div style={{height: 200}}>
            <Table1
                key="id"
                x={300}
                dataSource={list}
                columns={columns}
                onChange={(pagination, filters, sorter, extra) => {console.log(pagination, filters, sorter, extra)}}
            />
        </div>
    )
}

ReactDOM.render(<Demo />, mountNode)
```
