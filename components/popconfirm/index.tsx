// 气泡确认框
import React from 'react'
import { Popconfirm } from 'antd'
import { PopconfirmProps } from 'antd/lib/popconfirm'

export interface WKPopconfirmProps extends PopconfirmProps{
}

const WKPopconfirm: React.FC<WKPopconfirmProps> = function(props){
    const { children, ...restProps } = props
    return (
        <Popconfirm {...restProps}>
            { children }
        </Popconfirm>
    )
}

export default WKPopconfirm