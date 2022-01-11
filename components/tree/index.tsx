import React, { Component, ReactNode } from 'react'
import { Tree as AntdTree, Input } from 'antd'
import innerText from 'react-innertext'
import { TreeProps } from 'antd/lib/tree'
import { InputProps } from 'antd/lib/input'
import { filterTreeDataByfilterValue } from './dataCfg'
import classNames from 'classnames'
import _ from 'lodash'
import './index.less'

const { TreeNode, DirectoryTree } = AntdTree
const { Search } = Input


export interface treeData {
    key: number | string,
    title: React.ReactNode,
    children?: treeData[],
    disabled?: boolean,
    selectable?: boolean,
    icon?: (nodeProps: treeData) => React.ReactNode | React.ReactNode,
    [propName: string]: any, // 指定义一些变量
}

export type DisabledType = (nodeProps: treeData) => boolean
export type selectableType = (nodeProps: treeData) => boolean

export interface treeProps extends Omit<TreeProps, 'disabled'> {
    treeData: treeData[],
    filterable?: boolean, // 是否支持过滤
    isAsync?: boolean, // 是否异步搜素（后台请求）
    searchProps?: InputProps, // 搜索框自定义参数
    searchHeight?: number, // 搜索框自定义参数
    asyncFunc?(value: string): void, //异步搜素执行的回调
    icon?: (nodeProps: treeData) => React.ReactNode | React.ReactNode,
    disabled?: boolean | DisabledType,
    selectable?: selectableType | boolean,
    scrollX?: boolean, // 是否出现横向滚动条
    filterFunc?: (treeNode: treeData, filterValue: string) => boolean, // 过滤方法
}

export interface treeState {
    treeData: treeData[],
}

class WkTree extends Component<treeProps, treeState>{
    static DirectoryTree: any
    static defaultProps = {
        isAsync: false,
        filterable: false,
        isHighlight: false,
        scrollX: false,
        filterFunc: (treeNode: treeData, filterValue: string) => innerText(treeNode.title).indexOf(filterValue) >= 0,
        searchProps: {
            placeholder: '请输入关键字搜索',
            style: {
                marginBottom: 5
            }
        },
    }

    isInput: boolean; // 是否为中文输入过程

    constructor(props) {
        super(props);
        this.state = {
            treeData: props.treeData
        }
    }

    componentDidUpdate(preProps) {
        if (!_.isEqual(preProps.treeData, this.props.treeData)) this.setState({ treeData: this.props.treeData })
    }

    showIcon = (treeItem: treeData) => {
        const { icon } = this.props
        if (treeItem.icon) {
            return Object.prototype.toString.call(treeItem.icon) === "[object Function]" ? treeItem.icon(treeItem) : treeItem.icon
        } else
            return Object.prototype.toString.call(icon) === "[object Function]" ? icon(treeItem) : icon
    }

    onSearch = (value: string) => {
        const { asyncFunc } = this.props
        asyncFunc && asyncFunc(value)
    }

    onInputChange = (e) => {
        const { value } = e.target
        const { searchProps, treeData, filterFunc } = this.props
        if (!this.isInput) {
            searchProps && searchProps.onChange && searchProps.onChange(e)
            this.setState({ treeData: filterTreeDataByfilterValue(treeData, filterFunc, value) })
        }
    }

    render() {
        let {
          treeData: propsTreeData,
          children,
          filterable,
          filterFunc,
          isAsync,
          asyncFunc,
          searchProps,
          icon,
          disabled,
          selectable,
          scrollX,
          height,
          searchHeight = 37,
          ...restParams
        } = this.props
        const { treeData } = this.state

        if (filterable && height) {
          height -= searchHeight
        }

        return (
            <>
                {filterable && isAsync ? <Search {...searchProps} onSearch={this.onSearch} />
                    : filterable ? <Input {...searchProps}
                        onCompositionStart={() => this.isInput = true}
                        onCompositionEnd={(e) => {
                            this.isInput = false
                            this.onInputChange(e)
                        }}
                        onChange={this.onInputChange}
                    /> : null}
                <div
                    className={classNames({ 'wanke-tree-scroll-x': scrollX })}
                    style={{ height: height || undefined }}
                >
                    <AntdTree
                        {...restParams}
                        height={height || undefined}
                        treeData={treeData.map(item => ({
                            ...item,
                            disabled: item.disabled ?? (disabled && Object.prototype.toString.call(disabled) === "[object Function]" ? (disabled as DisabledType)(item) : disabled || false),
                            selectable: item.selectable ?? (selectable && Object.prototype.toString.call(selectable) === "[object Function]" ? (selectable as selectableType)(item) : selectable ?? true),
                        }))}
                    />
                </div>

            </>
        )
    }
}

WkTree.DirectoryTree = DirectoryTree;

export default WkTree
