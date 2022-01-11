import * as d3 from 'd3'
import { BaseScaleChart } from './BaseScaleChart'
import { IShape } from './BaseChart'

class BaseBarChart extends BaseScaleChart {
  createScaleX() {
    if (this.xData.length == 0) {
      this.scaleX = d3.scaleLinear().domain([]).range([this.getLeft(), this.width])
      return
    }
    let temp = d3.scaleLinear().domain(this.domain).range(this.range)
    let min = this.domain[0]
    let max = this.domain[1]
    let diff = temp.invert(this.getLeft() + this.getBarWidth()) - temp.invert(this.getLeft())
    this.scaleX = d3.scaleLinear().domain([min - diff, max + diff]).range([this.getLeft(), this.width])
  }

  handleOption(options): any {
    let newOptions = super.handleOption(options)
    if (newOptions.startDate && !newOptions.tickValues) {
      console.warn('BarChart添加startDate时，请同时添加tickValues，以保证柱子宽度计算正确')
    }
    return newOptions
  }

  getBarWidth() {
    let length = this.getOption().tickValues?.length || this.xData.length
    if (this.yData.length - this.hidedLineArray.length > 1) {
      return Math.floor(this.width / length / 1.5)
    }
    return Math.floor(this.width / length / 1.5)
  }

  zoomed() {
    this.transform = d3.event.transform // 保存当前的transform
    let xz = d3.event.transform.rescaleX(this.scaleX)
    super.zoomed()
    let ticks = this.getYTickValues() || []
    let maxY = ticks[ticks.length - 1]
    let minY = ticks[0]
    let barWidth = this.getBarWidth()
    this.getBarShape().scale(xz, ticks, {
      hideList: this.hidedLineArray, diff: maxY - minY, width: barWidth * this.transform.k
    })
  }

  getBarShape(): IShape {
    throw new Error('override')
  }

  renderBar() {
    let ticks = this.getYTickValues() || []
    let maxY = ticks[ticks.length - 1]
    let minY = ticks[0]
    if (this.xData.length == 0) {
      return
    }
    let barWidth = this.getBarWidth()
    this.getBarShape().draw({hideList: this.hidedLineArray, diff: maxY - minY, width: barWidth}, this.xData, this.yData)
  }

  render() {
    this.renderBar()
    super.render()
  }

  destroy() {
    super.destroy()
    this.getBarShape().destroy()
  }
}

export default BaseBarChart
