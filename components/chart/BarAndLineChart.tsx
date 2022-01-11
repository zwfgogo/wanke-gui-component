import React from 'react'
import _ from 'lodash'

import FullLoading from '../full-loading'
import { getColorDefault } from '../_util/chartUtil'
import { BarLineChartCommon } from './chart/BarLineChartCommon'
import ToolTip from './ToolTip'
import Series from './Series'
import { GetColor, getUniqueId } from '.'
import groupBy from 'lodash/groupBy'
import { margin } from './core/chartConstants'

interface Props {
  loading?: boolean
  xData?: string[]
  yData?: number[][]
  series?: {name: string, unit: string}[]
  options?: {
    margin?: any
    tickValues?: number[]
    tooltipDateFormat?: string | ((item) => string)
    dateFormat?: any
    getColor?: GetColor
    startDate: number
    endDate: number
    types?: string[]  // bar、line
  }
}

interface State {
  xIndex: number
  hidedLineArray: number[]
  x: number
  y: number
}

export default class BarChart extends React.Component<Props, State> {
  // static defaultProps = {
  //   xData: ['2019-10-10 01:20:00', '2019-10-10 03:20:00', '2019-10-10 05:20:00', '2019-10-10 06:20:00'],
  //   yData: [[1, 5, 3, 4]],
  //   series: [{name: 'kk'}]
  // }
  static defaultProps = {
    loading: false,
    xData: [],
    yData: [],
    series: [],
    options: {}
  }
  svgRef: React.RefObject<SVGSVGElement> = React.createRef()
  chart: BarLineChartCommon
  chartUniqueId = `BarAndLineChart-${getUniqueId()}`

  state = {
    xIndex: -1,
    hidedLineArray: [],
    x: -1000,
    y: -1000
  }

  resize = () => {
    this.chart.resize()
  }

  mouseMove = (e) => {
    this.doMouseMove()
  }

  doMouseMove = _.throttle(() => {
    if (this.svgRef.current && this.state.xIndex > -1) {
      const svgRect = this.svgRef.current.getBoundingClientRect()
      const x = svgRect.left + this.getLeft()
      const y = svgRect.top + 40
      this.setState({x, y})
    }
  }, 100, {trailing: true})

  getYAxisList() {
    let yLines = groupBy(this.props.series.map((item, index) => ({...item, index})), 'unit')
    let lines = []
    Object.keys(yLines).forEach((unit) => {
      let subLines = []
      let items = yLines[unit]
      items.forEach(item => {
        subLines.push(item.index)
      })
      subLines.push()
      lines.push(subLines)
    })
    return lines
  }

  getOptions() {
    return {
      ...this.props.options,
      chartUniqueId: this.chartUniqueId,
      getYAxisList: () => this.getYAxisList(),
      getColor: this.props.options.getColor || getColorDefault,
      margin: {...margin, ...(this.props.options.margin || {})}
    }
  }

  componentDidMount() {
    this.chart = new BarLineChartCommon(this.svgRef.current, this.props.xData, this.props.yData, this.props.series, this.getOptions())
    this.chart.render()
    this.chart.on('xIndexChange', (xIndex) => {
      this.setState({xIndex})
    })
    window.addEventListener('resize', this.resize)
  }

  componentDidUpdate(prevProps: Readonly<Props>) {
    if (JSON.stringify(this.props.xData) != JSON.stringify(prevProps.xData) ||
      JSON.stringify(this.props.yData) != JSON.stringify(prevProps.yData) ||
      JSON.stringify(this.props.options) != JSON.stringify(prevProps.options)) {
      this.chart.refresh(this.props.xData, this.props.yData, this.props.series, this.getOptions())
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize)
    if (this.chart) {
      this.chart.destroy()
    }
  }

  render() {
    return (
      <div
        style={{position: 'relative', height: '100%', width: '100%', paddingTop: 20}}
        className="wanke-chart"
        onMouseMove={this.mouseMove}
        onMouseLeave={() => this.setState({xIndex: -1})}
        onScroll={() => this.setState({xIndex: -1})}
      >
        {
          this.props.loading && (<FullLoading/>)
        }
        {
          this.state.xIndex != -1 && this.props.yData.length != this.state.hidedLineArray.length && (
            <ToolTip
              dateFormat={this.props.options.tooltipDateFormat}
              xData={this.props.xData}
              yData={this.props.yData}
              series={this.props.series}
              xIndex={this.state.xIndex}
              hidedLineArray={this.state.hidedLineArray}
              left={this.state.x}
              top={this.state.y}
              getColor={this.getOptions().getColor}
              noDataStr={'暂无数据'}
            />
          )
        }
        <Series
          type={index => this.props.options.types[index]}
          series={this.props.series}
          hidedLineArray={this.state.hidedLineArray}
          toggle={this.toggleLineDisplay}
          getColor={this.getOptions().getColor}
        />
        <svg ref={this.svgRef} width="100%" height="100%">
          <defs>
            {
              this.props.yData.map((item, index) => {
                const getColorFn = this.getOptions().getColor
                let color = getColorFn(this.props.yData.length, index)
                return (
                  <linearGradient key={index} id={`linearColor${index}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor={color} stopOpacity="0.05"></stop>
                    <stop offset="1" stopColor={color} stopOpacity="0.001"></stop>
                  </linearGradient>
                )
              })
            }
          </defs>
        </svg>
      </div>
    )
  }

  toggleLineDisplay = (index) => {
    let currentIndex = this.state.hidedLineArray.indexOf(index)
    if (currentIndex == -1) {
      this.state.hidedLineArray.push(index)
    } else {
      this.state.hidedLineArray.splice(currentIndex, 1)
    }
    this.forceUpdate()
    this.chart.toggle(this.state.hidedLineArray)
  }

  getLeft = () => {
    let {xDataScale, width} = this.chart
    let left = xDataScale[this.state.xIndex]
    if (!left) {
      return 0
    }
    if (left < width - 180) {
      return left + margin.left + 10
    } else {
      return left + margin.left - 190
    }
  }
}
