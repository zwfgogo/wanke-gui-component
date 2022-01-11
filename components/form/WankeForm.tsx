import React, { Component } from 'react';
import { Form } from 'antd';
import { FormProps } from 'antd/lib/form';

export interface Props extends FormProps {

}

class WankeForm extends Component<Props> {
  static useForm = Form.useForm;
  static Item = Form.Item;
  static List = Form.List;
  static Provider = Form.Provider;

  render() {
    return (
      <Form {...this.props}
            layout={this.props.layout || 'vertical'}

      />
    );
  }
}

export default WankeForm;
