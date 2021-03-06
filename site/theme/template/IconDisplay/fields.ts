import * as AntdIcons from 'wanke-icon/lib/icons'

const all = Object.keys(AntdIcons)
  .map(n => n.replace(/(Outlined|Filled|TwoTone)$/, ''))
  .filter((n, i, arr) => arr.indexOf(n) === i)

const wanke:string[] = [

]

const gf:string[] = [

]

const fz:string[] = [

]

const direction = [
  'StepBackward',
  'StepForward',
  'FastBackward',
  'FastForward',
  'Shrink',
  'ArrowsAlt',
  'Down',
  'Up',
  'Left',
  'Right',
  'CaretUp',
  'CaretDown',
  'CaretLeft',
  'CaretRight',
  'UpCircle',
  'DownCircle',
  'LeftCircle',
  'RightCircle',
  'DoubleRight',
  'DoubleLeft',
  'VerticalLeft',
  'VerticalRight',
  'VerticalAlignTop',
  'VerticalAlignMiddle',
  'VerticalAlignBottom',
  'Forward',
  'Backward',
  'Rollback',
  'Enter',
  'Retweet',
  'Swap',
  'SwapLeft',
  'SwapRight',
  'ArrowUp',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'PlayCircle',
  'UpSquare',
  'DownSquare',
  'LeftSquare',
  'RightSquare',
  'Login',
  'Logout',
  'MenuFold',
  'MenuUnfold',
  'BorderBottom',
  'BorderHorizontal',
  'BorderInner',
  'BorderOuter',
  'BorderLeft',
  'BorderRight',
  'BorderTop',
  'BorderVerticle',
  'PicCenter',
  'PicLeft',
  'PicRight',
  'RadiusBottomleft',
  'RadiusBottomright',
  'RadiusUpleft',
  'RadiusUpright',
  'Fullscreen',
  'FullscreenExit'
]

const suggestion = [
  'Question',
  'QuestionCircle',
  'Plus',
  'PlusCircle',
  'Pause',
  'PauseCircle',
  'Minus',
  'MinusCircle',
  'PlusSquare',
  'MinusSquare',
  'Info',
  'InfoCircle',
  'Exclamation',
  'ExclamationCircle',
  'Close',
  'CloseCircle',
  'CloseSquare',
  'Check',
  'CheckCircle',
  'CheckSquare',
  'ClockCircle',
  'Warning',
  'IssuesClose',
  'Stop'
]

const editor = [
  'Edit',
  'Form',
  'Copy',
  'Scissor',
  'Delete',
  'Snippets',
  'Diff',
  'Highlight',
  'AlignCenter',
  'AlignLeft',
  'AlignRight',
  'BgColors',
  'Bold',
  'Italic',
  'Underline',
  'Strikethrough',
  'Redo',
  'Undo',
  'ZoomIn',
  'ZoomOut',
  'FontColors',
  'FontSize',
  'LineHeight',
  'Dash',
  'SmallDash',
  'SortAscending',
  'SortDescending',
  'Drag',
  'OrderedList',
  'UnorderedList',
  'RadiusSetting',
  'ColumnWidth',
  'ColumnHeight'
]

const data = [
  'AreaChart',
  'PieChart',
  'BarChart',
  'DotChart',
  'LineChart',
  'RadarChart',
  'HeatMap',
  'Fall',
  'Rise',
  'Stock',
  'BoxPlot',
  'Fund',
  'Sliders'
]

const logo = [
  'Android',
  'Apple',
  'Windows',
  'Ie',
  'Chrome',
  'Github',
  'Aliwangwang',
  'Dingding',
  'WeiboSquare',
  'WeiboCircle',
  'TaobaoCircle',
  'Html5',
  'Weibo',
  'Twitter',
  'Wechat',
  'Youtube',
  'AlipayCircle',
  'Taobao',
  'Skype',
  'Qq',
  'MediumWorkmark',
  'Gitlab',
  'Medium',
  'Linkedin',
  'GooglePlus',
  'Dropbox',
  'Facebook',
  'Codepen',
  'CodeSandbox',
  'CodeSandboxCircle',
  'Amazon',
  'Google',
  'CodepenCircle',
  'Alipay',
  'AntDesign',
  'AntCloud',
  'Aliyun',
  'Zhihu',
  'Slack',
  'SlackSquare',
  'Behance',
  'BehanceSquare',
  'Dribbble',
  'DribbbleSquare',
  'Instagram',
  'Yuque',
  'Alibaba',
  'Yahoo',
  'Reddit',
  'Sketch'
]

const datum = [...wanke, ...gf, ...fz, ...direction, ...suggestion, ...editor, ...data, ...logo]

const other = all.filter(n => !datum.includes(n))
  .filter(n => n.indexOf('Wanke') != 0)
  .filter(n => n.indexOf('Gf') != 0)
  .filter(n => n.indexOf('Fz') != 0)

export const categories = {
  wanke,
  gf,
  fz,
  direction,
  suggestion,
  editor,
  data,
  logo,
  other
}

export default categories

export type Categories = typeof categories;
export type CategoriesKeys = keyof Categories;
