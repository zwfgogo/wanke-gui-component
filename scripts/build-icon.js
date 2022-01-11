let path = require('path');
let fs = require('fs');

let buildIcon = require('wanke-tools/lib/svg-to-antd-component').default;

try {
  fs.mkdirSync(path.join(process.cwd(), 'wanke-icon'));
  fs.mkdirSync(path.join(process.cwd(), 'wanke-icon/fill'));
  fs.mkdirSync(path.join(process.cwd(), 'wanke-icon/outline'));
  fs.mkdirSync(path.join(process.cwd(), 'wanke-icon/twotone'));
} catch (e) {
  //
}

buildIcon({
  src: path.join(__dirname, '../components/icon/svg'),
  dist: path.join(__dirname, '../wanke-icon'),
});
