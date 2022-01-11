// 分页组件
import React from 'react'
import { Pagination } from 'antd'
import { PaginationProps } from 'antd/lib/pagination'

export interface WKPaginationProps extends PaginationProps{
}

const WKPagination: React.FC<WKPaginationProps> = function(props){
    return (
        <Pagination {...props} />
    )
}

export default WKPagination