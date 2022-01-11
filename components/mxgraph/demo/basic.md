---
order: 0
title:
  zh-CN: 基本使用
---


## zh-CN

基本用法

```jsx
import {mxGraph, mxRubberband} from 'wanke-gui/lib/mxgraph'

import {useEffect, useState } from 'react'

function Demo(props) {
  let ref = React.useRef()

  useEffect(()=> {
        let graph = new mxGraph(ref.current)
        new mxRubberband(graph);
        let parent = graph.getDefaultParent();
        graph.getModel().beginUpdate();
        try
        {
            let v1 = graph.insertVertex(parent, null, 'Hello,', 20, 20, 80, 30);
            let v2 = graph.insertVertex(parent, null, 'World!', 200, 150, 80, 30);
            let e1 = graph.insertEdge(parent, null, '', v1, v2);
        }
        finally
        {
            // Updates the display
            graph.getModel().endUpdate();
        }
    }, [])

    return (
      <div ref={ref} style={{height: 200, overflow: 'auto'}}>
    
      </div>
    )
}

ReactDOM.render(<Demo />, mountNode)
```
