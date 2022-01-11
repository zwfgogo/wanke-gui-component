import React, { useState, useRef, useLayoutEffect } from 'react';
import { Popover } from 'antd';
import { TooltipPlacement } from 'antd/lib/tooltip';

interface Props {
  children: any;
  placement: TooltipPlacement;
  containerWidth?: number | (() => number);
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  bubble?: boolean | 'none';
}

function Bubble(props: Props) {
  const { children, placement, getPopupContainer, containerWidth, bubble } = props;
  const [overflow, setOverflow] = useState(false);
  const [newContainerWidth, setnewContainerWidth] = useState(0);
  const containerEl: any = useRef(null);
  const contentEl: any = useRef(null);

  // 判断是否溢出父元素 以及设置span的最大宽度
  const isPopOver = () => {
    return (
      {}.toString.call(children).indexOf('Object') > -1 &&
      children.type &&
      children.type.name === 'Popover'
    );
  };
  const containerStyle: React.DetailedHTMLProps<any, any> = {
    display: 'inline-block',
    width: '100%',
    overflow: overflow ? 'hidden' : '',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    verticalAlign: 'middle',
    wordBreak: 'break-word',
  };
  useLayoutEffect(() => {
    function isOverflow() {
      let temp;
      const contentWidth = contentEl.current.getBoundingClientRect().width;
      // temp = containerEl.current.getBoundingClientRect().width;
      const containerDom = containerEl.current.parentNode;

      if (containerWidth) {
        if (typeof containerWidth === 'number') {
          setnewContainerWidth(containerWidth);
          return contentWidth > containerWidth;
        }
        temp = (containerWidth as any)();
        setnewContainerWidth(temp);
        return contentWidth > temp;
      }
      const containerDomStyle = window.getComputedStyle(containerDom);
      if (!!containerDomStyle) {
        temp =
          containerDom.getBoundingClientRect().width -
          parseFloat(containerDomStyle.paddingLeft || '0') -
          parseFloat(containerDomStyle.paddingRight || '0');
        setnewContainerWidth(temp);
        return contentWidth > temp;
      }
      return false;
    }
    if (overflow === false) {
      const flag = isOverflow();
      if (bubble !== 'none') {
        if (flag && !overflow) {
          setOverflow(true);
        } else if (!flag && overflow) {
          setOverflow(false);
        }
      }
    }
  });

  // 如果子元素是Popover
  if (isPopOver()) {
    const {
      props: { children: popchildren, ...otherProps },
    } = children;
    // 子元素不用判断是否溢出
    if (bubble === 'none') {
      return (
        <span style={containerStyle} ref={containerEl}>
          <span ref={contentEl}>{children}</span>
        </span>
      );
    }
    // 如果子元素溢出
    if (overflow === true) {
      return (
        <Popover {...otherProps} getPopupContainer={getPopupContainer}>
          <span style={containerStyle} ref={containerEl}>
            <span ref={contentEl}>{popchildren}</span>
          </span>
        </Popover>
      );
    }
    // 子元素不溢出
    return (
      <span style={containerStyle} ref={containerEl}>
        <span ref={contentEl}>{popchildren}</span>
      </span>
    );
  }
  // 子元素溢出 并且指定气泡展示
  if (overflow === true && bubble) {
    return (
      <Popover
        content={
          <div style={{ width: newContainerWidth + 20, wordBreak: 'break-word' }}>{children}</div>
        }
        placement={placement}
        getPopupContainer={getPopupContainer}
      >
        <span style={containerStyle} ref={containerEl}>
          <span ref={contentEl}>{children}</span>
        </span>
      </Popover>
    );
  }
  // 子元素默认展示
  return (
    <span
      style={containerStyle}
      ref={containerEl}
      title={overflow && typeof children === 'string' ? children : ''}
    >
      <span ref={contentEl}>{children}</span>
    </span>
  );
}

export default Bubble;
