import React from 'react'
import { TableProps } from 'antd/lib/table'
import { Column } from './index'
import AutoSizer from '../layout/AutoSizer'
import { ScrollTable } from './base/ScrollTable'
import { Pagination } from 'antd'
import FullContainer from '../layout/FullContainer'
import { ConfigContext, ConfigConsumerProps } from 'antd/es/config-provider'

export interface Props<T = any> extends Omit<TableProps<T>, 'columns' | 'size'> {
  columns: Column<T>[]
  size: number
  page: number
  total: number
  onPageChange: (page: number, size: number) => void
  x?: number,
  showTotal?: (total: number, range: [number, number]) => React.ReactNode
}

const Table2: React.FC<Props> = function (this: null, props) {

  const { columns, page, total, onPageChange, x, size, showTotal, ...tableProps } = props

  return (
    <FullContainer>
      <div className="wanke-flex1">
        <AutoSizer>
          {
            ({ width, height }) => {
              return (
                <ScrollTable
                  {...tableProps}
                  width={width}
                  height={height}
                  rowKey={props.rowKey}
                  dataSource={props.dataSource}
                  columns={props.columns}
                  loading={props.loading}
                  rowSelection={props.rowSelection}
                  x={props.x}
                />
              )
            }
          }
        </AutoSizer>
      </div>
      <div style={{ height: 35, marginTop: 10 }}>
        {
          props.total > 0 && (
            <ConfigContext.Consumer>
              {
                (configProps: any) => {
                  const showtotal = showTotal || ((...arg) => {
                      return configProps.locale?.Wanke?.Table?.showTotal?.replace(/{.[^\{\}]*}/g, value => arg[value.substr(1, value.length-2)])
                  })
                  return (
                    <Pagination
                      style={{ textAlign: 'right' }}
                      showSizeChanger
                      pageSizeOptions={['20', '30', '50', '100']}
                      onShowSizeChange={props.onPageChange}
                      onChange={props.onPageChange}
                      current={props.page}
                      pageSize={props.size || 0}
                      total={props.total}
                      showTotal={showtotal}
                    />
                  )
                }
              }
            </ConfigContext.Consumer>

          )
        }
      </div>
    </FullContainer>
  )
}

Table2.defaultProps = {
  rowKey: 'id',
  x: 1050
}

export default Table2
