import { CSSProperties } from 'react'
import _ from 'lodash'

export interface styleType {
    '$btn': Partial<CSSProperties>,
    '$btn:hover': Partial<CSSProperties>,
    '$btn:focus': Partial<CSSProperties>,
    '$btn-circle': Partial<CSSProperties>,
    '$btn-primary': Partial<CSSProperties>,
    '$btn-primary:hover': Partial<CSSProperties>,
    '$btn-primary:focus': Partial<CSSProperties>,
    '$btn-dangerous': Partial<CSSProperties>,
    '$btn-dangerous:hover': Partial<CSSProperties>,
    '$btn-dangerous:focus': Partial<CSSProperties>,
    '$btn-text': Partial<CSSProperties>,
    '$btn-text:hover': Partial<CSSProperties>,
    '$btn-text:focus': Partial<CSSProperties>,
    '$breadcrumb-link>a': Partial<CSSProperties>,
    '$breadcrumb-link>a:hover': Partial<CSSProperties>,
    '$input': Partial<CSSProperties>,
    '$input::-webkit-input-placeholder': Partial<CSSProperties>,
    '$input-group-addon': Partial<CSSProperties>,
    '$input-group-wrapper': Partial<CSSProperties>,
    '$input-search': Partial<CSSProperties>,
    '$input-search>input': Partial<CSSProperties>,
    '$input-affix-wrapper': Partial<CSSProperties>,
    '$input-suffix': Partial<CSSProperties>,
    '$input-affix-wrapper-focused': Partial<CSSProperties>,
    '$input-search-icon:hover': Partial<CSSProperties>,
    '$select': Partial<CSSProperties>,
    '$select-arrow': Partial<CSSProperties>,
    '$select-selection-placeholder': Partial<CSSProperties>,
    '$select-selector': Partial<CSSProperties>,
    '$select-item-option-selected:not(.ant-select-item-option-disabled)': Partial<CSSProperties>,
    '$select-auto-complete': Partial<CSSProperties>,
    '$select-auto-complete>.ant-select-selector': Partial<CSSProperties>,
    '$select-dropdown': Partial<CSSProperties>,
    '$select-dropdown>div': Partial<CSSProperties>,
    '$select-dropdown>div>:nth-of-type(2)': Partial<CSSProperties>,
    '$checkbox-checked .ant-checkbox-inner': Partial<CSSProperties>,
    '$checkbox-checked .ant-checkbox-inner::after': Partial<CSSProperties>,
    '$form-item .ant-select': Partial<CSSProperties>,
    '$form-item-required::before': Partial<CSSProperties>,
    '$form-item-label': Partial<CSSProperties>,
    '$form-item-label::after': Partial<CSSProperties>,
    '$form-item-explain>div': Partial<CSSProperties>,
    '$form-item-control-input-content>input': Partial<CSSProperties>,
    '$form-item-control-input-content>.ant-select': Partial<CSSProperties>,
    '$modal-content': Partial<CSSProperties>,
    '$modal-header': Partial<CSSProperties>,
    '$modal-title': Partial<CSSProperties>,
    '$modal-close-x': Partial<CSSProperties>,
    '$modal-body': Partial<CSSProperties>,
    '$modal-footer': Partial<CSSProperties>,
    '$modal-footer button+button': Partial<CSSProperties>,
    '$picker-suffix': Partial<CSSProperties>,
    '$pagination-item-active': Partial<CSSProperties>,
    '$pagination-item-active:focus': Partial<CSSProperties>,
    '$pagination-item-active>a': Partial<CSSProperties>,
    '$pagination-item:hover': Partial<CSSProperties>,
    '$pagination-item:hover>a': Partial<CSSProperties>,
    '$pagination-item-active:focus>a': Partial<CSSProperties>,
    '$pagination-item-active:hover>a': Partial<CSSProperties>,
    '$pagination-next:hover>.ant-pagination-item-link': Partial<CSSProperties>,
    '$pagination-prev:hover>.ant-pagination-item-link': Partial<CSSProperties>,
    '$pagination-item-container .ant-pagination-item-link-icon': Partial<CSSProperties>,
    '$select:not(.ant-select-disabled):hover .ant-select-selector': Partial<CSSProperties>,
    '$picker:hover, .ant-picker-focused': Partial<CSSProperties>,
    '$picker-cell-in-view.ant-picker-cell-selected .ant-picker-cell-inner': Partial<CSSProperties>,
    '$picker-week-panel-row-selected td':  Partial<CSSProperties>,
    '$picker-cell-in-view.ant-picker-cell-today .ant-picker-cell-inner::before': Partial<CSSProperties>,
    '$picker-header-view button:hover': Partial<CSSProperties>,
    '$picker-today-btn': Partial<CSSProperties>,
    '$table>.ant-table-thead>.ant-table-cell': Omit<Partial<CSSProperties>, 'textAlign'> & { textAlign?: string },
    '*': Partial<CSSProperties>,
    [propName: string]: any, // 指定义一些变量
}

const STYLE_MAP: Partial<styleType> = Object.freeze({
    '@primary-color': '#3d7eff',
    '$table>.ant-table-thead>.ant-table-cell':{
        textAlign: 'center !important', 
    },
    // 按钮
    '$btn': {
        borderRadius: '4px',
        color: '#000',
        border: '1px solid #dedede',
    },
    '$btn:hover': {
        color: '{@primary-color}',
        border: '1px solid {@primary-color}',
        boxShadow: '0px 3px 6px #B8B8B8'
    },
    '$btn:focus': {
        color: '{@primary-color}',
        border: '1px solid {@primary-color}',
    },
    '$btn-circle': {
        borderRadius: '50%',
    },
    '$btn-primary': {
        color: '#fff',
        backgroundColor: '{@primary-color}',
        border: 'none',
    },
    '$btn-primary:hover': {
        color: '#fff',
        backgroundColor: '#0063FF',
        boxShadow: '0px 3px 6px #B8B8B8',
        border: 'none',
    },
    '$btn-primary:focus': {
        color: '#fff',
        backgroundColor: '#0063FF',
        border: 'none',
    },
    '$btn-dangerous': {
        border: 'none',
        color: '#fff',
        backgroundColor: '#FF6464',
    },
    '$btn-dangerous:hover': {
        border: 'none',
        color: '#fff',
        backgroundColor: '#FF3838',
        boxShadow: '0px 3px 6px #FF3838'
    },
    '$btn-dangerous:focus': {
        border: 'none',
        color: '#fff',
        backgroundColor: '#FF3838',
    },
    '$btn-text': {
        border: 'none',
        color: '#000',
        backgroundColor: '#DEDEDE',
    },
    '$btn-text:hover': {
        border: 'none',
        color: '#000',
        backgroundColor: '#B8B8B8',
        boxShadow: '0px 3px 6px #B8B8B8'
    },
    '$btn-text:focus': {
        border: 'none',
        color: '#000',
        backgroundColor: '#B8B8B8',
    },
    // 面包屑
    '$breadcrumb-link>a': {
        color: '#3d7eff',
    },
    '$breadcrumb-link>a:hover': {
        color: '#3d7eff',
        textDecoration: 'underline',
    },
    // input框
    '$input': {
        border: '1px solid #dedede',
    },
    '$input::-webkit-input-placeholder': {
        color: '#999',
    },
    '$input-group-addon': {
        backgroundColor: '#fff',
        padding: '0 6px',
    },
    '$input-affix-wrapper': {
        fontSize: '17px',
        padding: '2px 11px',
        color: '{@primary-color}',
    },
    '$input-suffix': {
        fontSize: '17px',
        color: '{@primary-color}',
    },
    '$input-affix-wrapper-focused': {
    },
    '$input-search-icon:hover': {
        color: '{@primary-color}',
    },
    // select 下拉
    '$select': {
        borderColor: '#dedede',
    },
    '$select-selector': {
        border: '1px solid #dedede',
    },
    '$select-selection-placeholder': {
        color: '#999',
        opacity: 1,
    },
    '$select-arrow': {
        right: '10px',
    },
    '$select-item-option-selected:not(.ant-select-item-option-disabled)': {
        backgroundColor: 'rgba(61, 126, 255, 0.1)',
    },
    '$select-auto-complete': {
        border: 'none',
    },
    '$select-auto-complete>.ant-select-selector': {
        border: 'none',
    },
    // '$select-dropdown': {
    //     maxHeight: '165px',
    // },
    // '$select-dropdown>div': {
    //     maxHeight: '165px',
    // },
    // '$select-dropdown>div>:nth-of-type(2)': {
    //     maxHeight: '165px !important',
    // },
    // 复选
    '$checkbox-checked .ant-checkbox-inner': {
        backgroundColor: 'transparent',
        borderColor: '{@primary-color}'
    },
    '$checkbox-checked .ant-checkbox-inner::after': {
        borderWidth: '1px',
        borderColor: '{@primary-color}'
    },
    '$form-item-required::before': {
        marginRight: '0px !important',
    },
    '$form-item-label': {
        color: '#333',
    },
    '$form-item-label > label::after ': {
        position: "relative",
        top: "-0.5px",
        margin: " 0 8px 0 2px",
        content: '"："',
    },
    '$form-item-control-input-content>input': {
        width: '100%',
    },
    '$form-item-control-input-content>.ant-select': {
        width: '100%',
        height: 'auto',
    },
    '$form-item-explain>div': {
        border: '1px solid #DEDEDE',
        backgroundColor: '#efefef',
        color: '#333',
        padding: '0 5px',
    },
    // 弹框
    '$modal-header': {
        height: '40px',
        padding: '0px 20px',
        backgroundColor: "#F1F1F5",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    '$modal-title': {
        fontSize: '16px',
        color: '#333',
    },
    '$modal-close-x': {
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    '$modal-body': {
    },
    '$modal-footer': {
        padding: '10px',
    },
    '$modal-footer button+button': {
        marginLeft: '10px',
    },
    // 日期/时间
    '$picker-suffix': {
        color: '{@primary-color}',
    },
    // 分页
    '$pagination-item-active':{
        color: '#fff',
        backgroundColor: '{@primary-color}',
        borderColor: '{@primary-color}',
    },
    '$pagination-item:hover': {
        color: '{@primary-color}',
        borderColor: '{@primary-color}',
    },
    '$pagination-item:hover > a': {
        color: '{@primary-color}',
    },
    '$pagination-item-active:focus': {
        borderColor: '{@primary-color}',
    },
    '$pagination-item-active>a': {
        color: '#fff',
    },
    '$pagination-item-active:hover>a': {
        color: '#fff',
    },
    '$pagination-item-active:focus>a': {
        color: '#fff',
    },
    '$pagination-next:hover>.ant-pagination-item-link': {
        color: '{@primary-color}',
        borderColor: '{@primary-color}',
    },
    '$pagination-prev:hover>.ant-pagination-item-link': {
        color: '{@primary-color}',
        borderColor: '{@primary-color}',
    },
    '$pagination-item-container .ant-pagination-item-link-icon': {
        color: '{@primary-color} !important',
    },
    '$select:not(.ant-select-disabled):hover .ant-select-selector': {
        borderColor: '{@primary-color}',
    },
    '$picker:hover, .ant-picker-focused': {
        borderColor: '{@primary-color}',
    },
    '$picker-cell-in-view.ant-picker-cell-selected .ant-picker-cell-inner': {
        backgroundColor: '{@primary-color}',
    },
    '$picker-week-panel-row-selected td': {
        background: '{@primary-color} !important',
    },
    '$picker-cell-in-view.ant-picker-cell-today .ant-picker-cell-inner::before':{
        borderColor: '{@primary-color}',
    },
    '$picker-header-view button:hover': {
        color: '{@primary-color}',
    },
    '$picker-today-btn': {
        color: '{@primary-color}',
    },
    '$picker-today-btn:hover': {
        color: '{@primary-color}',
        filter: 'brightness(110%)',
    },
})

export const setStyleObj2CssString = (styleObj?: Partial<styleType>, otherCss?: string): string => {
    const showStyle = _.merge(_.cloneDeep(STYLE_MAP), (styleObj || {}))
    const newStyle = replaceString(_.pickBy(showStyle, (value, key) => key.indexOf('@') < 0), _.omitBy(showStyle, (value, key) => key.indexOf('@') < 0))
    return `${
        Object.keys(newStyle).map(classKey => `${classKey.indexOf('$') === 0 ? `.ant-${classKey.substr(1)}` : classKey}{\n${
            Object.keys(newStyle[classKey]).map(key => `${_.kebabCase(key)}: ${newStyle[classKey][key]}`).join(';\n')
            }\n}`).join('\n')
        }
        ${otherCss || ''}
    `
}

// 将特殊变量付替换为规则中的值
const replaceString  = (obj?: Partial<styleType>, replaceRule?: any) :CSSProperties => {
    if(obj && replaceRule){
        return Object.keys(obj)
        .reduce((pre, key) => ({
            ...pre,
            [key]: Object.keys(obj[key]).reduce((cPre, cKey) => {
                return { ...cPre, [cKey]: `${obj[key][cKey]}`.indexOf('{@') > -1 ? `${obj[key][cKey]}`.replace(/\{(.+?)\}/g, (value, key) => replaceRule[key]) : `${obj[key][cKey]}` }
            }, {})
        }), {})
    }
    return {}
}

export default STYLE_MAP