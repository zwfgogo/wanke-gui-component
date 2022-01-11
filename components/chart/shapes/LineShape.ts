import * as d3 from 'd3'
import { Item } from '../core/chartConstants'
import { Selection } from 'd3-selection'
import { IShape } from '../core/BaseChart'
import { isEmpty } from '../../_util/common'

export default class LineShape implements IShape {
  line: any
  area: any
  container: Selection<any, any, any, any>
  lines: Selection<any, any, any, any>
  circles: Selection<any, any, any, any>
  backGrounds: Selection<any, any, any, any>
  scaleX: any
  scaleY: any
  data: Item[]
  lineData: Item[][]
  circleData: Item[]

  constructor(container, scaleX, scaleY, clipId, circleClipId) {
    this.container = container
    this.lines = container.append('g').attr('class', 'lines').attr('stroke-width', 2).attr('clip-path', `url(#${clipId})`)
    this.backGrounds = container.append('g').attr('class', 'backGrounds').attr('clip-path', `url(#${clipId})`)
    this.circles = container.append('g').attr('class', 'circles').attr('clip-path', `url(#${circleClipId})`)
    this.scaleX = scaleX
    this.scaleY = scaleY
    this.line = d3.line<Item>().x(d => scaleX(d.x)).y((d) => scaleY(d.y))
    this.area = d3.area<Item>().x0(d => scaleX(d.x)).y0(d => scaleY(d.y)).x1(d => scaleX(d.x)).y1(scaleY(0))
  }

  getSubLine(data, start, end) {
    let subLine = []
    for (let j = start; j <= end; j++) {
      subLine.push(data[j])
    }
    return subLine
  }

  draw(data, color, clipId, fill) {
    data = data?.filter(item => item.y != 'ph')
    this.data = data
    let emptyIndexList = []
    data.forEach((item, index) => {
      if (isEmpty(item.y)) {
        emptyIndexList.push(index)
      }
    })
    let lines = []
    let circles = []
    for (let i = 0; i < emptyIndexList.length - 1; i++) {
      let start = emptyIndexList[i]
      let end = emptyIndexList[i + 1]
      if (end - start == 2) {
        circles.push(data[start + 1])
      } else if (end - start > 2) {
        lines.push(this.getSubLine(data, start + 1, end - 1))
      }
    }
    if (emptyIndexList.length == 0) {
      if (data.length > 1) {
        lines.push(data)
      } else if (data.length === 1) {
        circles.push(data[0])
      }
    }
    if (emptyIndexList[0] > 1) {
      lines.push(this.getSubLine(data, 0, emptyIndexList[0] - 1))
    } else if (emptyIndexList[0] === 1) {
      circles.push(data[0])
    }
    if (emptyIndexList[emptyIndexList.length - 1] < data.length - 2) {
      lines.push(this.getSubLine(data, emptyIndexList[emptyIndexList.length - 1] + 1, data.length - 1))
    } else if (emptyIndexList[emptyIndexList.length - 1] === data.length - 2) {
      circles.push(data[data.length - 1])
    }
    this.lineData = lines
    this.circleData = circles
    this.lines.selectAll('path').data(lines).enter().append('path')
      .attr('stroke', color)
      .attr('fill', 'none')
      .attr('d', (d) => {
        return this.line(d)
      })

    this.circles.selectAll('circle').data(circles).enter().append('circle')
      .attr('cx', (d: Item) => this.scaleX(d.x))
      .attr('cy', (d: Item) => this.scaleY(d.y || 0))
      .attr('r', 2)
      .attr('fill', '#fff')
      .attr('stroke', color)

    this.backGrounds.selectAll('path').data(lines).enter().append('path')
      .attr('stroke', 'none')
      .style('fill', fill)
      .attr('d', (d, index) => {
        return this.area(d)
      })
  }

  scale(xz) {
    let line1 = this.line.x(d => xz(d.x))
    let area1 = this.area.x(d => xz(d.x))
    this.lines.selectAll('path').attr('d', (d) => {
      return line1(d)
    })
    this.backGrounds.selectAll('path').attr('d', (d) => {
      return area1(d)
    })
    this.circles.selectAll('circle')
      .attr('cx', (d: Item) => xz(d.x))
  }

  reset() {

  }

  destroy() {
    this.lines.remove()
    this.backGrounds.remove()
    this.circles.remove()
  }
}
