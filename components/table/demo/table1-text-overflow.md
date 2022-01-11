---
order: 1
title:
  zh-CN: 省略号
---


## zh-CN

文本太长时，出现省略号

```jsx
import { Table1 } from 'wanke-gui'

let columns = [
    {dataIndex: 'num', title: '序号', width: 60},
    {dataIndex: 'name', title: '名称', width: 200, ellipsis: true}
]
let list = []
for (let i = 0; i < 20; i++) {
    list.push({id: i, num: i + 1, name: '名称名称名称名称名称名称名称名称名称名称名称名称名称名称名称名称名称名称名称名称名称名称' + (i + 1)})
}

function Demo() {
    return (
        <div style={{height: 200}}>
            <Table1
                key="id"
                x={300}
                dataSource={list}
                columns={columns}
            />
        </div>
    )
}

ReactDOM.render(<Demo />, mountNode)
```
