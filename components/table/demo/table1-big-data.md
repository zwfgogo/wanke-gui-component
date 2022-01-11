---
order: 2
title:
  zh-CN: 大数据
  en-US: Table1-basic
---

## zh-CN

10万条数据

```jsx
import { Table1 } from 'wanke-gui'

let columns = [
    {dataIndex: 'num', title: '序号', width: 60},
    {dataIndex: 'name', title: '名称', width: 200}
]
let list = []
for (let i = 0; i < 100000; i++) {
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
                virtual={true}
            />
        </div>
    )
}

ReactDOM.render(<Demo />, mountNode)
```
