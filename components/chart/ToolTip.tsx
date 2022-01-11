import React, { useLayoutEffect, useRef } from 'react'
import ReactDom from 'react-dom'
import moment from 'moment'
import { GetColor } from '.'
import { isEmpty } from '../_util/common'

interface Props {
  dateFormat?: string | ((item) => string)
  left: number
  top: number
  xIndex: number
  hidedLineArray: number[]
  xData: any[]
  yData: any[][]
  series: any[]
  getColor?: GetColor
  noDataStr: string
}

const ToolTip: React.FC<Props> = function(this: null, props) {
  const ref = useRef<HTMLDivElement>()
  const getColorFn = props.getColor

  const getLineInfo = (lineIndex, pointIndex) => {
    let value = props.yData[lineIndex][pointIndex]
    let content = !isEmpty(value) ? value : props.noDataStr
    if (value != null) {
      content += (props.series[lineIndex].unit || '')
    }

    return (
      <>
        <span className={'wanke-chart-line-text-title'}>{props.series[lineIndex].name}：</span>
        <span className={'wanke-chart-line-text-value'}>{content}</span>
      </>
    )
  }

  useLayoutEffect(() => {
    let {clientWidth, clientHeight} = ref.current
    if (props.top + clientHeight > document.body.clientHeight) {
      let nextTop = props.top - clientHeight
      if (nextTop < 0) nextTop = 10
      ref.current.style.top = nextTop + 'px'
    }
    if (props.left + clientWidth > document.body.clientWidth) {
      ref.current.style.left = props.left - clientWidth + 'px'
    }
  }, [props.top, props.left])

  let child = (
    <div ref={ref} className={'wanke-chart-point-info-box'} style={{left: props.left, top: props.top}}>
      <div className={'wanke-chart-point-date'}>
        {
          typeof props.dateFormat == 'string' && moment(props.xData[props.xIndex]).format(props.dateFormat)
        }
        {
          typeof props.dateFormat == 'function' && props.dateFormat(props.xData[props.xIndex])
        }
      </div>
      {
        props.yData.map((item, lineIndex) => {
          if (props.hidedLineArray.indexOf(lineIndex) != -1) {
            return null
          }
          return (
            <div key={lineIndex} className={'wanke-chart-box-line'}>
              <div className={'wanke-chart-line-color-circle'}
                   style={{background: getColorFn(props.yData.length, lineIndex)}}>
              </div>
              <div className={'wanke-chart-line-text'}>
                {getLineInfo(lineIndex, props.xIndex)}
              </div>
            </div>
          )
        })
      }
    </div>
  )

  return ReactDom.createPortal(child, document.body)
}

ToolTip.defaultProps = {
  dateFormat: 'YYYY-MM-DD HH:mm:ss'
}

export default ToolTip
