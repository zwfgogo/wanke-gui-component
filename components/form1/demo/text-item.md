---
order: 0
title:
  zh-CN: 文本输入框
---


## zh-CN

输入文本，需要提供value和onChange

```jsx
import { TextItem, FormContainer } from 'wanke-gui'
function Demo() {
    const [value, setValue] = React.useState('')
    const [form] = FormContainer.useForm()
    return (
        <div style={{height: 200, position: 'relative'}}>
            <FormContainer form={form}>
                <TextItem value={value} onChange={setValue}/>
            </FormContainer>
        </div>
    )
}

ReactDOM.render(<Demo />, mountNode)
```
