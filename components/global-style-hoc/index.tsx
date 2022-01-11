/**
 * 全局样式可配置高阶组件
 */

import React, { useState, useEffect } from 'react';
import innerText from 'react-innertext'
import STYLE_MAP, { setStyleObj2CssString, styleType } from './dataCfg'

const globalStyleHoc = WrappedComponent => {
    const renderComponent: React.FC<any> = props => {
        const [style, setStyle] = useState({})
        const [cssStr, setCssStr] = useState('')

        const onChangeStyle = (styleObj?: Partial<styleType>, cssString?: string) => {
            setStyle(styleObj || {})
            setCssStr(cssString || '')
        }
        

        // console.log('测试', innerText(<style type="text/css">{setStyleObj2CssString(style, cssStr)}</style>))
        return (
            <>
                <WrappedComponent {...props} defualtStyle={STYLE_MAP} onChangeStyle={onChangeStyle} />
                <style type="text/css">{setStyleObj2CssString(style, cssStr)}</style>
            </>
        )
    }
    renderComponent.displayName = `renderComponent(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;
    return renderComponent
}

export default globalStyleHoc;