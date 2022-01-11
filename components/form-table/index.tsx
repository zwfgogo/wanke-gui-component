/**
 * 卡片组件
 */
import React from "react";
import { CardProps } from "antd/lib/card";
import { Table, Form, Select, Input, Tooltip, InputNumber, DatePicker } from "antd";
import { ColumnsType, TableProps } from "antd/lib/table";
import "./index.less";
import { object } from "prop-types";
import { CheckOutlined, EditOutlined } from "@ant-design/icons";
import { CloseOutlined } from "wanke-icon";
import moment from "moment";
import _ from 'lodash'

const { Item } = Form;
const { Option } = Select;

export type statusFunc = (record: any) => boolean;

export interface CloumnsProps<T> extends ColumnsType<T> {
  align: string;
  key?: number;
  render?: any;
  dataIndex: any;
  renderType?: "input" | "select" | "inputNumber" | "datePicker";
  rules?: any[];
  valuePropName?: string; // 针对选择型组件的绑定数据的字段名
  format?: string; // 针对时间类型的控件回显的数据格式化
  dataSource?: { value: string | number; label: React.ReactNode }[]; // 针对下拉等选择型控件的数据源
  disabledEdit?: boolean | statusFunc; // 是否禁用编辑
  allowAuto?: boolean | statusFunc; // 是否允许开启自动模式
  componentProps?: any; //双向绑定组件的参数集合
}

export interface WKFormTableProps extends Omit<TableProps<any>, 'columns'> {
  columns: CloumnsProps<any>[];
  dataSource: any[];
  isinitEdit?: boolean; // 是否初始化时全部为可编辑状态(在单元格为auto或者禁用状态下不生效)
  editCellKeys?: string[]; // 受控可编辑状态的单元格属性（key值的规律`${column.dataIndex}_${index}`）
  onFinish?: (values: any) => void;
  onValuesChange?: (changedValues: any, allValues: any) => void;
}

class WKFormTable extends React.Component<WKFormTableProps> {
  state = {
    errors: {},
    isOpenAuto: {}, // 是否开启单元格自动
    dataSource: this.props.dataSource?.map((item, index) => ({...item, key: item.key ?? index})) || []
  };

  static defaultProps: Partial<WKFormTableProps> = {
    isinitEdit: false
  };

  form: any;

  componentDidUpdate(preProps){
    if(!_.isEqual(preProps.dataSource, this.props.dataSource)) this.setState({ dataSource: this.props.dataSource?.map((item, index) => ({...item, key: item.key ?? index})) || [] })
  }

  // 单元格点击
  cellClick = (isOpen: boolean, key: string) => {
    const { columns } = this.props
    const { getFieldError, getFieldValue, validateFields } = this.form
    const { dataSource, isOpenAuto } = this.state
    if((!getFieldError(key) || !getFieldError(key).length))
    this.setState({
      isOpenAuto: {
        ...isOpenAuto,
        [key]: isOpen
      }
    })
    if(!isOpen && (!getFieldError(key) || !getFieldError(key).length)){
      this.setState({ dataSource: dataSource.map((item, index) => {
        const k = key.split('_')
        const column = columns.find(cItem => cItem.dataIndex === k[0])
        const renderType = column?.renderType
        if(index === parseInt(k[1])) {
          if(renderType === 'select'){
            item[k[0]] = column?.dataSource?.find(cItem => cItem.value === getFieldValue(key))?.label || this.form.getFieldValue(key)
          }else if(renderType === 'datePicker'){
            item[k[0]] = this.form.getFieldValue(key)?.format(column?.format || 'YYYY-MM-DD HH:mm:ss')
          }else{
            item[k[0]] = this.form.getFieldValue(key)
          }
        }
        return item
      }) })
    }

    isOpen && validateFields()
  }

  // 返回
  cellReset = (isOpen: boolean, key: string) => {
    const { dataSource, isOpenAuto } = this.state
    const { columns } = this.props
    const k = key.split('_')
    const column = columns.find(cItem => cItem.dataIndex === k[0])
    const renderType = column?.renderType
    const { setFieldsValue } = this.form
    this.setState({
      isOpenAuto: {
        ...isOpenAuto,
        [key]: isOpen
      },
    })
    let data = dataSource[parseInt(k[1])][k[0]]
    if(renderType === 'select'){
      data = column?.dataSource?.find(cItem => cItem.label === dataSource[parseInt(k[1])][k[0]])?.value || dataSource[parseInt(k[1])][k[0]]
    }else if(renderType === 'datePicker'){
      data = dataSource[parseInt(k[1])][k[0]] ? moment(dataSource[parseInt(k[1])][k[0]]) : undefined
    }
    setFieldsValue({ [key]: data })
  }

  render() {
    const {
      columns,
      isinitEdit,
      editCellKeys,
      dataSource: propsDataSource,
      pagination,
      onValuesChange,
      onFinish,
      ...tableProps
    } = this.props;
    const { errors, isOpenAuto, dataSource } = this.state;
    return (
      <Form
        ref={form => (this.form = form)}
        onFinish={onFinish}
        onValuesChange={onValuesChange}
        onFieldsChange={(changedFields, allFields) => {
          this.setState({
            errors: allFields
              .filter(item => item.errors && item.errors.length)
              .reduce(
                (pre, item) => ({
                  ...pre,
                  [item.name[0]]: item.errors
                }),
                {}
              )
          });
        }}
      >
        <Table
          // rowKey={(record, index) => index}
          {...tableProps}
          columns={columns.map((item, index) => {
            const {
              valuePropName,
              dataSource,
              renderType,
              render,
              dataIndex,
              rules,
              disabledEdit,
              allowAuto,
              format,
              componentProps,
              ...restProps
            } = item;
            return {
              ...item,
              render: (value, record, index) => {
                const isDisabled =
                  Object.prototype.toString
                    .call(disabledEdit)
                    .indexOf("Function") > 0
                    ? (disabledEdit as statusFunc)(record)
                    : disabledEdit;
                const isAuto =
                  Object.prototype.toString
                    .call(allowAuto)
                    .indexOf("Function") > 0
                    ? (allowAuto as statusFunc)(record)
                    : allowAuto;
                const key = `${item.dataIndex || item.keys}_${index}`;

                const style = { width: isAuto && isOpenAuto[key] && !editCellKeys ? 'calc(100% - 30px)' : '100%', textAlign: item.align || 'left' }

                return ((isinitEdit && !isAuto) ||
                  (isAuto && isOpenAuto[key])) && !editCellKeys &&
                  !isDisabled || !isDisabled && editCellKeys && editCellKeys.indexOf(key) > -1 ? (<>
                  <Tooltip
                    overlayClassName="edit-tooltip"
                    title={errors[key]?.map((item, ind) => (
                      <div key={`errors_${ind}`}>{item}</div>
                    ))}
                    getPopupContainer={(triggerNode: HTMLElement) => (triggerNode.parentNode) as HTMLElement}
                    placement="bottomLeft"
                    autoAdjustOverflow={false}
                    color="#ff4d4f"
                    visible={!!errors[key]}
                  >
                    <Item
                      name={key}
                      initialValue={
                        valuePropName && renderType === 'datePicker' ? moment(record[valuePropName]) : valuePropName ? record[valuePropName] : renderType === 'datePicker' ? moment(value) : value
                      }
                      rules={rules}
                    >
                      {renderType === "select" ? (
                        <Select style={style} { ...(componentProps || {}) }>
                          {(dataSource || []).map(cItem => (
                            <Option value={cItem.value} key={cItem.value}>{cItem.label}</Option>
                          ))}
                        </Select>
                      ) :
                      renderType === "inputNumber" ? (
                        <InputNumber style={style} { ...(componentProps || {}) } />
                      ) :
                      renderType === "datePicker" ? (
                        <DatePicker style={style} format={format} { ...(componentProps || {}) } />
                      ): (
                        <Input style={style} { ...(componentProps || {}) } />
                      )}
                    </Item>
                  </Tooltip>
                  {
                    isAuto && isOpenAuto[key] && !editCellKeys ? <div className="edit-icon-box">
                      <CloseOutlined style={{ marginLeft: 4, marginRight: 6 }} title="取消" onClick={() => this.cellReset(!isOpenAuto[key], key)}/>
                      <CheckOutlined title="确定" onClick={() => this.cellClick(!isOpenAuto[key], key)}/>
                    </div> : null
                  }
                  </>
                ) : isAuto && !isDisabled && !editCellKeys ? (
                <div>{render ? render(value, record, index) : value}{<EditOutlined className="edit-icon" onClick={() => this.cellClick(!isOpenAuto[key], key)}/>}</div>
                ) : render ? (
                  render(value, record, index)
                ) : (
                  value
                );
              }
            };
          }) as any}
          dataSource={dataSource}
          pagination={pagination || false}
          bordered={tableProps.bordered ?? true}
        />
      </Form>
    );
  }
}

export default WKFormTable;
