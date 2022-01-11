import React from 'react'

import { RollbackOutlined } from 'wanke-icon'

interface Props {
  back: () => void
}

const Back: React.FC<Props> = function(this: null, props) {
  return (
    <div className="wanke-tool-icon-container wanke-vh-center" onClick={props.back}>
      <RollbackOutlined style={{color: '#fff', fontSize: 18}}/>
    </div>
  )
}

export default Back
