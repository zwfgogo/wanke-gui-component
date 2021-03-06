import * as React from 'react'
import light from '../theme/light'

export interface CSPConfig {
  nonce?: string;
}

export interface ConfigConsumerProps {
  getPrefixCls: (suffixCls: string, customizePrefixCls?: string) => string;
  showTableInfo?: boolean
  theme: any
}

export const ConfigContext = React.createContext<ConfigConsumerProps>({
  // We provide a default function for Context without provider
  getPrefixCls: (suffixCls: string, customizePrefixCls?: string) => {
    if (customizePrefixCls) return customizePrefixCls

    return `wanke-${suffixCls}`
  },
  theme: light
})

export const ConfigConsumer = ConfigContext.Consumer

// =========================== withConfigConsumer ===========================
// We need define many types here. So let's put in the block region
type IReactComponent<P = any> =
  | React.StatelessComponent<P>
  | React.ComponentClass<P>
  | React.ClassicComponentClass<P>;

interface BasicExportProps {
  prefixCls?: string;
}

interface ConsumerConfig {
  prefixCls: string;
}

interface ConstructorProps {
  displayName?: string;
}

export function withConfigConsumer<ExportProps extends BasicExportProps>(config: ConsumerConfig) {
  return function withConfigConsumerFunc<ComponentDef>(
    Component: IReactComponent
  ): React.SFC<ExportProps> & ComponentDef {
    // Wrap with ConfigConsumer. Since we need compatible with react 15, be care when using ref methods
    const SFC = ((props: ExportProps) => (
      <ConfigConsumer>
        {(configProps: ConfigConsumerProps) => {
          const {prefixCls: basicPrefixCls} = config
          const {getPrefixCls} = configProps
          const {prefixCls: customizePrefixCls} = props
          const prefixCls = getPrefixCls(basicPrefixCls, customizePrefixCls)
          return <Component {...configProps} {...props} prefixCls={prefixCls}/>
        }}
      </ConfigConsumer>
    )) as React.SFC<ExportProps> & ComponentDef

    const cons: ConstructorProps = Component.constructor as ConstructorProps
    const name = (cons && cons.displayName) || Component.name || 'Component'

    SFC.displayName = `withConfigConsumer(${name})`

    return SFC
  }
}
