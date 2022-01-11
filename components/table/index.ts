import Table1 from './Table1'
import Table2 from './Table2'
import { ColumnType } from 'antd/lib/table/interface'

export { Table1, Table2 }

export interface Column<T> extends ColumnType<T> {
  children?: any
}
