import React, { useEffect, ReactNode, ReactElement, useState } from 'react';
import { AutoSizer } from '..';
import { CaretLeftOutlined, CaretRightOutlined } from 'wanke-icon';

interface ScrollItemProps {
  label: string
  changeWidth?: (width: number, index: number) => void
  index?: number
}

const ScrollItem: React.FC<ScrollItemProps> = (props) => {
  const ref = React.createRef<HTMLDivElement>()

  useEffect(() => {
    props.changeWidth?.(ref.current.offsetWidth, props.index)
  }, [props.label, props.index])

  useEffect(() => {
    return () => {
      props.changeWidth?.(0, props.index)
    }
  }, [])

  return (
    <div className="wanke-horizontal-scroll-item" ref={ref}>
      {props.children}
    </div>
  )
}

const PositionStyleMap = {
  'left': 'flex-start',
  'center': 'center',
  'right': 'flex-end'
}

interface Props {
  width: number;
  children?: any;
  position?: string;
}

class ScrollList extends React.Component<Props> {
  childWidthList = []
  ref = React.createRef<HTMLDivElement>()
  curScrollLeft = 0
  curIndex = 0
  prevIsScroll = false
  constructor(props) {
    super(props);
    this.state = {};
  }

  // 重置布局
  reset = () => {
    if (this.ref.current?.style) {
      this.ref.current.style.left = 'unset'
      this.curScrollLeft = 0
      this.curIndex = 0
    }
  }

  // 更新子节点宽度
  changeWidth = (width, index) => {
    this.childWidthList[index] = width
    this.reset()
    this.forceUpdate()
  }

  handleScroll = (type) => {
    const width = this.props.width
    let sumWidth = 0
    let targetIndex = this.curIndex
    if (type === 'prev') {
      if (this.curIndex <= 0) return
      // 向上翻页需要从上个子节点开始计算宽度
      for (let i = this.curIndex - 1; i >= 0; i--) {
        if (width > sumWidth + this.childWidthList[i]) {
          sumWidth += this.childWidthList[i]
          targetIndex = i
        } else {
          break;
        }
      }
      sumWidth = -sumWidth
    } else {
      if (this.curIndex >= this.childWidthList.length - 1) return
      // 向上翻页需要从当前子节点开始计算宽度
      for (let i = this.curIndex; i < this.childWidthList.length; i++) {
        if (width > sumWidth + this.childWidthList[i]) {
          sumWidth += this.childWidthList[i]
          targetIndex = i + 1
        } else {
          break;
        }
      }
      // 如果下个需要展示的图例超出整体长度，说明不需要翻页
      if (targetIndex >= this.childWidthList.length) return
    }
    this.curIndex = targetIndex
    this.curScrollLeft = this.childWidthList
      .slice(0, targetIndex)
      .reduce((prev, next) => prev + next, 0)
    this.ref.current.style.left = -this.curScrollLeft + 'px'
    console.log(this.curScrollLeft, this.curIndex)
  }

  isScroll = () => {
    return this.props.width && this.props.width < this.childWidthList.reduce((prev, next) => prev + next, 0)
  }

  componentDidUpdate() {
    // 从滚动变为不滚动的状态的时候 重置布局
    const isScroll = this.isScroll()
    if (this.prevIsScroll && !isScroll) {
      this.reset()
    }
    this.prevIsScroll = isScroll
  }

  render() {
    const { position = 'right' } = this.props
    const showScroll = this.isScroll()

    return (
      <>
        <div className={`wanke-horizontal-scroll-list`} style={showScroll ? {} : { justifyContent: PositionStyleMap[position] }}>
          <div ref={this.ref} style={{ position: 'absolute', width: 'max-content' }}>
            {React.Children.map(this.props.children, (child: ReactElement<ScrollItemProps>, index) => (
              React.cloneElement(child, { changeWidth: this.changeWidth, index })
            ))}
          </div>
        </div>
        {showScroll && (
          <div className="wanke-horizontal-scroll-menu">
            <CaretLeftOutlined style={{ cursor: 'pointer', color: 'currentColor' }} onClick={() => this.handleScroll('prev')} />
            <CaretRightOutlined style={{ cursor: 'pointer', color: 'currentColor' }} onClick={() => this.handleScroll('next')} />
          </div>
        )}
      </>
    )
  }
}

class HorizontalScrollList extends React.Component<Omit<Props, 'width'>> {
  static ScrollItem: React.FC<ScrollItemProps>

  render() {
    return (
      <AutoSizer style={{ overflow: 'visible' }}>
        {
          ({ width }) => (
            <ScrollList width={width} {...this.props}>
              {this.props.children}
            </ScrollList>
          )
        }
      </AutoSizer>
    )
  }
}

HorizontalScrollList.ScrollItem = ScrollItem

export default HorizontalScrollList
