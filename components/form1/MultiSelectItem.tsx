import React from 'react'
import { Select } from 'antd'

import InputItem, { wrapper } from './InputItem'

import { BasicProps, FormComponentProps, ValueName } from './types'

/**
 * 受控的多选下拉框组件
 */
interface Props extends BasicProps, FormComponentProps {
  dataSource: ValueName[]
  value: string[] | number[]
  onChange?: (v: string[] | number[]) => void
}

let uid = 1

class MultiSelectItem extends React.Component<Props> {
  name: string

  constructor(props: Props) {
    super(props)
    this.name = props.name || 'multi_select_' + uid++
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
    return (
      <InputItem name={this.name} label={this.props.label} rules={this.props.rules}>
        <Select mode="multiple" dataSource={this.props.dataSource} onChange={this.props.onChange} disabled={this.props.disabled}/>
      </InputItem>
    )
  }
}

export default wrapper<Props>(MultiSelectItem)
