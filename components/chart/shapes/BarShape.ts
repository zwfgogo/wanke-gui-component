import { Selection } from 'd3-selection'
import { IShape } from '../core/BaseChart'
import { GetColor } from '..'

export default class BarShape implements IShape {
  options: any
  xData: any[]
  yData: any[]
  scaleX: any
  scaleY: any
  barContainer: Selection<any, any, any, any>
  path: Selection<any, any, any, any>
  getColorFn: GetColor

  constructor(container, scaleX, scaleY, clipId, options: any = {}) {
    this.options = options
    this.getColorFn = options.getColor
    this.scaleX = scaleX
    this.scaleY = scaleY
    this.barContainer = container.append('g').attr('clip-path', `url(#${clipId})`)
  }

  draw(context, xData, yData) {
    this.xData = xData
    this.yData = yData
    const {width, diff, count = 1, currentIndex = 0, barIndex = 0} = context
    let padWidth = Math.min(3, width * 0.1)

    this.barContainer.selectAll('rect.bar').data(xData).enter().append('rect')
      .attr('class', 'bar')
      .attr('x', (_, i) => this.scaleX(xData[i]) - ((count + 1) / 2 - (barIndex + 1)) * width / count - width / count / 2 + padWidth)
      .attr('y', (_, i) => {
        let d = yData[currentIndex][i]
        if (d === 0) {
          return this.scaleY(diff / 200)
        }
        if (d < 0) {
          return this.scaleY(0)
        }
        return this.scaleY(d || 0)
      })
      .attr('width', width / count - padWidth * 2)
      .attr('height', (_, i) => {
        let d = yData[currentIndex][i]
        if (d === null) {
          return 0
        }
        if (d === 0) {
          return this.scaleY(diff - diff / 200)
        }
        if (d > 0) {
          return this.scaleY(0) - this.scaleY(d)
        }
        return this.scaleY(d) - this.scaleY(0)
      })
      .attr('fill', () => {
        if (this.options.getColor2) {
          return `url(#${this.options.chartUniqueId}-${currentIndex})`
        }
        return this.options.getColor(yData.length, currentIndex)
      })
  }

  scale(xz, tickValues, context) {
    let xData = this.xData
    let yData = this.yData
    const {width, diff, count = 1, currentIndex = 0, barIndex = 0} = context
    let padWidth = Math.min(4, width * 0.1)

    let xList = []

    this.barContainer.selectAll('rect.bar')
      .attr('x', (_, i) => {
        let x = xz(xData[i]) - ((count + 1) / 2 - (barIndex + 1)) * width / count - width / count / 2 + padWidth
        xList.push(xz(xData[i]))
        return x
      })
      .attr('y', (_, i) => {
        let d = yData[currentIndex][i]
        if (d === 0) {
          return this.scaleY(diff / 200)
        }
        if (d < 0) {
          return this.scaleY(0)
        }
        return this.scaleY(d || 0)
      })
      .attr('width', width / count - padWidth * 2)
  }

  reset() {

  }

  destroy() {
    this.barContainer.remove()
  }
}
