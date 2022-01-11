/**
 *  增加区间长度限制的功能 maxLength 为number类型
 */
import React, { useState, useEffect, useRef } from 'react'
import { DatePicker } from 'antd'
import { Moment } from 'moment'
import { WankeDateNewOutlined } from 'wanke-icon'
import { RangePickerProps } from 'antd/lib/date-picker'
import classnames from 'classnames'

const AntdRangePicker = DatePicker.RangePicker

type Props = RangePickerProps & {
  maxLength?: number
  value?: Moment[]
  disabledDate?: (current: Moment, info: 'start' | 'end') => boolean
  showTime: any
}

const RangePicker: React.FC<Props> = function(this: null, props) {
  const {
    maxLength,
    disabledDate,
    onCalendarChange,
    value,
    onOpenChange,
    className,
    dropdownClassName,
    showTime,
    ...restProps
  } = props
  const [realValue, setRealValue] = useState(value || [])
  const [showViewDate, setShowViewDate] = useState(false)
  const [viewDates, setViewDates] = useState(value || [])
  const firstSelectRef = useRef(true)

  const handleDisabledDate1 = (current: Moment) => {
    if (!viewDates || viewDates.length === 0) {
      return disabledDate?.(current, 'start')
    }
    const targetDate = viewDates[0] || viewDates[1]
    const tooLate = targetDate && current.diff(targetDate, 'days') > (maxLength - 1)
    const tooEarly = targetDate && targetDate.diff(current, 'days') > (maxLength - 1)
    return disabledDate?.(current, 'end') || tooEarly || tooLate
  }

  const handleCalendarChange = (value, formatStringm, info) => {
    let newValue = value
    if (info.range === 'end') {
      firstSelectRef.current = false
    } else {
      newValue = value.slice(0,1)
    }
    setViewDates(newValue)
    onCalendarChange && onCalendarChange(value, formatStringm, info)
  }

  const handleOpenChange = (flag, ...arg) => {
    if (flag) {
      firstSelectRef.current = true
    }
    setShowViewDate(flag)
    onOpenChange && onOpenChange(flag)
  }

  const handleChange = (value, formatString) => {
    if (firstSelectRef.current) return
    const nextValue = value || []
    setRealValue(nextValue)
    props.onChange && props.onChange(nextValue, formatString)
  }

  useEffect(() => {
    setRealValue(value)
  }, [value])

  useEffect(() => {
    if (!showViewDate) {
      setViewDates(realValue)
    }
  }, [showViewDate, realValue])

  if (showTime) {
    return <AntdRangePicker showTime {...props} />
  }

  return (
    <AntdRangePicker
      {...restProps}
      className={classnames(className, 'wanke-range-picker')}
      dropdownClassName={classnames(dropdownClassName, {
        'wanke-range-picker-no-select-range': viewDates?.length === 2
      })}
      onChange={handleChange}
      onOpenChange={handleOpenChange}
      value={(showViewDate ? viewDates : realValue) as any}
      disabledDate={(props.disabledDate || props.maxLength) ? handleDisabledDate1 : undefined}
      onCalendarChange={handleCalendarChange}
      suffixIcon={<WankeDateNewOutlined />}
    />
  )
}

export default RangePicker
