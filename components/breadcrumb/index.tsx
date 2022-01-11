// 面包屑导航组件
import React from 'react'
import { Breadcrumb } from 'antd'
import { BreadcrumbProps } from 'antd/lib/breadcrumb'
import BreadcrumbItem from 'antd/lib/breadcrumb/BreadcrumbItem'
import BreadcrumbSeparator from 'antd/lib/breadcrumb/BreadcrumbSeparator'

export interface WKBreadcrumbProps extends BreadcrumbProps{
}

export interface BreadcrumbInterface extends React.FC<BreadcrumbProps>{
    Item: typeof BreadcrumbItem,
    Separator: typeof BreadcrumbSeparator,
}

const WKBreadcrumb:BreadcrumbInterface = function(props){
    return (
        <Breadcrumb {...props} />
    )
}

WKBreadcrumb.Item= Breadcrumb.Item,
WKBreadcrumb.Separator= Breadcrumb.Separator

export default WKBreadcrumb
