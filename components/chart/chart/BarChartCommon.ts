import * as d3 from 'd3'
import { ScaleLinear } from 'd3-scale'
import StrokeLineShape from '../shapes/StrokeLineShape'
import YAxisShape from '../shapes/YAxisShape'
import BaseBarChart from '../core/BaseBarChart'
import { checkSingleDay, getMaxY, getTickValues, getTickValues1, getVisibleTickValues } from '../../_util/chartUtil'
import BarShape from '../shapes/BarShape'
import XAxisShapeMulti from '../shapes/XAxisShapeMulti'
import { IShape } from '../core/BaseChart'
import Multi from '../shapes/Multi'

export class BarChartCommon extends BaseBarChart {
  scaleY: ScaleLinear<number, number>
  barShapes: Multi
  xAxisShapes: IShape
  yAxisShape: YAxisShape
  strokeLineShape: StrokeLineShape

  constructor(svg, xData, yData, series, options = {}) {
    super(svg, xData, yData, series, options)
    this.options = options
    this.init()
    this.createScaleY()
    this.createShape()
    this.render()
    this.afterRender()
  }

  getTickWidth(): number {
    if (this.isDateTime()) {
      const isSingleDay = checkSingleDay(this.xData)
      return (isSingleDay ? 120 : 150)
    }
    return 120
  }

  createShape() {
    this.createXAxisShape()
    let yTickValues = this.getYTickValues()
    const {axisColor, axisTextColor, axisFontSize} = this.getOption()
    this.yAxisShape = new YAxisShape(this.gOut, this.scaleY,
      {
        unit: this.series[0]?.unit,
        left: this.getLeft(),
        tickValues: yTickValues,
        tickFormat: (d: number) => {
          let maxY = getMaxY(this.yData, this.hidedLineArray)
          if (maxY == null) {
            return ''
          }
          return d.toString()
        },
        direction: 'left',
        axisColor, axisTextColor, axisFontSize
      })
    this.createBarShape()
    this.strokeLineShape = new StrokeLineShape(this.gOut, this.height)
  }

  createBarShape() {
    let barShapes = []
    this.yData.forEach((_) => {
      barShapes.push(
        new BarShape(this.gOut, this.scaleX, this.scaleY, this.clipId, this.getOption())
      )
    })
    this.barShapes = new Multi(barShapes)
  }

  createXAxisShape() {
    let yTickValues = this.getYTickValues()
    const {axisColor, subAxisColor, axisTextColor, axisFontSize} = this.getOption()

    this.xAxisShapes = new XAxisShapeMulti(
      this.gOut,
      this.scaleX,
      this.scaleY,
      {
        tickValues: this.calcTickValues(this.scaleX),
        yTickValues: yTickValues,
        dateFormat: this.getOption().dateFormat,
        axisColor, axisTextColor, axisFontSize, subAxisColor,
        width: this.width,
        left: this.getLeft(),
        height: this.height
      }
    )
  }

  refreshData(xData, yData, series) {
    super.refreshData(xData, yData, series)
    this.strokeLineShape.destroy()
    this.xAxisShapes.destroy()
    this.yAxisShape.destroy()
    this.barShapes.destroy()
    this.createShape()
  }

  createScaleY() {
    let ticks = this.getYTickValues()
    this.scaleY = d3
      .scaleLinear()
      .domain(ticks == null ? [] : [ticks[0], ticks[ticks.length - 1]])
      .range([this.height, 0])
  }

  calcTickValues(xz) {
    if (this.options.tickValues && this.xData.length) {
      return getVisibleTickValues(this.options.tickValues, xz, this.range, this.options.ticks)
    }
    let tickValues
    if (this.isDateTime()) {
      tickValues = getTickValues(xz, this.domain, this.range, this.getOption().ticks)
    } else {
      tickValues = getTickValues1(xz, this.domain, this.range, this.getOption().ticks)
    }
    let newValues = new Set()
    tickValues.forEach(item => {
      let bisect = d3.bisector<number, number>(d => d).left
      let index = bisect(this.xData, item)
      if (this.xData[index]) {
        newValues.add(this.xData[index])
      }
    })
    return Array.from(newValues)
  }

  getXAxisShape(): IShape {
    return this.xAxisShapes
  }

  getYAxisShape(): YAxisShape {
    return this.yAxisShape
  }

  getBarShape(): IShape {
    return this.barShapes
  }

  getStrokeLineShape(): StrokeLineShape {
    return this.strokeLineShape
  }
}
