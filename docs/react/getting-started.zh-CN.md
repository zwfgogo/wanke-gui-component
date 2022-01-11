---
order: 1
title: 快速上手开发组件
---

wanke-gui 致力于提高万克前端小组的开发效率。让每个人的劳动成果得以分享、传承、检验。在此，希望大家能在封装组件过程中体会开发的乐趣，在相互提需求过程中不断切磋，共同进步。

---

## 第一个例子

可以参考 withCon

### 1. 在 components 下面新建一个文件夹，用来存放你需要开发的组件

### 2.在你新建的文件夹增加 index.zh-CN.md

```
category: Components
title: withCon //组件名称
subtitle: 返回一个react组件 //组件后追加的描述
type: 工厂组件 //所属类别
```

### 3. 增加组件文件 index.js，完成组件开发，并且在 components 下的 index.tsx 中导出

```
export { default as withCon } from './withcon';

```

### 4. 在 index.zh-CN.md 同级增加一个 demo 文件夹，用来存放演示例子，进行初步测试。

demo 文件夹里面，一个 md 表示一个 demo。里面可以写 jsx。引入组件采用

```
import { withCon } from 'wanke-gui';

```

### 5. 如何模拟请求

utils.mockData 函数返回的是一个 promise，默认返回的是的表格数据；如果传参，返回的数据将是传入的参数

```
import { utils} from 'wanke-gui';
utils.mockData();
```

### 6.如何发布公共组件，引入平台项目使用

1. npm 账号 wanke2022，密码 Xixi2022 运行 npm adduser
2. 修改 package 中的 version 字段
3. 然后直接在组件库下运行 yarn pub
4. 在 CHANGELOG.zh-CN.md 文件中增加发布日志

### 7.如何发布 vscode 插件

1. npm i vsce -g
2. vsce login wanke2023 使用 token： ixqzctus7qmajfzhitu6vkfv75d4pszgy4k4sy4z3cbuow4ghura
3. vsce publish 版本号

## 关于版本号约定

如果新增加一个组件，那么在第二位加一，如果修复 bug，在第三位加一。
