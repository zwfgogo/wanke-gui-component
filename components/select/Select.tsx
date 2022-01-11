/**
 * Created by zhuweifeng on 2019/8/9.
 */
import React, { Component } from 'react';
import { Select } from 'antd';
import { SelectProps } from 'antd/lib/select';
import { CaretDownOutlined } from 'wanke-icon';

const Option = Select.Option;

export interface SelectionProps extends SelectProps<any> {
  label?: string;
  dataSource?: Array<any>;
  style?: any;
  className?: string;
}

class Selection extends Component<SelectionProps> {
  static Option = Option;

  render() {
    const { label, style, dataSource, children, className } = this.props;
    let items: any = {};
    items = dataSource
      ? dataSource.map(function(o) {
        // 增加其他数据
        const { name, value, ...otherItem } = o;
        let temp = {};
        for (let i in otherItem) {
          if (typeof otherItem[i] !== 'undefined') {
            // @ts-ignore
            temp[i.toLowerCase()] = otherItem[i].toString();
          }
        }
        return (
          <Option {...temp} value={o.value} key={o.value}>
            {o.name}
          </Option>
        );
      })
      : children;
    let _className: string = 'wanke_selection ';
    if (className) {
      _className += className;
    }
    let { dataSource: dataSource1, ...restProps } = this.props;
    return (
      <div className={_className} style={{ display: 'inline-block' }}>
        <span className="label">{label}</span>
        <Select
          style={style}
          className={'select'}
          suffixIcon={<CaretDownOutlined style={{ fontSize: 12, pointerEvents: 'none' }} />}
          {...restProps}
        >
          {items}
        </Select>
      </div>
    );
  }
}

export default Selection;
