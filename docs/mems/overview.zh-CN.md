---
category: 前端和 node 层中交互
order: 1
title: 前端接口请求
---

ems2 后台管理系统遵循纯函数的设计理念，在组件内部渲染的时候不会产生副作用，以及组件的行为都通过 dispatch 派发来处理。

#### 相比于 react 的组件提供的 setState ，dispatch 有什么优点

- setState 是异步的，dispatch 是同步。只要 dispatch 执行之后，后面通过 getState 拿到的数据都是最新的。而 setState 只有在回调里面拿数据才能确保是最新的。回调的形式来会导致代码上过于嵌套。
- 数据和组件解耦。有些数据的处理，需要接口返回来之后才能改变。setState 依赖于组件，如果接口数据回来的时候组件已经卸载，就会导致代码报错。而 dispatch 并不会受业务组件生命周期的影响。

## 数据容器

每个 Route/NuomiRoute/Nuomi 组件都会创建 store 实例。每个 store，在没有给定 id 的情况下，会动态创建 store 的 id。

## 哪里可以派发

- 在路由提供的钩子函数 onInit、onChange 中调用

```
effects: {
  async getUser() {
    const data = await services.getInfo();
    this.updateState(data);
  }
},
onChange: {
  getList() {
    this.store.dispatch({
      ...
    })
  }
},
onInit() {
  this.store.dispatch({
    type: 'getUser'
  })
}
```

- effects 对象内部

effects 内部可以访问到 dispatch，也可以调用 effects 中的其他方法。

```
effects: {
  updateState(payload) {
      this.dispatch({
        type: '_updateState',
        payload,
      });
  },
  updateQuery() {
    // 当前的this指向的就是store
    const { query } = this.getState();
    // 这里的updateState指向的就是上面的updatState
    this.updateState({
      query: {...query,...payload}
    })
  }
}
```

- 组件内部

通过 connect， 可以使组件内部获取 props

```
import {Input} from 'wanke-gui';
import {connnect} from 'nuomi';
function App({dispatch}) {
  const changeSearch=(type,value)=>{
    dispatch({
      type: 'updateQuery',
      payload: {
        [type]: value
      }
    })
  }
  // 可以拿到diapatch
  return (
    <Input onChange={(e)=>{changeSearch(e.target.name, e.target.value)}} name='search'/>

  );
}
connect()(App);
```

## 派发的是什么

派发的是一个对象

```
{
  type: string
  payload: object Object
}
```

## 派发到哪里

默认派发到当前的组件所在的 store。如果需要派发到指定 store，可以在 type 中加上 store 的 id

```
// 改变global下的面包屑导航数据
dispatch({
  type: 'global/updateState',
  payload: {
    crumbs:[{
      title: '客户管理',
      path: '/home/customer'
    }]
  }
})
```

## 派发之后发生了什么

通过 type 在 effects 中寻找对应的方法，并执行，函数的参数就是 payload 的值。最后都会通过 nuomi.config 中的 updateState 方法，更新到 redux；

其中复杂的数据处理可以通过自定义方法。 比如 type 是'updateQuery'，就是只合并 payload 数据到 query 中。

## 查看派发历史

安装谷歌插件 Redux-DevTools, 在控制台里面就有 redux 这个选项。可以查看派发的数据是是什么，数据跟之前有什么变化等等信息。

<img src='/images/F24DF5D7F2EE3EEF560B3CD41FA55EF1.jpg'/>

## 常见问题

dispatch 的 type 中带有前缀$，是什么含义？
带$的方法的执行会被 redux 所监听，当方法执行的时候，会在 loading 中增加对应的状态为 true,方法执行结束之后，再将状态设置为 false,以便实现项目中的交互

## 所有的数据修改都要是新的引用
