import { BaseScaleChart } from './BaseScaleChart'
import { IShape } from './BaseChart'
import * as d3 from 'd3'

class BaseLineChart extends BaseScaleChart {
  getLineShape(): IShape {
    throw new Error('')
  }

  renderLine() {
    this.getLineShape().draw(this.clipId)
  }

  render() {
    super.render()
    this.renderLine()
  }

  zoomed() {
    super.zoomed()
    let xz = d3.event.transform.rescaleX(this.scaleX)
    this.getLineShape().scale(xz)
  }
}

export default BaseLineChart
