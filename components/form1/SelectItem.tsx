import React from 'react'
import { Select } from 'antd'

import InputItem, { wrapper } from './InputItem'
import { BasicProps, FormComponentProps, ValueName } from './types'

/**
 * 受控的下拉框组件
 */
interface PropsOuter extends BasicProps {
  dataSource: ValueName[]
  value: string | number
  onChange?: (v) => void
  notFoundContent?: React.ReactNode
  loading?: boolean
  showSearch?: boolean
  optionFilterProp?: any
  filterOption?: any
}

interface Props extends PropsOuter, FormComponentProps {

}

let uid = 1

class SelectItem extends React.Component<Props> {
  name: string

  constructor(props: Props) {
    super(props)
    this.name = props.name || 'select_' + uid++
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
        <Select

          onChange={this.props.onChange}
          disabled={this.props.disabled}
          notFoundContent={this.props.notFoundContent}
          loading={this.props.loading}>
          {
            this.props.dataSource.map(option => {
              return (
                <Select.Option key={option.value} value={option.value}>{option.name}</Select.Option>
              )
            })
          }
        </Select>
      </InputItem>
    )
  }
}

export default wrapper<PropsOuter>(SelectItem)
