import * as d3 from 'd3'
import { ScaleLinear } from 'd3-scale'
import StrokeLineShape from '../shapes/StrokeLineShape'
import YAxisShape from '../shapes/YAxisShape'
import BaseLineChart from '../core/BaseLineChart'
import LineShapeMulti from '../shapes/LineShapeMulti'
import { getMaxY } from '../../_util/chartUtil'
import XAxisShapeMulti from '../shapes/XAxisShapeMulti'
import { IShape } from '../core/BaseChart'

export class LineChartCommon extends BaseLineChart {
  scaleY: ScaleLinear<number, number>
  lineShapes: LineShapeMulti
  xAxisShape: IShape
  yAxisShape: YAxisShape
  strokeLineShape: StrokeLineShape

  constructor(svg, xData, yData, series, options = {}) {
    super(svg, xData, yData, series,options)
    this.init()
    this.createScaleY()
    this.createShape()
    this.render()
    this.afterRender()
  }

  createShape() {
    let yTickValues = this.getYTickValues()
    let {dateFormat, axisColor, subAxisColor, axisTextColor, axisFontSize} = this.getOption()
    this.strokeLineShape = new StrokeLineShape(this.gOut, this.height)
    this.xAxisShape = new XAxisShapeMulti(
      this.gOut,
      this.scaleX,
      this.scaleY,
      {
        tickValues: this.calcTickValues(this.scaleX),
        yTickValues,
        dateFormat,
        axisColor,
        axisTextColor,
        axisFontSize,
        subAxisColor,
        width: this.width,
        left: this.getLeft(),
        height: this.height
      })
    this.yAxisShape = new YAxisShape(this.gOut, this.scaleY, {
      unit: this.series[0]?.unit,
      tickValues: yTickValues,
      tickFormat: (d: number) => {
        let maxY = getMaxY(this.yData, this.hidedLineArray)
        if (maxY == null) {
          return ''
        }
        return d.toString()
      },
      left: 0,
      direction: 'left',
      axisColor,
      axisTextColor,
      axisFontSize
    })
    this.lineShapes = new LineShapeMulti(this.gOut, this.xData, this.yData, this.scaleX, this.scaleY, this.hidedLineArray, {
      getColor: this.options.getColor,
      chartUniqueId: this.options.chartUniqueId,
      clipId: this.clipId,
      circleClipId: this.circleClipId
    })
  }

  refreshData(xData, yData, series) {
    super.refreshData(xData, yData, series)
    this.strokeLineShape.destroy()
    this.xAxisShape.destroy()
    this.yAxisShape.destroy()
    this.lineShapes.destroy()
    this.createShape()
  }

  createScaleY() {
    let ticks = this.getYTickValues()
    this.scaleY = d3
      .scaleLinear()
      .domain(ticks === null ? [] : [ticks[0], ticks[ticks.length - 1]])
      .range([this.height, 0])
  }

  getXAxisShape(): IShape {
    return this.xAxisShape
  }

  getYAxisShape(): YAxisShape {
    return this.yAxisShape
  }

  getLineShape(): LineShapeMulti {
    return this.lineShapes
  }

  getStrokeLineShape(): StrokeLineShape {
    return this.strokeLineShape
  }
}
