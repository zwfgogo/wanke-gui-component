import React, { CSSProperties } from 'react'
import { Spin } from 'antd'
import { ConfigContext, ConfigConsumerProps } from 'antd/es/config-provider'

export default class FullLoading extends React.Component<{tip?: string, style?: CSSProperties}, {}> {
  render() {
    let style = this.props.style || {}
    return (
      <ConfigContext.Consumer>
        {(configProps: any) => {
          const tip =
            Object.keys(this.props).indexOf('tip') > -1
              ? this.props.tip
              : configProps?.locale?.Wanke.FullLoading.tip

          return (
            <div
              className="wanke-vh-center full-loading"
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 99,
                background: 'rgba(255,255,255, .9)',
                ...style
              }}
            >
              <Spin tip={tip}/>
            </div>
          )
        }}
      </ConfigContext.Consumer>
    )
  }
}
