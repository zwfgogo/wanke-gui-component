import React from 'react'
import { Input } from 'antd'

import InputItem, { wrapper } from './InputItem'

import { BasicProps, FormComponentProps } from './types'

/**
 * 受控的输入框组件
 * 默认处理 rule 内的 message和whitespace
 */
interface Props extends BasicProps, FormComponentProps {
  placeholder?: string
  suffix?: string
  value: string
  onChange?: (v: string) => void
  type?: string
  maxLength?: number;
  onBlur?: (e: any)=>void
}

let uid = 1

class TextItem extends React.Component<Props> {
  static defaultProps = {
    type: 'text'
  }

  name: string

  constructor(props: Props) {
    super(props)
    this.name = props.name || 'input_' + uid++
  }

  componentDidMount() {
    this.props.form.setFieldsValue({[this.name]: this.props.value})
  }

  componentDidUpdate(prevProps: Readonly<Props>) {
    this.props.form.setFieldsValue({[this.name]: this.props.value})
  }

  render() {
    if (this.props.rules && this.props.rules.length > 0) {
      let rule = this.props.rules[0]
      if (!this.props.disabled && 'required' in rule && rule.message == null && this.props.label) {
        rule.message = `请输入${this.props.label}`
        rule.whitespace = true
      }
    }
    let placeholder = this.props.placeholder != undefined ? this.props.placeholder : (this.props.label && `请输入${this.props.label}`)

    return (
      <InputItem name={this.name} label={this.props.label} rules={this.props.rules} style={this.props.style}>
        <Input
          maxLength={this.props.maxLength}
          placeholder={placeholder}
          onChange={e => this.props.onChange(e.target.value)}
          suffix={this.props.suffix}
          disabled={this.props.disabled}
          type={this.props.type}
          onBlur={this.props.onBlur}
        />
      </InputItem>
    )
  }
}

export default wrapper<Props>(TextItem)
