import { IShape } from '../core/BaseChart'

export default class Multi implements IShape {
  shapes: IShape[] = []

  constructor(barShapes) {
    this.shapes = barShapes
  }

  draw(context, ...args) {
    let barIndex = 0
    let {hideList} = context
    let count = this.shapes.filter(item => item != null).filter((item, index) => hideList?.indexOf(index) == -1).length
    this.shapes.forEach((shape, index) => {
      if (hideList?.indexOf(index) != -1) {
        return
      }
      context = {
        ...context,
        count,
        currentIndex: index,
        barIndex: barIndex
      }
      if (shape != null) {
        barIndex++
      }
      shape?.draw(context, ...args)
    })
  }

  scale(xz, tickValues, context) {
    let {hideList} = context
    let barIndex = 0
    let count = this.shapes.filter(item => item != null).filter((item, index) => hideList?.indexOf(index) == -1).length
    this.shapes.forEach((shape, index) => {
      if (hideList.indexOf(index) != -1) {
        return
      }
      context = {
        ...context,
        count,
        currentIndex: index,
        barIndex: barIndex
      }
      if (shape != null) {
        barIndex++
      }
      shape?.scale(xz, tickValues, context)
    })
  }

  reset() {
    this.shapes.forEach(shape => {
      shape?.reset()
    })
  }

  destroy() {
    this.shapes.forEach(shape => {
      shape?.destroy()
    })
  }
}
