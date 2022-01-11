import LineShape from './LineShape'
import { Item } from '../core/chartConstants'
import { IShape } from '../core/BaseChart'
import { GetColor } from '..'

export default class LineShapeMulti implements IShape {
  container: any
  xData: []
  yData: []
  shapes = []
  getColorFn: GetColor
  options: any

  constructor(container, xData, yData, scaleX, scaleYs, hidedLineArray, options: any = {}) {
    this.container = container
    this.getColorFn = options.getColor
    this.options = options
    this.xData = xData
    this.yData = yData
    for (let i = 0; i < yData.length; i++) {
      if (hidedLineArray.indexOf(i) != -1) {
        this.shapes.push(null)
        continue
      }
      let scaleY = scaleYs
      if (typeof scaleYs != 'function') {
        if (options.yAxisList) {
          let index = options.yAxisList.findIndex(item => item.indexOf(i) != -1)
          scaleY = scaleYs[index]
        } else {
          scaleY = scaleYs[i]
        }
      }
      let lineShape = new LineShape(container, scaleX, scaleY, options.clipId, options.circleClipId)
      this.shapes.push(lineShape)
    }
  }

  draw(clipId) {
    this.shapes.forEach((shape, i) => {
      if (shape == null) {
        return
      }
      let data = this.getLineData(i)
      shape.draw(data, this.getColorFn(this.yData.length, i), clipId, `url(#${this.options.chartUniqueId}-${i})`)
    })
  }

  getLineData(lineIndex): Item[] {
    return this.xData.map((item, index) => {
      return {x: item, y: this.yData[lineIndex][index]}
    })
  }

  scale(xz) {
    this.shapes.forEach(shape => {
      shape != null && shape.scale(xz)
    })
  }

  reset() {
    this.shapes.forEach(shape => {
      shape != null && shape.reset()
    })
  }

  destroy() {
    this.shapes.forEach(shape => {
      shape != null && shape.destroy()
    })
  }
}
