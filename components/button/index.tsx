// 按钮组件
import React from 'react'
import { Button } from 'antd'
import { ButtonProps } from 'antd/lib/button'

export interface WKButtonProps extends Omit<ButtonProps, 'type'|'danger'>{
    type?: 'default' | 'primary' | 'text' | 'danger',
}

const WKButton: React.FC<WKButtonProps> = function(props){
    const { type, ...restProps } = props
    return (
        <Button {...restProps} type={type === 'default' ? 'default' : type === 'text' ? 'text' : 'primary'} danger={type === 'danger'}/>
    )
}

WKButton.defaultProps = {
    type: 'default',
}

export default WKButton