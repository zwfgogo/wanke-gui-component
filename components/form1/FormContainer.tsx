import React from 'react'
import { Form } from "antd"
import classnames from 'classnames'
import { FormContext } from './InputItem'
import { FormProps } from 'antd/lib/form'

function create<T>() {
  return function (Component) {
    const FormHoc: React.FC<Omit<T, 'form'>> = function (this: null, props) {
      const [form] = Form.useForm()
      return (
        <Component form={form} {...props}/>
      )
    }
    return FormHoc
  }
}

interface FormContainerProps extends FormProps {
  onSubmit?: React.FormEventHandler<HTMLFormElement>
  className?: string
}

export default class FormContainer extends React.Component<FormContainerProps> {
  static create = create
  static useForm = Form.useForm

  render() {
    return (
      <Form
        layout={this.props.layout || 'vertical'}
        form={this.props.form}
        autoComplete="off"
        onFinish={this.props.onSubmit}
        className={classnames('form-container', this.props.className)}
        onFinishFailed={this.props.onFinishFailed}
        style={this.props.style}
        initialValues={this.props.initialValues}
      >
        <FormContext.Provider value={this.props.form}>
          {this.props.children}
        </FormContext.Provider>
      </Form>
    )
  }
}
