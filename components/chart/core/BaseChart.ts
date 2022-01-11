import { EventEmitter } from 'events'
import * as d3 from 'd3'
import { ScaleLinear } from 'd3-scale'
import _ from 'lodash'
import { Selection } from 'd3-selection'
import { getMinY, getMaxY, getYTicks, checkSingleDay, dateFormat } from '../../_util/chartUtil'

export interface IShape {
  draw?: (...args) => void
  scale?: (xz, tickValues?, context?) => void
  refresh?: (...args) => void
  reset?: (...args) => void
  destroy?: (...args) => void
}

let uid = 1
let circleUid = 1

export class BaseChart extends EventEmitter {
  svgDom: SVGSVGElement
  clipId: string = `clipId-${uid++}`
  circleClipId: string = `circleClipId-${circleUid++}`
  totalWidth: number
  totalHeight: number
  width: number
  height: number
  oldXData: string[] | number[] // 未处理过的
  xData: number[]
  yData: number[][]
  series: {name: string, unit: string}[]
  domain
  range
  options: Record<string, any>


  //d3
  svg: Selection<SVGSVGElement, any, any, any>
  gOut: Selection<SVGGElement, any, any, any>
  scaleX: ScaleLinear<number, number>

  beforeXIndex = -1
  hidedLineArray = []
  xIndex = -1

  constructor(svgDom, xData, yData, series, options) {
    super()
    this.options = this.handleOption(options)
    this.totalWidth = svgDom.clientWidth
    this.totalHeight = svgDom.clientHeight
    this.svgDom = svgDom
    this.oldXData = xData
    this.xData = xData
    this.yData = yData
    this.series = series || []
    this.svg = d3.select(svgDom)
    this.svg.attr('viewBox', `0 0 ${this.totalWidth} ${this.totalHeight}`)
  }

  init() {
    let margin = this.getOption().margin
    this.width = this.totalWidth - margin.left - margin.right
    this.height = this.getChartHeight()
    this.xData = this.getXData()
    this.initDomain()
    this.initRange()
    this.createScaleX()
    this.gOut = this.svg.append('g')
    this.gOut.attr('transform', `translate(${margin.left}, ${margin.top})`)
    this.gOut.append('rect').attr('x', 0).attr('y', 0).attr('width', this.width).attr('height', this.height).attr('fill', 'transparent')
    this.gOut.append('clipPath').attr('id', this.clipId).append('rect').attr('width', this.width).attr('height', this.height)
    this.gOut.append('clipPath')
      .attr('id', this.circleClipId)
      .attr('transform', `translate(-3, -3)`)
      .append('rect')
      .attr('width', this.width + 6)
      .attr('height', this.height + 6)
    this.initEvent()
  }

  refresh(xData, yData, series, options) {
    this.oldXData = xData
    this.options = this.handleOption(options)
    this.refreshData(xData, yData, series)
    this.render()
  }

  resize() {
    let margin = this.getOption().margin
    this.totalWidth = this.svgDom.clientWidth
    this.totalHeight = this.svgDom.clientHeight
    this.width = this.totalWidth - margin.left - margin.right
    this.height = this.getChartHeight()
    this.svg.attr('viewBox', `0 0 ${this.width + margin.left + margin.right} ${this.height + margin.top + margin.bottom}`)
    this.gOut.select('clipPath rect').attr('width', this.width).attr('height', this.height)
    this.gOut.select(`clipPath#${this.circleClipId} rect`)
      .attr('width', this.width + 6)
      .attr('height', this.height + 6)
    this.refreshData(this.oldXData, this.yData, this.series)
    this.render()
  }

  render() {
    this.renderPoint()
    this.renderXAxis()
    this.renderYAxis()
  }

  toggle(hidedLineArray) {
    this.hidedLineArray = hidedLineArray
    this.refreshData(this.oldXData, this.yData, this.series)
    this.render()
  }

  refreshData(xData, yData, series) {
    this.xData = this.getXData()
    this.yData = yData
    this.series = series || []
    this.initDomain()
    this.initRange()
    this.createScaleX()
    this.createScaleY(yData)
  }

  initEvent() {
    let handleMouseMove = _.debounce(this.handleMouseMove.bind(this), 5)
    this.gOut.on('mousemove', () => {
      let mouseInfo = d3.mouse(this.svg.node())
      handleMouseMove(mouseInfo)
    }).on('mouseleave', () => {
      setTimeout(() => {
        this.getStrokeLineShape().reset()
      }, 5)
      this.emit('xIndexChange', -1)
      this.xIndex = -1
      this.beforeXIndex = -1
    })
  }

  initDomain() {
    let options = this.getOption()
    let minY = getMinY(this.yData, this.hidedLineArray)
    if (options.startDate && options.endDate) {
      this.domain = [options.startDate, options.endDate]
    } else {
      this.domain = minY == null ? [] : [this.xData[0], this.xData[this.xData.length - 1]]
    }
  }

  initRange() {
    this.range = [this.getLeft(), this.width]
  }

  createScaleX() {
    this.scaleX = d3.scaleLinear().domain(this.domain).range(this.range)
  }

  createScaleY(yData) {
    throw new Error('override in subclass')
  }

  isDateTime() {
    //类型+长度判断
    return typeof this.oldXData?.[0] == 'string' && this.oldXData?.[0].length == 19
  }

  isShowScrollScaleArea() {
    return this.getOption().showScrollScaleArea
  }

  handleOption(options) {
    const newOptions = {
      ...options
    }
    if (!newOptions.dateFormat) {
      if (this.isDateTime()) {
        const isSingleDay = checkSingleDay(this.oldXData)
        newOptions.dateFormat = dateFormat(isSingleDay)
      } else {
        newOptions.dateFormat = d => d
      }
    }
    if (!newOptions.ticks) {
      newOptions.ticks = Math.floor(this.width / (options.tickWidth ?? this.getTickWidth()))
    }
    return newOptions
  }

  getOption(): Record<string, any> {
    return this.options
  }

  getTickWidth(): number {
    if (this.isDateTime()) {
      const isSingleDay = checkSingleDay(this.xData)
      return (isSingleDay ? 175 : 200)
    }
    return 150
  }

  /**
   * x、y轴交叉点离左边距离，排除margin.left，多y轴处理逻辑
   */
  getLeft() {
    return 0
  }

  // 不包括margin，底部ScrollScale部分
  getChartHeight() {
    let margin = this.getOption().margin
    return this.totalHeight - margin.top - margin.bottom
  }

  getScrollScaleHeight() {
    return 10
  }

  getMinY() {
    let minY = getMinY(this.yData, this.hidedLineArray)
    let initYRange = this.getOption().initYRange
    if (initYRange) {
      minY = Math.min(initYRange[0], minY)
    }
    return minY
  }

  getMaxY() {
    let maxY = getMaxY(this.yData, this.hidedLineArray)
    let initYRange = this.getOption().initYRange
    if (initYRange) {
      maxY = Math.max(initYRange[1], maxY)
    }
    return maxY
  }

  getYTickLength() {
    return 5
  }

  getYTickValues() {
    let min = this.getMinY()
    let max = this.getMaxY()
    if (min == max) {
      max++
    }
    return getYTicks(max, min, this.getYTickLength())
  }

  getXAxisShape(): IShape {
    throw new Error('override')
  }

  getYAxisShape(): IShape {
    throw new Error('override')
  }

  getStrokeLineShape(): IShape {
    throw new Error('override')
  }

  handleMouseMove(mouseInfo) {
    if (this.xData.length == 0) {
      return
    }
    let margin = this.getOption().margin
    let handleMouseX = this.getOption().handleMouseX
    let mouseX = (handleMouseX ? handleMouseX(mouseInfo[0]) : mouseInfo[0]) - margin.left

    let {xIndex, x} = this.getNearestInfo(mouseX)
    this.getStrokeLineShape().refresh(x)
    if (x < this.getLeft() || x > this.width) {
      this.getStrokeLineShape().reset()
    }
    if (xIndex == this.beforeXIndex) {
      return
    }
    this.emit('xIndexChange', xIndex)
    this.beforeXIndex = xIndex
  }

  getNearestInfo(mouseX) {
    if (mouseX < 0 || mouseX > this.width) {
      return {
        xIndex: -1,
        x: -1
      }
    }
    let bisect = d3.bisector<{n: number, index: number}, number>(d => d.n).left
    let xWidths = this.scaleX.call(this.xData)
    let sortList = xWidths
      .map((n, index) => ({n: Math.abs(n - mouseX), index})).sort((a, b) => a.n - b.n)
      .filter((item) => this.yData.find(yLine => yLine[item.index] != null) != undefined)
    if (sortList.length == 0) {
      return {
        xIndex: -1,
        x: -1
      }
    }
    let index = sortList[bisect(sortList, 0)].index
    return {
      xIndex: index,
      x: xWidths[index]
    }
  }

  getXData() {
    if (this.isDateTime()) {
      return (this.oldXData as string[]).map(item => +new Date(item))
    }
    return (this.oldXData as number[])
  }

  buildTip() {

  }

  refreshXAxis() {

  }

  renderXAxis() {
    this.getXAxisShape().draw()
  }

  renderYAxis() {
    this.getYAxisShape().draw()
  }

  renderPoint() {
  }

  destroy() {
    this.getXAxisShape().destroy()
    this.getYAxisShape().destroy()
    this.getStrokeLineShape().destroy()
  }
}
