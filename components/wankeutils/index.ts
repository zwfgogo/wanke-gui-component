/**
 * 解决zoom缩放下， edge的属性值获取不准的问题。
 * @param selector dom选择器或者dom元素
 * @param zoomGrowNumber zoom缩放比的倒数
 *
 */

import eq from './eq';

interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

function getRect(selector: string | HTMLElement, zoomGrowNumber: number = 1): Rect {
  let domRect = {
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  };
  if (typeof selector === 'string') {
    const element = document.querySelector(selector);
    if (!!element) {
      domRect = element.getBoundingClientRect();
    }
  } else if (selector) {
    domRect = (selector as HTMLElement).getBoundingClientRect();
  }
  return {
    top: domRect.top * zoomGrowNumber,
    left: domRect.left * zoomGrowNumber,
    width: domRect.width * zoomGrowNumber,
    height: domRect.height * zoomGrowNumber,
  };
}

function SetTimeout(func: any, times: number) {
  //上一次数组
  let lastArgs: any = [];
  // @ts-ignore
  let lastThis;
  let calledOnce = false;
  return function() {
    let _len = arguments.length;
    let newArgs = new Array(_len);
    let _key = 0;
    for (_len; _key < _len; _key++) {
      newArgs[_key] = arguments[_key];
    }
    // eslint-disable-next-line block-scoped-var
    //如果没有新的参数进来，则执行函数；
    setTimeout(() => {
      //判断两个条件是否相同，以及当前的作用于是否存在；

      // @ts-ignore
      if (calledOnce && lastThis === this && eq(lastArgs, newArgs) && 1) {
        // @ts-ignore
        func.apply(this, lastArgs);
      }
    }, times);
    lastArgs = newArgs;
    // @ts-ignore
    lastThis = this;
    calledOnce = true;
  };
}

// 全角数字、符号转换半角
const formatSBC = (val: any) => {
  const MAP: any = {
    '０': '0',
    '１': '1',
    '２': '2',
    '３': '3',
    '４': '4',
    '５': '5',
    '６': '6',
    '７': '7',
    '８': '8',
    '９': '9',
    '．': '.',
    '。': '.',
    '＋': '+',
    '－': '-',
    '＊': '*',
    '×': '*',
    '、': '/',
    '／': '/',
    '＝': '=',
  };
  return val.replace(new RegExp(Object.keys(MAP).join('|'), 'g'), (v: any) => MAP[v]);
};
/**
 * 数字格式化
 * @param {(number|string)} v - 需要处理的值
 * @param {Object} option object - 参数选项
 * @param {Object} option.precision - 小数精度位数
 * @param {Object} option.maxDigit - 可输入的最大位数
 * @param {Object} option.enableMinus - 是否允许负数
 * @returns {string} value
 */
const numberFormat = (v: any, option = { precision: 2, maxDigit: 9, enableMinus: false }) => {
  const { precision, maxDigit, enableMinus } = option;

  const reg = enableMinus ? /(?!^-)[^.|\d]/g : /[^.|\d]/g;
  // 全角转换为半角，去掉除多余的 “-”
  let r = formatSBC(`${v}`).replace(reg, '');
  // 格式化 '00.' 类似连续 0 开头输入
  r = r.replace(/^(-?)(0)(0*)(.*)/g, '$1$2$4');
  // 数字格式化，整数取前 maxDigit 位，小数取 precision 位
  return r.replace(
    new RegExp(`(-?\\d{0,${maxDigit}})(\\d*)(\\.?)(\\d{0,${precision}})(.*)`),
    '$1$3$4',
  );
};
// 金额数字添加千分符
const thousandFix = (v: any) => {
  const r = `${v}`;
  if (r.indexOf('.') !== -1) {
    v;
    return r.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
  }
  return r.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
// 移除千分符、
const thousandRemove = (v: any) => `${v}`.replace(/(,*)/g, '');
const each = function(arr: any[], fn: Function) {
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    let result = fn(arr[i], i);
    if (result === false) {
      break;
    }
  }
};

interface transformKeyParams {
  data: Array<any>;
  key: string;
  addkey?: string;
  names: Array<any>;
}

const transformKey = function(params: transformKeyParams) {
  let { data: _data, key, addkey } = params;
  let data = JSON.parse(JSON.stringify(_data));
  addkey = addkey || '';
  let dataOpt: any = {};
  each(data, (elem: any) => {
    let temp = { ...elem };
    // 如果是 null 方法会报错
    if (elem[key] !== null && elem[key] !== undefined) {
      let exist = dataOpt[elem[key].toString()];
      const newkey = addkey + elem[key].toString();
      if (exist) {
        if ({}.toString.call(exist).indexOf('Object') > -1) {
          dataOpt[newkey] = [exist, temp];
        } else if ({}.toString.call(exist).indexOf('Array') > -1) {
          dataOpt[newkey] = exist.push(temp);
        }
      } else {
        dataOpt[newkey] = temp;
      }
    }
  });
  return dataOpt;
};
const unique = function(arr: any) {
  return Array.from(new Set(arr));
};
const delFromArrByIndex = function(arr: any, index: any) {
  // 如果obj里面有时间对象，则JSON.stringify后再JSON.parse的结果，时间将只是字符串的形式。而不是时间对象
  // 如果obj里有RegExp、Error对象，则序列化的结果将只得到空对象
  // 如果obj里有函数，undefined，则序列化的结果会把函数或 undefined丢失；
  // 如果obj里有NaN、Infinity和-Infinity，则序列化的结果会变成null
  // JSON.stringify()只能序列化对象的可枚举的自有属性，例如 如果obj中的对象是有构造函数生成的， 则使用JSON.parse(JSON.stringify(obj))深拷贝后，会丢弃对象的constructor；
  // 如果对象中存在循环引用的情况也无法正确实现深拷贝；
  const arr2 = JSON.parse(JSON.stringify(arr));
  arr2.splice(index, 1);
  return arr2;
};
export default {
  each,
  getRect,
  SetTimeout,
  numberFormat,
  thousandFix,
  thousandRemove,
  transformKey,
  unique,
  delFromArrByIndex,
};
