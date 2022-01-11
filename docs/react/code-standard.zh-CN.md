---
order: 11
title: 前端代码规范
toc: false
---
#前端代码规范

###代码规范参考模块 basic-station，推荐使用函数式组件

- 单文件不建议超过300行，超过800行将触发webpack打包失败
- 组件统一大写开头
- 被注释的无用代码删除
- 包含Page的组件统一添加后缀Page
- 文件夹、scss文件、less文件，使用a-b的形式
- js、ts文件统一使用单引号，jsx字符串属性使用双引号
- 不使用分号结束
- 变量不能使用拼音
- 接口请求，使用http方法，默认取返回值得results
- 不要使用modalTitle作为对话框新增、编辑的判断，使用mode属性，比如：mode == Mode.add
- 函数参数中如果有没有使用的变量，请使用 '_' 作为其名称，比如 function (_ // 没有使用的参数, list){}
- 需要在发布时候动态替换的变量，代码中请使用 replace-string-xx 的形式， 参考replace-string部分

### git
- 不允许 git push --force
- 配置不忽略大小写： git config --global core.ignorecase false
- 支持 //local 注释，添加此注释将进行提交检查，主要场景是避免本地的临时赋值或调试代码被提交，通过添加 //local 将在提交前提醒删除此注释

每次提交只关注一个问题，不同问题分多次提交

提交代码添加前缀：
- ui：ui调整
- api: 接口参数调整
- feature：新的特性。函数、组件添加了新的参数、功能、属性等
- fix： 修复bug或问题
- optimize： 优化
- change：需求变动等、文案调整
- new: 新需求、新特性
- update： 更新代码，正在开发新功能
- refactor：重构
- style： 代码格式化
-. test: 添加单元测试

后缀：
没有完成的添加：（未完成）

### jsx
-  ？ : 的形式改成 && 的形式

### 常见问题代码模式
- 子页面返回父页面数据刷新问题： onActivity被废弃，使用onNeedUpdate和parentPageNeedUpdate配合完成
- makeModal提供了reset用于初始化重置modal、afterListItemDelete 用于列表删除返回第一页的逻辑

### table
- 自动处理滚动条和充满容器：Table1不分页，Table2分页
- 默认宽度1050，实际宽度小于1050，将出现滚动条，可以修改 x 属性让滚动条不出现
- columns 给每一列都设置width，值为number类型，总的width不要超过x
- 通过设置env文件中的showWidthInfo为true，将开启表格列的自动计算，提示剩余可用宽度

### form表单
受控表单组件： antd提供的是非受控组件，灵活性不够，可以使用自己封装的TextItem、NumberItem、SelectItem等

### mock数据
devTools文件提供了：
1. 先请求server，失败后再请求mock的实现
2. 先请求mock，失败后请求server的实现
修改http文件中的代码，可以实现不同请求方式
http函数提供了mockData属性，用于自定义mock数据

### icon 图标
统一从wanke-icon中引入。启动wanke-gui-component项目，可以找到对应图标
如何添加新的svg图标：
- clone 项目 https://github.com/jiangyukun/wanke-icon
- 根路径下面有个svg文件夹，outlined图标放入outlined目录中，filled图标放入filled中
- package 版本号+1，将代码提交并推送
- 执行yarn build
- 执行npm publish

### 导出excel
导出csv请使用exportCSV方法
在启动dev服务的时候， 添加auto-column注释，自动生成导出的column定义， 参考客户管理（basic-customer） List1组件
当出现导出cvs出现bug时，检查下是否导入文件被加密

### antd v4
Modal组件的确定按钮加载中效果使用属性 confirmLoading 而不是loading

### typescript
项目中不应该出现typescript类型错误
常用类型 在 interface/CommonInterface目录下查看

### bug
导入bug请注意文件是否加密
导出cvs表头只支持一行，不同于excel

### replace-string （部署时动态替换）
在下面注册使用的 字符串，序号递增
replace-string-01 (vpp socket 使用)
replace-string-static-host (外部静态资源 使用)

### 单元测试
单元测试可以更大程度保证代码正确性，避免新功能影响原有逻辑
部分情况下可以提高开发效率，修复bug时可以不用启动web服务器，页面操作等步骤，直接对单模块进行测试
不同模块的测试方案不太一样，如下
1. 工具函数
2. 组件
3. model
>其中工具函数的单元测试最简单，组件和model的测试比较麻烦。
>组件层测试需要使用enzyme，test-utils等工具，组件树依赖比较复杂，需要做部分依赖模块的mock处理，核心函数 jest.mock。

