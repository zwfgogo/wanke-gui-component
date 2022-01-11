// 面包屑导航组件
import React from 'react'
import { Tabs } from 'antd'
import { TabsProps } from 'antd/lib/tabs'

export interface WKTabsProps extends TabsProps{
}

const WKTabs = function(props: WKTabsProps){
    return (
        <Tabs {...props} />
    )
}

WKTabs.TabPane = Tabs.TabPane

export default WKTabs
