import { FormInstance, Rule } from 'antd/lib/form'
import { CSSProperties } from 'react'

export type ValidationRule = Rule

export interface BasicProps {
  name?: string
  label?: string
  rules?: ValidationRule[]
  disabled?: boolean
  style?: CSSProperties
}

/**
 * form属性类型
 */
export interface FormComponentProps {
  form: FormInstance
}

export interface ValueName {
  value: string | number
  name: string
}
