---
order: 5
title:
  zh-CN: Table2-basic
  en-US: Table1-basic
---

## zh-CN

带分页的表格

```jsx
import { Table2 } from 'wanke-gui'
import { ConfigProvider } from 'antd'

let columns = [
    {dataIndex: 'num', title: '序号', width: 60, sorter: true},
    {dataIndex: 'name', title: '名称', width: 200, sorter: true}
]
let list = []
for (let i = 0; i < 20; i++) {
    list.push({id: i, num: i + 1, name: '名称' + (i + 1)})
}

function Demo() {
    return (
        <div style={{height: 200, overflow: 'hidden'}}>
        <ConfigProvider locale={{
            showTotal: '共{0}页'
        }}>
            <Table2
                key="id"
                dataSource={list}
                columns={columns}
                total={100}
                page={1}
                size={20}
                onPageChange={()=>null}
                onChange={(pagination, filters, sorter, extra) => {console.log(pagination, filters, sorter, extra)}}
            />
            </ConfigProvider>
        </div>
    )
}

ReactDOM.render(<Demo />, mountNode)
```
