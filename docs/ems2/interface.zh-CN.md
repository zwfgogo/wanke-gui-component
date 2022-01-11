---
category: 数据管理
order: 3
title: 接口数据
---

在项目中提供了 createServices 方法来实现接口的请求，以及接口数据的模拟。

## 配置接口

我们在配置接口列表的时候，会在路径的最后通过'|'描述接口的请求类型，在调用的时候，通过函数传参。

```
// services.js
import mock from './mock';
import createServices from 'public/js/createServices';

export default createServices({
   login: '/path/login|post',
   getDetail:'/resource/:devType|get'
});
```

## 调用接口

```
// index.js 路由的配置文件

import services from './services';

export defautl {
  effects: {
    async getDetail() {
      const data =  await services.getDetail({ devType: '111' });
    },
    async $login() {
      const { username, password } = this.getState();
      const data = await services.login({ username, password });
    }
  }
}


```

## 接口数据模拟

在前端开发的过程中通过中间层的 api，我们可以本地模拟数据，来实现不同场景的交互。

传统的方式是通过在代码里面写静态数据，来描述返回值，并不能根据传递的参数，返回不同形式的数据。在 ems2 中，我们可以根据传过来的参数动态模拟返回数据。

```
// mock.js 模拟登录的请求
export default {
  login({ username, password }) {
    if (username !== 'nuomi' || password !== 'nuomi') {
      return {
        status: 300,
        message: '用户名或密码错误',
      };
    }
    return {
      status: 200,
    };
  },
};

```

```
// service.js
import createServices from 'public/js/createServices';
import mock from './mock';

export default createServices({
  login: '/path/login:post',
  ...mock,
});
```

## 接口拦截器

在项目中我们提供一个过滤器，将系统中的请求以及返回数据统一处理。在前端的业务中，接口返回状态分为 3 类(errorMsg 的值可以有很多，接口的 code 枚举应该是有限的且固定的)，以登录接口为案例：

| 接口类型     | 业务场景举例     | code 枚举 | 过滤器处理方式       |
| ------------ | ---------------- | --------- | -------------------- |
| 成功         | 登录成功         |           | 返回接口中的 results |
| 系统异常     | 服务器异常       |           | 打断 promise 调用链  |
| 接口参数错误 | 账号或者密码错误 |           | reject 接口返回值    |

```
// 过滤器的代码
const response = new Promise((resolve, reject)=>{
  // 成功
  if(res.data.code === 200){
    resolve(res.data)
  }
  else if(res.data.code === 500) {
    alert('服务器异常');
    reject({});
  }
  // 业务异常,  交给业务处理
  else {
    reject(res);
  }
})
```

```
// 前端代码业务代码的处理方式
async $login() {
  try {
    // 用户正常登录
    const { username, password } = this.getState();
    await services.login({ username, password });
    sessionStorage.setItem('isLogin', 1);
    router.location('/home/customer');
  } catch (e) {
    // 在过滤器中reject的场景 会走这里
    if(e.code === 300){
      window.alert(e.message);
    }
  }
}
```
