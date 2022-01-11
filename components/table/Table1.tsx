import React from 'react'
import { TableProps } from 'antd/lib/table'

import AutoSizer from '../layout/AutoSizer'
import { ColumnProps as ColumnProps1 } from 'antd/lib/table'
import { ScrollTable } from './base/ScrollTable'
import { Column } from './index'

export type ColumnProps<T> = ColumnProps1<T>

export interface Props<T = any>
  extends Omit<TableProps<T>, 'columns'>{
  // Pick<TableProps<T>, 'rowKey' | 'dataSource' | 'rowSelection' | 'loading'> {
  columns: Column<T>[]
  singleCheck?: boolean
  checkedList?: any[]
  onCheckChange?: (ids: (string | number) []) => void
  x?: number
  virtual?: boolean
  draggable?: boolean
  moveRow?: (dragIndex, hoverIndex) => void
}

const Table1: React.FC<Props> = function(this: null, props) {
  const { columns, singleCheck, checkedList, onCheckChange, x, virtual, draggable, moveRow, ...tableProps } = props
  return (
    <AutoSizer>
      {
        ({width, height}) => {
          return (
            <ScrollTable
              {...tableProps}
              virtual={virtual}
              columns={columns}
              x={x}
              width={width}
              height={height}
              draggable={draggable}
              moveRow={moveRow}
            />
          )
        }
      }
    </AutoSizer>
  )
}

Table1.defaultProps = {
  rowKey: 'id',
  x: 1050
}

export default Table1
