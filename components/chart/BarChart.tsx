import React from 'react'
import _ from 'lodash'

import FullLoading from '../full-loading'
import { margin } from './core/chartConstants'
import { BarChartCommon } from './chart/BarChartCommon'
import ToolTip from './ToolTip'
import Series from './Series'
import { GetColor, getUniqueId } from '.'
import { ConfigProviderProps } from '../config-provider'
import withContext from './withContext'
import { getColorDefault } from '../_util/chartUtil'

interface Props {
  context: ConfigProviderProps
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
    getColor2?: (total, index) => string[]
    startDate?: number
    endDate?: number
    initYRange?: number[]
    showScrollScaleArea?: boolean
    xDataType?: string
  }
}

interface State {
  xIndex: number
  hidedLineArray: number[]
  x: number
  y: number
}

class BarChart extends React.Component<Props, State> {
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
  chart: BarChartCommon
  chartUniqueId = `BarChart-${getUniqueId()}`

  state = {
    xIndex: -1,
    hidedLineArray: [],
    x: -1000,
    y: -1000
  }

  getOptions() {
    const theme = this.props.context.theme
    let getColor = this.props.options.getColor
    if (this.props.options.getColor2) {
      getColor = (total, index) => this.props.options.getColor2(total, index)[0]
    }
    if (!getColor) {
      getColor = getColorDefault
    }
    return {
      ...theme,
      ...this.props.options,
      getColor,
      chartUniqueId: this.chartUniqueId,
      margin: {...margin, ...(this.props.options.margin || {})}
    }
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

  componentDidMount() {
    this.chart = new BarChartCommon(this.svgRef.current, this.props.xData, this.props.yData, this.props.series, this.getOptions())
    this.chart.on('xIndexChange', (xIndex) => {
      this.setState({xIndex})
    })
    window.addEventListener('resize', this.resize)
  }

  componentDidUpdate(prevProps: Readonly<Props>) {
    if (JSON.stringify(this.props.xData) != JSON.stringify(prevProps.xData) ||
      JSON.stringify(this.props.yData) != JSON.stringify(prevProps.yData) ||
      JSON.stringify(this.props.options) != JSON.stringify(prevProps.options) ||
      JSON.stringify(this.props.context.theme) != JSON.stringify(prevProps.context.theme)) {
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
    let seriesNames = this.props.series?.filter(item => item.name != '' && item.name != undefined)
    return (
      <div style={{position: 'relative', height: '100%', width: '100%', paddingTop: seriesNames.length > 0 ? 20 : 0}}
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
              noDataStr={this.props.context.locale?.Empty?.description}
            />
          )
        }
        {
          seriesNames.length > 0 && (
            <Series
              type="bar"
              series={this.props.series}
              hidedLineArray={this.state.hidedLineArray}
              toggle={this.toggleLineDisplay}
              getColor={this.getOptions().getColor}
            />
          )
        }
        <svg ref={this.svgRef} width="100%" height="100%">
          {
            this.props.options.getColor2 && (
              <defs>
                {
                  this.props.yData.map((item, index) => {
                    const {getColor2} = this.props.options
                    let [startColor, endColor] = getColor2(this.props.yData.length, index)

                    return (
                      <linearGradient key={index} id={`${this.chartUniqueId}-${index}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor={startColor}></stop>
                        <stop offset="1" stopColor={endColor}></stop>
                      </linearGradient>
                    )
                  })
                }
              </defs>
            )
          }
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
      return left + this.getOptions().margin.left + 10
    } else {
      return left + this.getOptions().margin.left - 190
    }
  }
}

export default withContext<Props>(BarChart)
