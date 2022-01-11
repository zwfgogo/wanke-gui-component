import React, { ReactNode, CSSProperties } from 'react'
import ReactDom from 'react-dom'
import * as d3 from 'd3'
import { PieArcDatum, Selection, interpolateMagma } from 'd3'
import PieLegend from './PieLegend'
import PieToolTip from './PieToolTip'
import _ from 'lodash'

export type shapeFunc = (color: string) => ReactNode
export type textFunc = (item: dataType) => ReactNode
export type viewBoxFunc = (width: number, height: number) => string

export interface titleObj {
    name: string,
    color?: string,
    fontSize?: number,
    fontFamily?: string,
    textAnchor?: 'start' | 'middle' | 'end',
    position?: 'top' | 'middle' | 'bottom',
    onClick?: () => void, // 点击事件
}

export interface legendObj {
    position?: 'left' | 'right' | 'top' | 'bottom', // 图例定位
    shape?: 'circle' | 'rect' | shapeFunc, // 自定义图例形状
    text?: ReactNode | textFunc, // 文本内容
    boxStyle?: Partial<CSSProperties>,
    onClick?: (data: dataType) => void, // 点击事件
}

export interface tooltipObj {
    render?: (item: dataType, sum: number) => React.ReactNode
}

export interface PieOptions {
    viewBox?: string | viewBoxFunc, // svg视野范围
    transform?: string | viewBoxFunc, // 饼图修改位置
    globalColor?: (data: dataType, index: number) => string, // 全局设置图例颜色
    radius?: [number, number], // 内圆和外圆的比例（默认[0,0.8]）
    title?: null | string | titleObj, // 标题设置
    legend?: boolean | legendObj, // 图例设置
    tooltip?: boolean | tooltipObj, // 提示窗口设置

}

export interface dataType {
    name: string,
    value: number,
    color?: string,
    [propName: string]: any, // 指定义一些变量
}

export interface PieState {
    width: number,
    height: number,
    currentPieName: string,
    data: dataType[],
    tooTipPosition: [number, number],
    toolTipVisible: boolean,
    bindData: dataType,
}

export interface PieProps {
    options: PieOptions,
    data: dataType[],
    onMouseEnter?: (data: dataType) => void, // 图形的鼠标移入
    onMouseLeave?: (data: dataType) => void, // 图形的鼠标移出
    onClick?: (data: dataType) => void, // 图形的单击事件
}


class PieChart extends React.Component<PieProps, PieState>{
    pieBox: HTMLDivElement; // 饼图包裹对象
    legendBox: HTMLDivElement;
    pieGroup: d3.Selection<SVGGElement, any, any, any>;
    newData: dataType[];
    getColor: d3.ScaleOrdinal<string, string>
    static PieLegend = PieLegend
    static PieToolTip = PieToolTip
    tooltip: PieToolTip
    dataValueSum: number = 1

    constructor(props: PieProps) {
        super(props)
        this.state = {
            width: 0,
            height: 0,
            currentPieName: null, // 当前指定的区域
            data: [],
            tooTipPosition: [0, 0],
            toolTipVisible: false,
            bindData: null,
        }
    }

    static defaultProps = {
        options: {
            radius: [0, 0.8],
            title: null,
        }
    }

    componentDidMount() {
        const height = this.pieBox.clientHeight;
        const width = this.pieBox.clientWidth;
        const { data } = this.props
        this.setState({ width, height })
        this.addDataState();
        window.addEventListener('resize', this.onResize)
        this.dataValueSum = data.reduce((pre, item) => pre + item.value, 0)
    }

    componentDidUpdate(preProps: PieProps) {
        if (!_.isEqual(preProps.data, this.props.data)) {
            this.addDataState();
            this.dataValueSum = this.props.data.reduce((pre, item) => pre + item.value, 0)
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize)
    }

    onResize = () => {
        // const height = this.pieBox.clientHeight;
        // const width = this.pieBox.clientWidth;
        // console.log("1", this.pieBox.clientHeight, this.pieBox.clientWidth)
        // this.setState({ width, height }, () => {
        //     this.addDataState();
        // })
        this.drawPie();
    }

    addDataState = () => {
        const { data, options: { globalColor } } = this.props
        const pies = d3.pie<dataType>().padAngle(0).sort(null).value(d => d.value)(data)
        this.getColor = d3.scaleOrdinal<string>()
            .domain(pies.map(d => d.data.name))
            .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), pies.length).reverse())
        this.newData = data.map((item, index) => ({ ...item, color: item.color || (globalColor ? globalColor(item, index) : this.getColor(item.name)) }))
        this.setState({ data: this.newData }, this.drawPie)
    }

    // 画饼图
    drawPie = () => {
        const { options, onMouseEnter, onClick, onMouseLeave } = this.props
        const { width, height, data } = this.state
        const { viewBox, radius, legend, transform } = options
        this.dataValueSum = data.reduce((pre, item) => pre + (!item.isClose ? item.value : 0), 0)
        const newData = data.filter(item => !item.isClose)
        const isAllZero = newData.length ? !newData.some(item => item.value) : false
        const pies = d3.pie<dataType>().padAngle(0).sort(null).value(d => d.value)(isAllZero ? newData.map(item => ({ ...item, originValue: item.value, value: 1 })) : newData)
        const beforeSvg = this.pieBox.getElementsByTagName('svg')[0]
        if (beforeSvg) this.pieBox.removeChild(beforeSvg);
        const svg: Selection<any, any, any, any> = d3.create('svg')
            .attr('viewBox', viewBox && Object.prototype.toString.call(viewBox).indexOf('Function') > 0 ? (viewBox as viewBoxFunc)(width, height) : viewBox ? viewBox as string : `0 0 ${width} ${height}`)
            .attr('style', 'height: 100%; width: 100%;')
        this.pieGroup = svg.append('g').attr('transform', transform && Object.prototype.toString.call(transform).indexOf('Function') > 0 ?
            `translate(${(transform as viewBoxFunc)(width, height)})`
            :
            transform ? `translate(${transform as string})`
                :
                `translate(${width / 2}, ${height / 2})`)
            .attr('style', 'height: 100%; width: 100%;')
        const r = Math.min(width, height) / 2;
        this.pieGroup.selectAll('path').data(pies).join("path")
            .attr('fill', d => d.data.color)
            .attr('d', d3.arc<PieArcDatum<dataType>>().innerRadius(r * (radius && radius[0] || 0)).outerRadius(r * (radius && radius[1] || 1)))
            .attr('cursor', 'pointer')
            .on('mouseenter', (d) => {
                this.setState({ currentPieName: d.data.name }, () => this.refreshCurrentPie(true))
                const data: dataType = { ...d.data, value: d.data.originValue ?? d.data.value }
                delete data.originValue;
                onMouseEnter && onMouseEnter(data)
            })
            .on('mouseleave', (d) => {
                this.refreshCurrentPie(false)
                this.setState({ currentPieName: null, toolTipVisible: false })
                const data: dataType = { ...d.data, value: d.data.originValue ?? d.data.value }
                delete data.originValue;
                onMouseLeave && onMouseLeave(data)
            })
            .on('click', (d) => {
                const data: dataType = { ...d.data, value: d.data.originValue ?? d.data.value }
                delete data.originValue;
                onClick && onClick(data)
            })
            .on('mousemove', (d) => {
                const data: dataType = { ...d.data, value: d.data.originValue ?? d.data.value }
                delete data.originValue;
                this.setState({ tooTipPosition: this.getToolTipPosition(), toolTipVisible: true, bindData: data })
            })
        // 标题
        this.drawTitle();
        this.pieBox.appendChild(svg.node())
    }

    // 计算当前tooltip的定位的坐标
    getToolTipPosition = (): [number, number] => {
        const { width, height } = this.state
        const { options } = this.props
        const { transform } = options
        const viewXY = transform && Object.prototype.toString.call(transform).indexOf('Function') > 0 ? (transform as viewBoxFunc)(width, height).split(',').map(item => parseInt(item.trim()))
        : transform ? (transform as string).split(',').map(item => parseInt(item.trim())) 
         : [width/2,height/2]
        const [x1, y1] = d3.mouse(this.pieBox.getElementsByTagName('svg')[0])
        const x0 = viewXY[0]
        const y0 = viewXY[1]
        let x2 = (x1 - x0) * 1.5 + x0
        let y2 = (y1 - y0) * 1.5 + y0
        if (x1 < x0 && this.tooltip.tooltip) {
            x2 = x2 - this.tooltip.tooltip.clientWidth;
        }
        if (y1 < y0 && this.tooltip.tooltip) {
            y2 = y2 - this.tooltip.tooltip.clientHeight;
        }
        const bodyWidth = document.body.clientWidth;
        const { clientLeft, offsetLeft, clientTop, offsetTop } = this.pieBox
        // console.log('y2 + this.tooltip.tooltip.clientWidth + clientTop + offsetTop + 18 > bodyHeight', y2 + this.tooltip.tooltip.clientHeight    + clientTop + offsetTop + 18, height)
        if (x2 + this.tooltip.tooltip.clientWidth + clientLeft + offsetLeft + 18 > bodyWidth) x2 = x0 - this.tooltip.tooltip.clientWidth
        // if (y2 + this.tooltip.tooltip.clientHeight + clientTop + offsetTop + 18 > bodyHeight) y2 = y0 - this.tooltip.tooltip.clientHeight
        if (y2 + this.tooltip.tooltip.clientHeight > height) y2 = y2 - this.tooltip.tooltip.clientHeight

        if (x2 + clientLeft + offsetLeft < 0) x2 = x0
        if (y2 + clientTop + offsetTop < 0) y2 = y0

        return [x2, y2]
    }

    // 绘制标题
    drawTitle = () => {
        const { options: { title, radius } } = this.props
        const { width, height } = this.state
        if (title && Object.prototype.toString.call(title).indexOf('Object') > 0) {
            const titleObj = title as titleObj
            const r = Math.min(width, height) / 2;
            const d3 = this.pieGroup.append("g")
                .attr("font-family", titleObj.fontFamily || "sans-serif")
                .attr("font-size", titleObj.fontSize || 12)
                .attr("text-anchor", titleObj.textAnchor || "middle")
                .append('text')
                .attr('dy', titleObj.position === 'top' ? -r + (titleObj.fontSize || 12) : titleObj.position === 'bottom' ? r - Math.floor((titleObj.fontSize || 12) / 2) : 0)
                .attr('cursor', titleObj.onClick ? 'pointer' : 'default')
                .attr('fill', titleObj.color || '#000')

            if (titleObj.name && titleObj.name.indexOf('\n') > -1) {
                titleObj.name.split('\n').forEach((item, index) => {
                    d3.append('tspan')
                        .text(item)
                        .attr('x', 0)
                        .attr('y', (titleObj.fontSize || 12) * index)
                })
            } else {
                d3.text(titleObj.name)
            }
            d3.on('click', (d) => {
                titleObj.onClick && titleObj.onClick()
            })
        } else if (title) {
            const d3 = this.pieGroup.append("g")
                .attr("font-family", "sans-serif")
                .attr("font-size", 12)
                .attr("text-anchor", "middle")
                .append('text')
            if ((title as string).indexOf('\n') > -1) {
                (title as string).split('\n').forEach((item, index) => {
                    d3.append('tspan')
                        .text(item)
                        .attr('x', 0)
                        .attr('y', 12 * index)
                })
            } else {
                d3.text(title as string)
            }
        }

    }

    refreshCurrentPie = (isHover: boolean) => {
        const { options } = this.props
        const { width, height } = this.state
        const { radius } = options
        const r = Math.min(width, height) / 2;
        const arcShape = d3.arc<PieArcDatum<dataType>>().innerRadius(r * (radius && radius[0] || 0)).outerRadius(r * (radius && radius[1] || 1))
        const arcShapeOuter = d3.arc<PieArcDatum<dataType>>().innerRadius(r * (radius && radius[0] || 0)).outerRadius(r * (radius && radius[1] || 1) + 10)
        const path = this.pieGroup.selectAll('path')
        if (isHover) {
            path
                // .attr('d', (d: any) => arcShape(d))
                .transition().duration(300)
                .attr('d', (d: any) => d.data.name === this.state.currentPieName ? arcShapeOuter(d) : arcShape(d))
        } else {
            path
                .attr('d', (d: any) => d.data.name === this.state.currentPieName ? arcShapeOuter(d) : arcShape(d))
                .transition().duration(300)
                .attr('d', (d: any) => arcShape(d))
        }
    }

    // 图例点击事件
    legendClick = (data: dataType) => {
        const { options: { legend } } = this.props
        const newData = this.state.data.map(item => data.name === item.name ? ({ ...data, isClose: !data.isClose }) : item)
        this.setState({
            data: newData
        }, this.drawPie)
        legend && (legend as legendObj).onClick && (legend as legendObj).onClick(data)
    }

    render() {
        const { options: { legend, tooltip } } = this.props
        const { data, tooTipPosition, toolTipVisible, bindData } = this.state
        return (
            <div ref={pieBox => this.pieBox = pieBox} style={{ height: '100%', width: '100%', position: 'relative', display: 'flex', justifyContent: 'center' }}>
                {legend && Object.prototype.toString.call(legend).indexOf('Object') > 0 ? <PieLegend {...(legend as legendObj)} onClick={this.legendClick} data={data} /> : legend ? <PieLegend onClick={this.legendClick} data={data} position="bottom" /> : null}
                {tooltip && Object.prototype.toString.call(tooltip).indexOf('Object') > 0 ?
                    <PieToolTip ref={tooltip => this.tooltip = tooltip} tooTipPosition={tooTipPosition} visible={toolTipVisible}>
                        {
                            (tooltip as tooltipObj).render && bindData ? (tooltip as tooltipObj).render(bindData, this.dataValueSum)
                                :
                                bindData ?
                                    <div className="wanke-tooltip-children"><i style={{ backgroundColor: bindData.color }} />{bindData.name}
                            :
                            {bindData.value}({this.dataValueSum ? (bindData.value / this.dataValueSum * 100).toFixed(2) : '0.00'}%)</div> : null
                        }
                    </PieToolTip>
                    :
                    tooltip ?
                        <PieToolTip ref={tooltip => this.tooltip = tooltip} tooTipPosition={tooTipPosition} visible={toolTipVisible}>
                            {bindData ? <div className="wanke-tooltip-children"><i style={{ backgroundColor: bindData.color }} />{bindData.name}:{bindData.value}({this.dataValueSum ? (bindData.value / this.dataValueSum * 100).toFixed(2) : '0.00'}%)</div> : null}
                        </PieToolTip>
                        : null}
            </div>
        )
    }
}

export default PieChart