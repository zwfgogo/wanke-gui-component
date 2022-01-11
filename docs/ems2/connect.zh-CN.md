---
category: 数据管理
order: 2
title: 连接函数
---

#### connect 函数的作用

将 react 组件和 store 进行关联起来，既可以从 store 中读取数据，又可以通过派发改变 store 中的数据。

## 拿到 dispatch

```
import {connect} from 'nuomi';
function App(props) {
  // 通过props拿到dispatch
  const {dispatch} = props;
}

export default connect()(App)
```

## 获取 store 中的数据

```
import {connect} from 'nuomi';
function App(props) {
  const {list} = props;
}
// state 是组件所在的store中的数据集合
const mapStateToProps = (state)=>{
  return {
    list: state.list
  }
}
export default connect(mapStateToProps)(App)

```

## 通过解构简化书写

```
import {connect} from 'nuomi';
function App({list}) {

}
// state 是组件所在的store中的数据集合
// allState 是所有store中的数据

export default connect(({list})=>({list}))(App)
```

## 从其他 store 中获取数据

```
import {connect} from 'nuomi';
function App(props) {
  const {username} = props;
}
// state 是组件所在的store中的数据集合
// 第二个参数allState, 是所有store中的数据
const mapStateToProps = (state, allState)=>{
  return {
    username: allState.global.username
  }
}
export default connect(mapStateToProps)(App)

```

## 常见问题

- 为什么 connect 不默认直接将所有的数据都绑定到组件上, connect 起到监听作用，监听的指定数据变化的时候更新组件。如果将所有数据绑定到组件上，会导致任何数据的更新都会引发组件的更新，消耗不必要的性能。
