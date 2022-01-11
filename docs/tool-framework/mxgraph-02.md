---
category: mxgraph
order: 2
title: mxgraph代码结构分析
---

打开源码，找到 js 目录，下面有 8 个文件夹，核心类 mxGraph 处于 view 文件夹下，我们外部使用的很多 api 都在这个文件内，这个文件超过一万行，api 较多，比如初始化函数 init，内部会绑定鼠标的事件、把画布渲染到指定容器内。整个渲染过程交给了 mxGraphView 这个类。

mxGraph 对象包含了一个 modal、一个 view、多个 handle，modal 内包含了各种形状的数据

handle 文件夹内包含了处理鼠标事件的类，比如鼠标选中、图形放大、缩小、鼠标拖动选中多个图形效果等

layout 包含了处理图形展示的类，各种布局方式，树形布局、圆形布局等，这部分目前不太需要关心。

shape 文件夹下包含了常见的形状、正方形、圆形、椭圆、多边形、还可以自定义各种形状、基类 mxShape
