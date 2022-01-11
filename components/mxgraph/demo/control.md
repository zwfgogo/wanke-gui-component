---
order: 1
title:
  zh-CN: 删除元件
---


## zh-CN

基本用法

```jsx
import {mxGraph, mxImage, mxRubberband, mxRectangle, mxImageShape, mxEvent, mxCellRenderer} from 'wanke-gui/lib/mxgraph'

import {useEffect, useState } from 'react'
console.log(require('./forbidden.png'))
let deleteImage = new mxImage(require('./forbidden.png').default, 16, 16)

class Graph extends mxGraph {
  createCellRenderer(){
    return new CellRenderer();
  }
}
function getDeleteControlBounds(state)
{
    if (state.deleteControl != null)
    {
        var oldScale = state.deleteControl.scale;
        var w = state.deleteControl.bounds.width / oldScale;
        var h = state.deleteControl.bounds.height / oldScale;
        var s = state.view.scale;			

        return (state.view.graph.getModel().isEdge(state.cell)) ? 
            new mxRectangle(state.x + state.width / 2 - w / 2 * s,
                state.y + state.height / 2 - h / 2 * s, w * s, h * s)
            : new mxRectangle(state.x + state.width - w * s,
                state.y, w * s, h * s);
    }
    
    return null;
};
class CellRenderer extends mxCellRenderer {
    createControl(state) {
        super.createControl(state)
        let graph = state.view.graph;
        if (graph.getModel().isVertex(state.cell))
        {
            if (state.deleteControl == null)
            {
                var b = new mxRectangle(0, 0, deleteImage.width, deleteImage.height);
                state.deleteControl = new mxImageShape(b, deleteImage.src);
                state.deleteControl.dialect = graph.dialect;
                state.deleteControl.preserveImageAspect = false;
                
                this.initControl(state, state.deleteControl, false, function (evt)
                {
                    if (graph.isEnabled())
                    {
                        graph.removeCells([state.cell]);
                        mxEvent.consume(evt);
                    }
                });
            }
        }
        else if (state.deleteControl != null)
        {
            state.deleteControl.destroy();
            state.deleteControl = null;
        }
    }
    redrawControl(state) {
        super.redrawControl(state)
        if (state.deleteControl != null)
        {
            var bounds = getDeleteControlBounds(state);
            var s = state.view.scale;
            
            if (state.deleteControl.scale != s || !state.deleteControl.bounds.equals(bounds))
            {
                state.deleteControl.bounds = bounds;
                state.deleteControl.scale = s;
                state.deleteControl.redraw();
            }
        }
    }
    destroy(state) {
        super.destroy(state)
        if (state.deleteControl != null)
        {
            state.deleteControl.destroy();
            state.deleteControl = null;
        }
    }
}

function Demo(props) {
  let ref = React.useRef()

  useEffect(()=> {
        let graph = new Graph(ref.current)
        graph.setPanning(true);
        new mxRubberband(graph);
        var parent = graph.getDefaultParent();
                        
        // Adds cells to the model in a single step
        graph.getModel().beginUpdate();
        try
        {
            var v1 = graph.insertVertex(parent, null, 'Hello,', 20, 20, 80, 30);
            var v2 = graph.insertVertex(parent, null, 'World!', 200, 150, 80, 30);
            var e1 = graph.insertEdge(parent, null, '', v1, v2);
        }
        finally
        {
            // Updates the display
            graph.getModel().endUpdate();
        }
        
        graph.centerZoom = false;

    }, [])

    return (
      <div ref={ref} style={{height: 200, overflow: 'auto'}}>
    
      </div>
    )
}

ReactDOM.render(<Demo />, mountNode)
```
