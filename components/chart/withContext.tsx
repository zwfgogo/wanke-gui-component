import React from 'react'
import { ConfigConsumer } from '../config-provider'

export default function <T>(Component) {
  return (props: Omit<T, 'context'>) => (
    <ConfigConsumer>
      {(context) => <Component {...props} context={context}/>}
    </ConfigConsumer>
  )
}
