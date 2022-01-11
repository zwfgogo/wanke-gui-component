---
order: 0
title:
  zh-CN: input框、select下拉、checkbox复选框
---


## zh-CN

input框、select下拉、checkbox复选框

```jsx
import { globalStyleHoc } from 'wanke-gui'
import { Input, Select, Checkbox, AutoComplete } from 'antd'

const { Search } = Input
const { Option } = Select

function Demo(props) {
    const { onChangeStyle } = props
    getProps = () => new Array(10).fill(0).map((item, index) => ({
        value: index,
        label: `测试${index}`
    }))
    return (
        <div style={{height: 200, position: 'relative'}}>
            <div style={{ marginBottom: 8 }}>
                <Input placeholder="请输入" />
            </div>
            <div style={{ marginBottom: 8 }}>
                <Input placeholder="请输入" addonAfter="A"/>
            </div>
            <div style={{ marginBottom: 8 }}>
                <Search placeholder="请输入" />
            </div>
            <div style={{ marginBottom: 8 }}>
                <AutoComplete
                    options={getProps()}
                >
                    <Search placeholder="请输入" />
                </AutoComplete>
            </div>
            <div style={{ marginBottom: 8 }}>
                <Select placeholder="请选择">
                    <Option value="1">1</Option>
                    <Option value="2">2</Option>
                    <Option value="3">3</Option>
                </Select>
            </div>
            <div style={{ marginBottom: 8 }}>
                <Checkbox>复选</Checkbox>
            </div>
        </div>
    )
}
const DemoHoc = globalStyleHoc(Demo)

ReactDOM.render(<Demo />, mountNode)
```
