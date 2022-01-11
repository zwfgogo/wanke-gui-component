import { BaseScaleChart } from './BaseScaleChart'
import { IShape } from './BaseChart'
import { getMaxY, getMinY } from '../../_util/chartUtil'
import * as d3 from 'd3'

/**
 * 同时支持折线和柱状图
 */
class BaseCommonChart extends BaseScaleChart {
  getBarShape(): IShape {
    throw new Error('override')
  }

  getLineShape(): IShape {
    throw new Error('')
  }

  createScaleX() {
    if (this.xData.length == 0) {
      this.scaleX = d3.scaleLinear().domain([]).range([this.getLeft(), this.width])
      return
    }
    let min = this.xData[0]
    let max = this.xData[this.xData.length - 1]
    let temp = d3.scaleLinear().domain([min, max]).range([this.getLeft(), this.width])
    let diff = temp.invert(this.getLeft() + this.getBarWidth() * 2) - temp.invert(this.getLeft())
    this.scaleX = d3.scaleLinear().domain([min - diff, max + diff]).range([this.getLeft(), this.width])
  }

  getBarWidth() {
    return Math.floor(this.width / this.xData.length / 3)
  }

  zoomed() {
    this.transform = d3.event.transform // 保存当前的transform
    let xz = d3.event.transform.rescaleX(this.scaleX)
    super.zoomed()
    this.getBarShape().scale(xz, this.getBarWidth() * this.transform.k)
    this.getLineShape().scale(xz)
  }

  buildBar() {
    let maxY = getMaxY(this.yData, this.hidedLineArray)
    let minY = getMinY(this.yData, this.hidedLineArray)
    if (this.xData.length == 0) {
      return
    }
    let barWidth = this.width / this.xData.length / 3
    this.getBarShape().draw({}, maxY - minY, barWidth, this.xData, this.yData)
  }

  buildLine() {
    this.getLineShape().draw(this.clipId)
  }

  render() {
    this.buildBar()
    this.buildLine()
    super.render()
  }

  destroy() {
    super.destroy()
    this.getBarShape().destroy()
  }
}

export default BaseCommonChart
