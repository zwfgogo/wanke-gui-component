/**
 * @author: xuyang
 * 菜单组件
 * 
 */
import React, { Component } from 'react'
import { Menu as AntdMenu } from 'antd'
import Menu, { MenuProps } from 'antd/lib/menu'

const { Item, SubMenu } = AntdMenu

export type iconFunc = (item: dataType, level: number) => React.ReactNode

export interface dataType {
    key: string,
    name: React.ReactNode,
    title?: string,
    icon?: React.ReactNode,
    danger?: boolean,
    disabled?: boolean,
    children?: dataType[];
}

export interface WKMenuProps extends MenuProps {
    data: dataType[],
    globalIcon?: React.ReactNode | iconFunc,
}

class WKMenu extends Component<WKMenuProps> {

    static defaultProps: Partial<WKMenuProps> = {
    }
    
    getMenuChildren = (menuData: dataType[], level: number = 0): React.ReactNode => {
        const { globalIcon } = this.props
        return menuData.map(menu =>
            menu.children && menu.children.length > 0 ?
                (
                <SubMenu {...menu} icon={globalIcon && Object.prototype.toString.call(globalIcon).indexOf('Function') > 0 ? (globalIcon as iconFunc)(menu, level) : globalIcon ?? menu.icon} title={menu.name}>
                    {this.getMenuChildren(menu.children, level + 1)}    
                </SubMenu>
                )
                :
                <Item {...menu} icon={globalIcon && Object.prototype.toString.call(globalIcon).indexOf('Function') > 0 ? (globalIcon as iconFunc)(menu, level) : globalIcon ?? menu.icon}>{menu.name}</Item>)
    }

    render() {
        const { data, globalIcon, ...restProps } = this.props
        return (
            <Menu {...restProps}>
                {this.getMenuChildren(data)}
            </Menu>
        )
    }
}


export default WKMenu