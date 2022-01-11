import React, { CSSProperties } from 'react'
import { Form } from 'antd'
import classnames from 'classnames'

import { FormComponentProps, ValidationRule } from './types'

let FormContext = React.createContext({})

const FormItem = Form.Item

interface Props {
  label: React.ReactNode
  name: string
  rules?: ValidationRule[]
  required?: boolean
  needTip?: string
  initialValue?: string | number
  children?: any
  className?: string
  style?: CSSProperties
  errorStyle?: CSSProperties
  errorClassName?: string
  getValueFromEvent?: (e) => any
}

interface Props1 extends Props, FormComponentProps {
}

export function wrapper<P>(Component) {
  return class W extends React.Component<Omit<P, 'form'>> {
    render() {
      return (
        <FormContext.Consumer>
          {
            (value: any) => (
              <Component {...this.props} form={value}/>
            )
          }
        </FormContext.Consumer>
      )
    }
  }
}

function InputItem(props: Props1) {
  return (
    <div className={classnames('input-item', props.className)} style={props.style}>
      <FormItem name={props.name} label={props.label} rules={props.rules || []}>
        {props.children}
      </FormItem>
    </div>
  )
}

function InputItemBasicInner(props: Props1) {
  let errs = props.form.getFieldError(props.name) || [] // 自定义错误布局
  return (
    <div className={classnames({'has-error': errs.length > 0}, props.className)}>
      <Form.Item name={props.name} rules={props.rules || []} noStyle>
        {props.children}
      </Form.Item>
      <div className={props.errorClassName} style={props.errorStyle}>
        {errs.map((item, index) => {
          return (
            <span key={index} className=" ant-form-explain">{item}</span>
          )
        })}
      </div>
    </div>
  )
}

export default wrapper<Props>(InputItem)

let InputItemBasic = wrapper<Props>(InputItemBasicInner)
export {
  InputItemBasic
}

export { FormContext }
