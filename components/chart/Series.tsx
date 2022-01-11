import React  from 'react'
import classnames from 'classnames'
import { GetColor } from '.'
import HorizontalScrollList from '../scroll-list'

const ScrollItem = HorizontalScrollList.ScrollItem

interface Props {
  type: 'line' | 'bar' | ((index) => string)
  series: any[]
  hidedLineArray: number[]
  toggle: (index) => void
  getColor?: GetColor
}

const Series: React.FC<Props> = function(this: null, props) {
  const getColorFn = props.getColor

  const unitList = []
  props.series.forEach(item => {
    if (unitList.indexOf(item.unit) === -1) {
      unitList.push(item.unit)
    }
  })

  return (
    <div className={classnames('wanke-chart-labels', {'wanke-chart-center': unitList.length > 1})}>
      <HorizontalScrollList position={unitList.length > 1 ? 'center' : 'right'}>
        {
          props.series.map((item, index) => {
            let type
            if (typeof props.type == 'function') {
              type = props.type(index)
            } else {
              type = props.type
            }
            let isHide = props.hidedLineArray.indexOf(index) != -1
            const color = getColorFn(props.series.length, index)
            return (
              <ScrollItem key={item.name + index} label={item.name}>
                <div key={index}
                     className={classnames('wanke-chart-label', {'wanke-chart-hide': isHide})}
                     onClick={() => props.toggle(index)}
                     style={item.name ? {} : {display: 'none'}}
                >
                  {
                    type == 'line' && (
                      <div
                        className={'wanke-chart-line-series-shape'}
                        style={{background: isHide ? '#aaa' : getColorFn(props.series.length, index)}}>
                        <div className={'wanke-chart-circle'} style={{borderColor: isHide ? '#aaa' : getColorFn(props.series.length, index)}}></div>
                      </div>
                    )
                  }
                  {
                    type == 'bar' && (
                      <div
                        className={'wanke-chart-bar-series-shape'}
                        style={{background: isHide ? '#aaa' : getColorFn(props.series.length, index)}}>
                      </div>
                    )
                  }

                  {item.name}
                </div>
              </ScrollItem>
            )
          })
        }
      </HorizontalScrollList>
    </div>
  )
}

export default Series
