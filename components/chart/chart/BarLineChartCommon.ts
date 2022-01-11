import * as d3 from 'd3'
import { ScaleLinear } from 'd3-scale'
import StrokeLineShape from '../shapes/StrokeLineShape'
import { checkSingleDay, getChartOption, getMaxY, getTickValues } from '../../_util/chartUtil'
import BarShape from '../shapes/BarShape'
import XAxisShape from '../shapes/XAxisShape'
import { IShape } from '../core/BaseChart'
import BaseCommonChart from '../core/BaseCommonChart'
import LineShapeMulti from '../shapes/LineShapeMulti'
import YAxisShapeMulti from '../shapes/YAxisShapeMulti'
import Multi from '../shapes/Multi'
import { isEmpty } from '../../_util/common'

export class BarLineChartCommon extends BaseCommonChart {
  scaleYs: ScaleLinear<number, number>[] = []
  barShapes: Multi
  lineShapes: LineShapeMulti
  xAxisShapes: IShape
  yAxisShape: YAxisShapeMulti
  strokeLineShape: StrokeLineShape

  constructor(svg, xData, yData, series, options = {}) {
    super(svg, xData, yData, series, options)
    this.options = options
    this.init()
    this.createScaleY(yData)
    this.createShape()
  }

  getOption() {
    const isSingleDay = checkSingleDay(this.xData)
    let singleWidth = this.options.tickWidth || (isSingleDay ? 120 : 150)
    return getChartOption(this.options, isSingleDay, this.width, Math.floor(this.width / singleWidth))
  }

  createShape() {
    const {tickValues, ticks, axisColor, axisTextColor, axisFontSize} = this.getOption()
    if (this.yData.every(item => item.filter(d => d != null).length == 0)) {
      this.xAxisShapes = new XAxisShape(this.gOut, this.scaleX,
        this.getOption().dateFormat, this.getBarTickValues(this.scaleX), `translate(0, ${this.height})`,
        {axisColor, axisTextColor, axisFontSize})
    } else {
      // this.xAxisShapes = new XAxisShapeMulti(
      //   this.gOut,
      //   this.scaleX,
      //   this.scaleYs[0],
      //   getMinY(this.yData, this.hidedLineArray),
      //   this.getOption().dateFormat,
      //   tickValues ? getCustomTickValues(tickValues, this.scaleX, this.range, ticks) : this.getBarTickValues(this.scaleX),
      //   this.getOption())
    }
    this.yAxisShape = new YAxisShapeMulti(this.gOut, this.getOption().getYAxisList(), this.series, this.scaleYs, (d: number) => {
      let maxY = getMaxY(this.yData, this.hidedLineArray)
      if (maxY == null) {
        return ''
      }
      return d.toString()
    }, this.width, {
      axisColor, axisTextColor, axisFontSize
    })
    let barShapes = []
    this.yData.forEach((_, index) => {
      if (this.getOption().types[index] == 'bar') {
        barShapes.push(
          new BarShape(this.gOut, this.scaleX, this.scaleYs[0], this.clipId, {getColor: this.options.getColor})
        )
      } else {
        barShapes.push(null)
      }
    })
    this.barShapes = new Multi(barShapes)
    this.lineShapes = new LineShapeMulti(
      this.gOut,
      this.xData,
      this.yData.map((item, index) => this.getOption().types[index] == 'line' ? item : []),
      this.scaleX, this.scaleYs[1], this.hidedLineArray,
      {
        getColor: this.options.getColor,
        chartUniqueId: this.options.chartUniqueId,
        clipId: this.clipId,
        circleClipId: this.circleClipId
      }
    )
    this.strokeLineShape = new StrokeLineShape(this.gOut, this.height)
  }

  refreshData(xData, yData, series) {
    this.scaleYs = []
    super.refreshData(xData, yData, series)
    this.strokeLineShape.destroy()
    this.xAxisShapes.destroy()
    this.yAxisShape.destroy()
    this.barShapes.destroy()
    this.lineShapes.destroy()
    this.createShape()
  }

  getLeft() {
    return 0
  }

  createScaleY(yData) {
    this.scaleYs.push(this._createScaleY('bar', yData))
    this.scaleYs.push(this._createScaleY('line', yData))
  }

  _createScaleY(type, yData) {
    let filterYData = yData.filter((_, index) => this.getOption().types[index] == type) || []
    let minY, maxY
    for (let item of filterYData) {
      let data = item.filter(i => !isEmpty(i))
      if (data.length == 0) {
        continue
      } else {
        if (!minY || minY > Math.min(...data)) {
          minY = Math.min(...data)
        }
        if (!maxY || maxY < Math.max(...data)) {
          maxY = Math.max(...data)
        }
      }
      if (minY == 0 && maxY == 0) {
        maxY = 1
      }
      if (minY > 0) {
        minY = 0
      }
    }
    return d3.scaleLinear().domain(minY == null ? [] : [minY, maxY * 1.2]).range([this.height, 0])
  }

  refreshXAxis() {
    let xz = this.scaleX
    if (this.transform) {
      xz = this.transform.rescaleX(this.scaleX)
    }
    this.getXAxisShape().scale(xz, this.getBarTickValues(xz))
  }

  getBarTickValues(xz) {
    let tickValues = getTickValues(xz, this.domain, this.range, this.getOption().ticks)
    let newValues = new Set()
    tickValues.forEach(item => {
      let bisect = d3.bisector<number, number>(d => d).left
      let index = bisect(this.xData, item)
      newValues.add(this.xData[index])
    })
    return Array.from(newValues)
  }

  getXAxisShape(): IShape {
    return this.xAxisShapes
  }

  getYAxisShape(): IShape {
    return this.yAxisShape
  }

  getBarShape(): IShape {
    return this.barShapes
  }

  getLineShape(): IShape {
    return this.lineShapes
  }

  getStrokeLineShape(): StrokeLineShape {
    return this.strokeLineShape
  }
}
