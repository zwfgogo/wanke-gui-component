import React from 'react'
import Back from './Back'
import Export from './Export'

interface Props {
  height?: number
}

const Tools: React.FC<Props> = function(this: null, props) {
  if (props.height) {
    return (
      <div style={{height: props.height, margin: '0 15px 15px 15px', position: 'relative'}}>
        <div className="wanke-button-tools">
          {props.children}
        </div>
      </div>
    )
  }
  return (
    <div className="wanke-button-tools">
      {props.children}
    </div>
  )
}

//@ts-ignore
Tools.Back = Back
//@ts-ignore
Tools.Export = Export

export default Tools
