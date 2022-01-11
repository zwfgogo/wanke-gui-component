---
category: 工具
order: 1
title: 自动生成click id
---

由于目前的框架发展，原生的 html id 属性使用的很少，元素失去了唯一标识属性，导致测试使用自动化工具模拟点击操作时，没有一个有效的获取对应 dom 节点的方案，所以前端需要给可点击元素添加唯一 id 手动添加 id 是一个方案，缺点是需要重复同样的工作，也不能保证 id 的唯一性，自动生成唯一 id 也是一个可实现方案

---

所以在此给出一个自动生成可点击元素 click id 的方案目前前端框架基本使用的是 webpack，js、ts 文件使用 babel-loader 转换，所以解决入口就是 webpack 和 babel webpack 和 babel 的插件开发都比较容易

## 方案

首先需要对 ast 有一点了解，可以了解下 acorn、esprima、 [recast](https://segmentfault.com/a/1190000016231512) 等框架 [Babel 插件手册](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md)

1. 刚开始想到的是自定义 webpack 插件，内部有个 ast 相关的钩子，实践后发现这里拿到的 ast 是 loader 处理完成后的，并不是源码，而且这里主要是查询 ast 结构，而不是修改，放弃这个方案。

如何使用[webpack 钩子](https://www.webpackjs.com/api/compiler-hooks/#%E7%9B%91%E5%90%AC-watching-)

#### webpack 查询 ast 结构相关代码

```
class SetClickIdPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap('SetClickIdPlugin', (compilation, {normalModuleFactory}) => {
      const handle = (parser) => {
        parser.hooks.program.tap('SetClickIdPlugin', (ast) => {
          walk.simple(ast, {
            CallExpression(node) {
              if (node.callee.type == 'MemberExpression') {
                if (node.callee.object.name == 'React') {
                  //
                }
              }
            }
          })
        })
      }
      normalModuleFactory.hooks.parser.for('javascript/auto').tap('SetClickIdPlugin', handle)
    })
  }
}
```

一个更好的方案是自定义 babel 插件，babel 是源码处理的入口，能同时处理 js 和 ts，babel 内置了很多 plugin 和 preset，preset 是 plugin 的集合

plugin 返回一个包含 visitor 对象的 object，这里可以获取你需要的 ast 结构，参数以 path 传递。

具体代码如下

```
const t = require('@babel/types')

let fileUId = 10
const fileAndIdList = []

// babel 插件格式
function setDataClickId(api, options) {
  //配置文件中传入的options
  const clickElements = options.clickElements
  //visitor模式匹配对应的ast语法结构
  return {
    visitor: {
      Program(path) {
        let moduleName = this.file.opts.filename
        let currentFileId
        const match = fileAndIdList.find(item => item.filepath == moduleName)
        if (match) {
          currentFileId = match.fileId
        } else {
          currentFileId = fileUId++
          fileAndIdList.push({
            filepath: moduleName,
            fileId: currentFileId
          })
        }
        let clickUId = 1

        // 遍历ast树，找到jsx元素，判断是否需要添加click id
        // click id生成规则 每个文件有一个唯一id，每个文件内需要添加click id属性的自增
        path.traverse({
          JSXOpeningElement(jsxPath) {
            let node = jsxPath.node
            const match = clickElements.find(ele => ele === node.name.name)
            // 判断是否需要添加，默认为button、Button
            if (!match) {
              return
            }
            if (!node.attributes) {
              node.attributes = []
            }
            for (let attr of node.attributes) {
              if (attr.name.name == 'data-clickId') {
                return
              }
            }
            // 使用@babel/types工具 添加对应的属性
            node.attributes.push(
              t.jsxAttribute(t.jsxIdentifier('data-clickId'), t.stringLiteral(currentFileId + clickUId.toString().padStart(2, '0')))
            )
            clickUId++
          }
        })
      }
    }
  }
}
module.exports = setDataClickId

```

至此，一个简单的自动生成 id 的方案完成了，目前使用的 id 规则是[文件 id]+[元素 id]，并不能保证 id 一直保持不变

这里只是实现了第一步，还有很多问题需要处理，如果 button 组件被封装过，多个业务组件使用这个封装的组件，click id 可能一样 click id 生成后如何保持不变，尽量保持测试代码不变
