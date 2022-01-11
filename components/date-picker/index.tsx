import React from 'react'
import AntdDatePicker from 'antd/lib/date-picker'
import { DatePickerProps } from 'antd/lib/date-picker'
import { WankeDateNewOutlined } from 'wanke-icon'
// import { RangePicker, ConfigProvider } from '../index'
import RangePicker from '../range-picker/RangePicker'
import ConfigProvider from '../antd-config-provider'
import zhCN from 'antd/es/date-picker/locale/zh_CN';
import moment from 'moment'
import 'moment/locale/zh-cn'

const { ConfigConsumer, LocaleReceiver  } = ConfigProvider
const { MonthPicker, WeekPicker, YearPicker, TimePicker } = AntdDatePicker

interface localeType {
    lang: { locale: string },
}

class DatePicker extends React.Component<DatePickerProps>{
    static RangePicker: any
    static TimePicker: any
    static YearPicker: any
    static WeekPicker: any
    static MonthPicker: any

    render() {
        return (<ConfigConsumer>
            {
                ({ getPrefixCls, direction }) => (
                    <LocaleReceiver componentName="DatePicker">
                        {
                            (locale: localeType) => {
                                if(locale.lang && locale.lang.locale === "zh_CN") moment.locale('zh-cn')
                                else moment.locale('en')
                                return <AntdDatePicker {...this.props} locale={locale.lang && locale.lang.locale === "zh_CN" ? zhCN : undefined} suffixIcon={<WankeDateNewOutlined />} />
                            }
                        }
                    </LocaleReceiver>
                )
            }
        </ConfigConsumer>
            
        )
    }

}

DatePicker.MonthPicker = MonthPicker;
DatePicker.WeekPicker = WeekPicker;
DatePicker.YearPicker = YearPicker;
DatePicker.TimePicker = TimePicker;
DatePicker.RangePicker = RangePicker;

export default DatePicker