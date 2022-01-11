---
order: 0
title:
  zh-CN: 搜索框
  en-US: search input
---

## zh-CN

搜索框

## en-US

search input

```jsx
import { useState } from 'react';
import { SearchInput } from 'wanke-gui';

function App() {
  const handleChange = (e) => {
    console.log('change', e.target.value)
  }
  const handleSearch = (val) => {
    console.log('search', val)
  }

  return (
    <div>
      <p>
        <SearchInput
          style={{ width: 200 }}
          placeholder='请输入关键字'
          onChange={handleChange}
          onSearch={handleSearch}
        />
      </p>
      <p>
        <SearchInput
          searchSize='normal'
          placeholder='请输入关键字'
          onChange={handleChange}
          onSearch={handleSearch}
        />
      </p>
    </div>
  );
}

ReactDOM.render(<App />, mountNode);
```

<style>
</style>
