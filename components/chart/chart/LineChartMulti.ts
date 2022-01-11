import * as d3 from 'd3'
import StrokeLineShape from '../shapes/StrokeLineShape'
import XAxisShape from '../shapes/XAxisShape'
import LineShapeMulti from '../shapes/LineShapeMulti'
import { checkSingleDay, getChartOption, getMaxY } from '../../_util/chartUtil'
import { ScaleLinear } from 'd3-scale'
import YAxisShapeMulti from '../shapes/YAxisShapeMulti'
import BaseLineChart from '../core/BaseLineChart'
import { isEmpty } from '../../_util/common'

export class LineChartMulti extends BaseLineChart {
  scaleYs: ScaleLinear<number, number>[] = []
  lineShapes: LineShapeMulti
  xAxisShape: XAxisShape
  yAxisShape: YAxisShapeMulti
  strokeLineShape: StrokeLineShape

  constructor(svg, xData, yData, series, options = {}) {
    super(svg, xData, yData, series, options)
    this.options = options
    super.init()
    this.createScaleY(yData)
    this.createShape()
    this.render()
    this.afterRender()
  }

  createShape() {
    const {dateFormat, axisColor, axisTextColor, axisFontSize} = this.getOption()
    this.strokeLineShape = new StrokeLineShape(this.gOut, this.height)
    this.xAxisShape = new XAxisShape(
      this.gOut,
      this.scaleX,
      dateFormat,
      this.calcTickValues(this.scaleX),
      `translate(0, ${this.height})`,
      {axisColor, axisTextColor, axisFontSize}
    )
    this.yAxisShape = new YAxisShapeMulti(this.gOut, this.getOption().getYAxisList(), this.series, this.scaleYs, (d: number) => {
      let maxY = getMaxY(this.yData, this.hidedLineArray)
      if (maxY == null) {
        return ''
      }
      return d.toString()
    }, this.width, {
      axisColor, axisTextColor, axisFontSize
    })
    this.lineShapes = new LineShapeMulti(this.gOut, this.xData, this.yData, this.scaleX, this.scaleYs, this.hidedLineArray, {
      getColor: this.getOption().getColor,
      chartUniqueId: this.getOption().chartUniqueId,
      yAxisList: this.getOption().getYAxisList(),
      clipId: this.clipId,
      circleClipId: this.circleClipId
    })
  }

  refreshData(xData, yData, series) {
    this.scaleYs = []
    super.refreshData(xData, yData, series)
    this.strokeLineShape.destroy()
    this.xAxisShape.destroy()
    this.yAxisShape.destroy()
    this.lineShapes.destroy()
    this.createShape()
  }

  createScaleY(yData) {
    this.getOption().getYAxisList().forEach((linesIndex) => {
      let minY = null, maxY = null
      linesIndex.forEach(index => {
        let data = yData[index]?.filter(i => !isEmpty(i)) || []
        if (data.length == 0) {
          return
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
      })
      let scaleY = d3.scaleLinear().domain(minY === null ? [] : [minY, maxY * 1.2]).range([this.height, 0])
      this.scaleYs.push(scaleY)
    })
  }

  getLeft() {
    let lines = this.getOption().getYAxisList()
    if (lines.length <= 2) {
      return 0
    }
    return (lines.length - 3) * 50 + this.getOption().margin.left
  }

  getXAxisShape(): XAxisShape {
    return this.xAxisShape
  }

  getYAxisShape(): YAxisShapeMulti {
    return this.yAxisShape
  }

  getLineShape(): LineShapeMulti {
    return this.lineShapes
  }

  getStrokeLineShape(): StrokeLineShape {
    return this.strokeLineShape
  }
}
