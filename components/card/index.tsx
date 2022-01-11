/**
 * 卡片组件
 */
import React from 'react'
import { CardProps } from 'antd/lib/card'
import { Card, Select, Radio } from 'antd'

const { Grid, Meta } = Card
const { Button, Group } = Radio

export interface WKCardProps extends CardProps {
    extraType?: 'select' | 'radioButtom', // 渲染类型(下拉|单选按钮)
    extraList?: { value: string, label: React.ReactNode }[], // 选择数据源
    extraDefualtValue?: string, // 默认选中值
    onExtraChange?: (value:string) => void, // 右上角onchange事件
}

class WKCard extends React.Component<WKCardProps>{

    static defaultProps: Partial<WKCardProps> = {
        extraType: 'select',
        extraList: [
            { value: '0,d', label: '今日' },
            { value: '7,d', label: '近7日' },
            { value: '30,d', label: '近30日' },
            { value: '12,m', label: '近12月' },
        ],
    }

    static Grid: any
    static Meta: any

    // 获取右侧渲染内容
    getExtra = () => {
        const { extraType, extraList, extra, extraDefualtValue, onExtraChange } = this.props
        if(extra !== undefined) return extra
        else if(extraType === 'select') return <Select defaultValue={extraDefualtValue || extraList[0] && extraList[0].value} bordered={false} options={extraList} onChange={value => onExtraChange && onExtraChange(value)}/>
        else return (
            <Group buttonStyle="solid" defaultValue={extraDefualtValue || extraList[0] && extraList[0].value} onChange={e => onExtraChange && onExtraChange(e.target.value)}>
                {
                    extraList.map(item => (<Button key={item.value} value={item.value}>{item.label}</Button>))
                }
            </Group>
        )
    }

    render() {
        const { extra, children, extraType, extraList, onExtraChange, extraDefualtValue, ...restProps } = this.props
        return (
            <Card {...restProps} extra={this.getExtra()}>
                {children}
            </Card>
        )
    }
}

WKCard.Grid = Grid
WKCard.Meta = Meta

export default WKCard