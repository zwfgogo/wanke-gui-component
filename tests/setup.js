/* eslint-disable global-require */
import { JSDOM } from 'jsdom';

// fixed jsdom miss
if (typeof window !== 'undefined') {
  const documentHTML = '<!doctype html><html><body</body></html>';
  global.document = new JSDOM(documentHTML); // 模拟 document 对象
  global.window = document.parentWindow; // 模拟 window 对象
}

global.requestAnimationFrame =
  global.requestAnimationFrame ||
  function(cb) {
    // 处理兼容 添加 requestAnimationFrame 动画函数
    return setTimeout(cb, 0);
  };

if (typeof window !== 'undefined') {
  global.window.resizeTo = (width, height) => {
    global.window.innerWidth = width || global.window.innerWidth;
    global.window.innerHeight = height || global.window.innerHeight;
    global.window.dispatchEvent(new Event('resize'));
  };
  global.window.scrollTo = () => {};
}

// The built-in requestAnimationFrame and cancelAnimationFrame not working with jest.runFakeTimes()
// https://github.com/facebook/jest/issues/5147
global.requestAnimationFrame = cb => setTimeout(cb, 0);
global.cancelAnimationFrame = cb => clearTimeout(cb, 0);

const Enzyme = require('enzyme');

let Adapter;
if (process.env.REACT === '15') {
  Adapter = require('enzyme-adapter-react-15'); // eslint-disable-line
} else {
  Adapter = require('enzyme-adapter-react-16');
}

Enzyme.configure({ adapter: new Adapter() });
