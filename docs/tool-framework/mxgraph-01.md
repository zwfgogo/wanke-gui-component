---
category: mxgraph
order: 1
title: mxgraph入门
---

mxgraph 是一个绘图框架，官方有很多基于 mxgraph 的 demo，实现类似 visio 的效果，流程图是它主要的一个用途，

mxgraph 只实现了画图最核心的功能，其他 demo 都是基于 mxgraph 二次开发的，mxgraph 和 demo 的代码量都非常多，通常一个文件就有好几千行，因此功能也是很复杂的

mxgraph 之前是一个收费的软件，后来开源了，能兼容 ie8 等比较老的浏览器，因此代码中也有很多处理兼容性的代码，在主流浏览器中使用 svg 实现绘图，但代码中使用了 canvas 作为变量，可能容易误以为是 canvas 来实现的。

代码中使用大量的 prototype，也有很多类有继承关系，理解起来并没有那么容易，后面有使用 es6 的 class 进行了转化，把 es5 的 prototype 转化为 es6 的方式。还有 this 指向问题，代码中有大量的函数进行了处理，导致代码也不太容易理解，整体来说，想看懂和理解这些代码还是需要一定的基础和能力。

目前我们使用的是 mxgraph 4.0.2 这个版本来开发和学习，使用的是 grapheditor 这个基于 mxgraph 二次开发的 demo 来做修改，demo 已经可以完成图形的拖拽，放大、缩小，属性编辑等一系列的操作，比较适合我们目前的需求。
