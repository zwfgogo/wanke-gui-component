---
category: 网站性能
order: 12
title: 代码切割
---

## 路由按需加载

路由配置文件

```
  [{
    // path：路由的地址；
    path:'/home/customer',
    //  async：通过异步加载路由组件；webpackChunkName：切割出来的js的文件名；'../pages/customer': 文件入口路径
    async: () => import(/*webpackChunkName: "customer" */'../pages/customer'),
  },]
```

<img src='/images/109479FD546E7BB6843C2EB7512E60EF.jpg'/>

## 皮肤按需加载

## 语言按需加载
