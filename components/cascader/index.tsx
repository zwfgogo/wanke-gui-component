/** @author
 * 级联选择
 */

import React from 'react'
import { Select } from 'antd'
import { OptionProps } from 'antd/lib/select'
import './index.less'
import _ from 'lodash'
import { LoadingOutlined } from '@ant-design/icons';
import innerText from 'react-innertext'

const { Option } = Select

export interface option extends Partial<OptionProps> {
    label: React.ReactNode,
    value: string | number,
    children?: option[],
}

export interface WKCascaderProps {
    value?: (string | number)[],
    defaultValue?: string[] | number[],
    options: option[];
    selectStyle?: Partial<React.CSSProperties>,
    style?: Partial<React.CSSProperties>,
    level?: number, // 当前需要展示的下拉框的个数，默认为1(初始化显示一个下拉数据，当选择完后根据具体情况来逐一添加)
    onChange: (value: ((string | number)[])) => void,
    allowClear?: boolean,
    disabled?: boolean,
    placeholder?: string[],  // 选择框默认文字
    prefix?: React.ReactNode[], // 前缀
    suffix?: React.ReactNode[], // 后缀
    loading?: boolean, // loading状态，异步加载
    loadIcon?: React.ReactNode, // loading图标
    showfilter?: boolean, // 是否过滤
}

export interface WKCascaderState {
    value?: (string | number)[],
}

class WKCascader extends React.Component<WKCascaderProps, WKCascaderState>{

    static defaultProps: Partial<WKCascaderProps> = {
        level: 1,
        allowClear: false,
        disabled: false,
        placeholder: ['请选择'],
        prefix: [],
        suffix: [],
        loadIcon: <LoadingOutlined />,
        showfilter: false,
    }

    static setChildren: (option: option[], sourceData: option[], targetValue: (string | number)[], fieldName?: string) => option[];
    optionsList: option[][]
    isInput: boolean;
    selectBoxList: HTMLDivElement[]

    constructor(props: WKCascaderProps) {
        super(props);
        this.optionsList = [props.options];
        this.isInput = false;
        this.selectBoxList = [];
        this.state = {
            value: props.value || props.defaultValue || [],
        }
    }

    componentDidUpdate(preProps: WKCascaderProps) {
        if (!_.isEqual(preProps.value, this.props.value) && !_.isEqual(this.props.value, this.state.value)) {
            this.setState({ value: this.props.value })
        }
    }

    // 获取下拉控件需要的显示的个数
    getForTimes = () => {
        const { level, options, loading } = this.props
        const { value } = this.state
        let li = 0;
        let nowObj = options;
        this.optionsList = [options]
        for (let i = 0; i < value.length; i++) {
            const index = nowObj.findIndex(item => item.value === value[i])
            if (index > -1) nowObj = nowObj[index].children
            else break;
            this.optionsList[i + 1] = nowObj
            li++;
            if(!nowObj) break;
        }
        li = li + (nowObj && nowObj.length > 0 ? 1 : 0)
        return Math.max(level, li, value.length)
    }

    // onChange
    selectChange = (value, optionData, index: number) => {
        const { onChange } = this.props
        this.state.value[index] = value
        const newValue = (this.state.value as (string | number)[]).filter((item: (string | number), inx: number) => inx <= index)
        this.setState({ value: newValue })
        onChange && onChange(newValue)
    }

    render() {
        const { selectStyle, style, placeholder, prefix, suffix, onChange, options, loadIcon, loading, level, showfilter, ...restProps } = this.props
        const { value } = this.state
        const times = this.getForTimes()
        return (
            <div className="wanke-cascader" style={style}>
                {
                    new Array(times).fill(0).map((item, index) => (
                        <div key={index} className="wanke-cascader-item">
                            {prefix && (!loading || value.length !== index)  ? prefix[index] : null}
                            {
                                loading && value.length === index ?
                                    level > value.length ? loadIcon : null
                                    :
                                    <Select
                                        {...restProps}
                                        style={{ width: 120, margin: '0px 3px', ...(selectStyle || {}) }}
                                        value={value ? value[index] : undefined}
                                        onChange={(value, optionData) => this.selectChange(value, optionData, index)}
                                        placeholder={placeholder[index] || placeholder[0]}
                                        showSearch={showfilter}
                                        filterOption={(input, option) => innerText(option.children).toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    >
                                        {
                                            this.optionsList[index] ? this.optionsList[index].map(optionItem => (
                                                <Option {...optionItem} value={optionItem.value} key={optionItem.value}>{optionItem.label}</Option>
                                            )) : undefined
                                        }
                                    </Select>
                            }
                            {suffix && (!loading || value.length !== index)  ? suffix[index] : null}
                        </div>
                    ))
                }{ loading && level <= value.length ? loadIcon : null }
            </div>
        )
    }
}

// 设置子节点（在异步获取节点）
const setChildren = (option: option[], sourceData: option[], targetValue: (string | number)[], fieldName: string = 'value') => {
    const source = _.cloneDeep(sourceData)
    const targets = _.cloneDeep(targetValue)
    if (targetValue.length > 1) {
        const index = source.findIndex(item => item[fieldName] === targets[0])
        if (index > -1) {
            targets.shift();
            source[index].children = setChildren(option, source[index].children, targets, fieldName)
            return source
        }
    } else if (targetValue.length === 1) {
        const index = source.findIndex(item => item[fieldName] === targets[0])
        if (index > -1) {
            source[index].children = option
            return source
        }
    }
    return [...option]
}

WKCascader.setChildren = setChildren

export default WKCascader