import React from 'react'
import { ConfigProvider as AntdConfigProvider } from 'antd'
import { ConfigConsumer } from 'antd/lib/config-provider';
import LocaleReceiver from 'antd/lib/locale-provider/LocaleReceiver';
import { ConfigProviderProps } from 'antd/lib/config-provider'

class ConfigProvider extends React.Component<ConfigProviderProps>{
  static LocaleReceiver: typeof LocaleReceiver;
  static ConfigConsumer: any;
  render(){
    return (
      <AntdConfigProvider {...this.props} />
    )
  }
}

ConfigProvider.ConfigConsumer = ConfigConsumer
ConfigProvider.LocaleReceiver = LocaleReceiver

export default ConfigProvider