---
order: 6
title:
  zh-CN: Table2-basic
  en-US: Table1-basic
---

## zh-CN

空白表格

```jsx
import { Table1 } from 'wanke-gui'

let columns = [
    {dataIndex: 'num', title: '序号', width: 60},
    {dataIndex: 'name', title: '名称', width: 200}
]

function Demo() {
    return (
        <div style={{height: 200, overflow: 'hidden'}}>
            <Table1
                key="id"
                dataSource={[]}
                columns={columns}
            />
        </div>
    )
}

ReactDOM.render(<Demo />, mountNode)
```
