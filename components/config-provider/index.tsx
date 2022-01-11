import * as React from 'react'
import { ConfigConsumer, ConfigContext, CSPConfig, ConfigConsumerProps } from './context'

export { ConfigContext, ConfigConsumer, CSPConfig, ConfigConsumerProps }

export const configConsumerProps = [
  'getPopupContainer',
  'rootPrefixCls',
  'getPrefixCls',
  'renderEmpty',
  'csp',
  'autoInsertSpaceInButton',
  'locale',
  'pageHeader'
]

export interface ConfigProviderProps {
  locale?: any
  prefixCls?: string
  showTableInfo?: boolean
  theme?: any
}

class WankeConfigProvider extends React.Component<ConfigProviderProps> {
  getPrefixCls = (suffixCls: string, customizePrefixCls?: string) => {
    const {prefixCls = 'wanke'} = this.props
    if (customizePrefixCls) return customizePrefixCls

    return suffixCls ? `${prefixCls}-${suffixCls}` : prefixCls
  }

  renderProvider = (context: ConfigConsumerProps) => {
    const {
      children,
      ...other
    } = this.props

    const config: ConfigConsumerProps = {
      ...context,
      getPrefixCls: this.getPrefixCls,
      ...other
    }

    return (
      <ConfigContext.Provider value={config}>
        {children}
      </ConfigContext.Provider>
    )
  }

  render() {
    return (
      <ConfigConsumer>
        {context => this.renderProvider(context)}
      </ConfigConsumer>
    )
  }
}

export default WankeConfigProvider
