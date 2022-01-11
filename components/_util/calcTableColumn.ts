import { Column } from '../table'

export function columnsInfo(rowSelection, columns: Column<any>[]) {
  return columns.reduce((result: number, item) => {
    if (item.children) {
      return result + columnsInfo(null, item.children)
    }
    if (typeof item.width == 'number') {
      return result + item.width
    } else if (typeof item.width == 'string') {
      console.log(`${item.title} width不为number类型`)
    } else {
      console.log(`存在没有宽度的列`)
    }
    return result
  }, rowSelection?.columnWidth || 0)
}
