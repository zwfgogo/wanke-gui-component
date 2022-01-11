import React from 'react'
import { DatePicker } from 'antd'
import InputItem, { wrapper } from './InputItem'
import { BasicProps, FormComponentProps } from './types'
import { Moment } from 'moment'

/**
 * 受控的输入框组件
 */
interface Props extends BasicProps, FormComponentProps {
  value?: Moment
  disabledDate?: any
  disabledTime?: any
  placeholder?: string
  format?: string
  onChange?: (v: Moment) => void
  showTime?: boolean
  limitTime?: any
  limitType?: any
  picker?: any
}

let uid = 1

class DateItem extends React.Component<Props> {
  name: string

  constructor(props: Props) {
    super(props)
    this.name = props.name || 'date_' + uid++
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
      if ('required' in rule && rule.message == null) {
        rule.message = `请选择${this.props.label}`
      }
    }
    let {name, label, rules, ...otherProps} = this.props
    return (
      <InputItem name={this.name} label={this.props.label} rules={this.props.rules}>
        <DatePicker
          {...otherProps}
        />
      </InputItem>
    )
  }
}

export default wrapper<Props>(DateItem)
