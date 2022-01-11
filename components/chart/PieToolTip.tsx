/**
 * 饼图的提示框
 */
import React from 'react'
import { tooltipObj } from './PieChart'
import './index.less'

export interface PieToolTipProps extends tooltipObj {
    children?: React.ReactNode,
    tooTipPosition: [number, number],
    visible: boolean,
}

class PieToolTip extends React.Component<PieToolTipProps>{

    static defaultProps: PieToolTipProps = {
        tooTipPosition: [0, 0],
        visible: false,
    }
    tooltip: HTMLDivElement

    render() {
        const { children, tooTipPosition, visible } = this.props
        return <div className="wanke-toolTip-box" ref={tooltip => this.tooltip = tooltip} style={{ left: tooTipPosition[0], top: tooTipPosition[1], visibility: visible ? 'visible' : 'hidden' }}>
            {children}
        </div>
    }
}

export default PieToolTip