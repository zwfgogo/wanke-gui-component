/**
 * Created by zhuweifeng on 2019/8/9.
 */
import React, { Component } from 'react';
import { Form } from 'antd';
import { FormItemProps } from 'antd/lib/form';

const Item = Form.Item;

export interface Props extends FormItemProps {

}

class WankeFormItem extends Component<Props> {

  render() {
    return (
      <Item {...this.props}
            validateFirst={this.props.validateFirst || true}

      />
    );
  }
}

export default WankeFormItem;