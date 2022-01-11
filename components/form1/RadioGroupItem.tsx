import React, { CSSProperties } from 'react'
import { Radio } from 'antd'

import { InputItemBasic, wrapper } from './InputItem'

import { BasicProps, FormComponentProps } from './types'
import Label from '../layout/Label'

/**
 * 受控的输入框组件
 */
interface Props extends BasicProps, FormComponentProps {
  value: number | string
  onChange: (value: number | string) => void
  className?: string
  errorClassName?: string
  style?: CSSProperties
  errorStyle?: CSSProperties
}

let uid = 1

class RadioGroupItem extends React.Component<Props> {
  name: string

  constructor(props: Props) {
    super(props)
    this.name = props.name || 'radio_group_' + uid++
  }

  componentDidMount() {
    this.props.form.setFieldsValue({[this.name]: this.props.value})
  }

  componentDidUpdate(prevProps: Readonly<Props>) {
    this.props.form.setFieldsValue({[this.name]: this.props.value})
  }

  render() {
    let required = false
    if (this.props.rules && this.props.rules.length > 0) {
      let rule = this.props.rules[0]
      if ('required' in rule && rule.message == null) {
        required = rule.required
        rule.message = `请选择${this.props.label}`
      }
    }
    return (
      <div className="input-item">
        <Label required={required}>{this.props.label}</Label>
        <InputItemBasic name={this.name} label={this.props.label} rules={this.props.rules} className={this.props.className} style={this.props.style}
                        errorClassName={this.props.errorClassName} errorStyle={this.props.errorStyle}
        >
          <Radio.Group value={this.props.value} onChange={(e) => this.props.onChange(e.target.value)}>
            {this.props.children}
          </Radio.Group>
        </InputItemBasic>
      </div>
    )
  }
}

export default wrapper<Props>(RadioGroupItem)
