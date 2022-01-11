---
order: 0
title:
  zh-CN: loading
  en-US: loading
---


## zh-CN

基本用法


```jsx
import {FullLoading} from 'wanke-gui'
import {ConfigProvider} from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import enUS from 'antd/es/locale/en_US'
function Demo() {
    return (
      <ConfigProvider locale={{...(window.language === 'zh' ? zhCN : enUS), fullLoadingTip: '加载中---'}}>
        <div style={{height: 200, position: 'relative'}}>
            <FullLoading/>
        </div>
      </ConfigProvider>
    )
}

ReactDOM.render(<Demo />, mountNode)
```
