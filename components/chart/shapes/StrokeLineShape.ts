import { Selection } from 'd3-selection'
import { IShape } from '../core/BaseChart'

export default class StrokeLineShape implements IShape {
  container: Selection<any, any, any, any>
  path: Selection<any, any, any, any>
  linePath: Selection<any, any, any, any>

  constructor(container, height) {
    this.container = container
    this.path = container.append('g').attr('id', 'point-info-box').attr('fill', '#fff')
    this.linePath = this.path.append('line')
      .attr('y1', 0)
      .attr('y2', height)
      .attr('stroke', '#aaa')
      .attr('stroke-dasharray', 5)
      .attr('display', 'none')
  }

  refresh(x) {
    if (x == -1) {
      this.linePath.attr('display', 'none')
      return
    }
    this.linePath.attr('x1', x).attr('x2', x).attr('display', 'initial')
  }

  reset() {
    this.linePath.attr('display', 'none')
  }

  destroy() {
    this.path.remove()
  }
}
