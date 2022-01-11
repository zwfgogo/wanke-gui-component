/**
 * 饼图图例
 */
import React, { CSSProperties } from 'react'
import { legendObj, dataType, textFunc } from './PieChart'
import './index.less'

export interface PieLegendProps extends legendObj{
    data: dataType[],
}

class PieLegend extends React.Component<PieLegendProps>{

    static defaultProps:PieLegendProps = {
        shape: 'rect',
        data: [],
    }

    // 获取图例的定位
    getLegendStyle = ():Partial<CSSProperties> => {
        const { position, boxStyle } = this.props
        if(position === 'top'){
            return { ...boxStyle, top: 0, width: '100%' }
        }else if(position === 'bottom'){
            return { ...boxStyle, bottom: 0, width: '100%' }
        }else if(position === 'left'){
            return { ...boxStyle, display: 'flex', flexDirection: 'column', left: 0, bottom: 0 }
        }else if(position === 'right'){
            return { ...boxStyle, display: 'flex', flexDirection: 'column', right: 0, bottom: 0 }
        }
        return {...boxStyle}
    }

    // 获取图例
    getLegend = () => {
        const { data, shape, text } = this.props
        return data.map(item => (
            <div className="wanke-legend-item" key={item.name} onClick={() => this.legendClick(item)} style={{ filter: item.isClose ? 'opacity(0.5) grayscale(100%)' : 'none' }}>
                { shape === 'rect' || shape === 'circle' ? <i className={`wanke-legend-icon-${shape}`} style={{ backgroundColor: item.color }}/> : shape }
                { text && Object.prototype.toString.call(text).indexOf('Function') > 0 ? (text as textFunc)(item) : text ? text : item.name }
            </div>
        ))
    }

    // 图例点击
    legendClick = (item:dataType) => {
        const { onClick } = this.props

        onClick && onClick(item)
    }

    render(){
        const { position, shape, boxStyle } = this.props

        return (
            <div className="wanke-legend-box" style={this.getLegendStyle()}>
                { this.getLegend() }
            </div>
        )
    }
}

export default PieLegend