import LineChart from './LineChart'
import MultiLineChart from './MultiLineChart'
import BarChart from './BarChart'
import BarAndLineChart from './BarAndLineChart'
import PieChart from './PieChart'

let uuid = 1

export interface GradientColor {
  '0%': string,
  '100%': string,

  [key: string]: string,
}

export interface AxisOption {
  left: number
  tickValues: number[]
  axisColor: string
  axisTextColor: string
  axisFontSize: number
  subAxisColor?: string
}

export interface XAxisOption extends AxisOption {
  dateFormat: any
  height: number
  width: number
  yTickValues: number[]
}

export interface YAxisOption extends AxisOption {
  direction: string
  unit: string
  tickFormat: any
}

export type GetColor = (count: number, index: number) => string
export const getUniqueId = () => {
  return uuid++
}

export {
  LineChart,
  MultiLineChart,
  BarChart,
  BarAndLineChart,
  PieChart
}
