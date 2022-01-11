---
category: 数据管理
order: 4
title: 数据模型
---

## store 中的数据

store 中的数据设计遵循扁平化原则。 ems2，数据类型分为全局和路由级别。用户信息以及面包屑 属于全局类型的数据。侧边栏中每个路由都是一个 store，在菜单里面引入 Nuomi 组件也创建独立的 store.

## 权限相关

权限在一般指的是当前账号能不能去做某件事情。比如能不能查看，能不能编辑，能不能删除等等。用门票来类比权限，我们去某个地方玩，手上有很多很多的门票，到了 A 项目，问问 A 项目需要什么门票，看看我们手上有没有，如果有就可以进去，没有就不能，这就是权限。

再抽象一层就是，为了达到某个结果，我们需要什么条件以及我们当前拥有什么条件，都可以归类为权限。后台开放平台根据业务场景不同，权限的处理方式分为组件式和函数式。

#### 组件式

面对权限的时候，我们建议将权限的粒度进行细分，比如某个菜单，管理员账号有新增、修改、编辑、删除、重置的权限，而运营商账号只有新增、修改的权限。传统的后台传输格式是将是账号的类型传给前端，然后前端根据类型渲染不同的按钮组件。

```
if(type === 1 ){
  return (
    <React.Fragment>
      <Button>新增</Button>
      <Button>编辑</Button>
      <Button>删除</Button>
      <Button>重置</Button>
    </React.Fragment>
  )
}
else if(type ===2){
 return (
    <React.Fragment>
      <Button>新增</Button>
      <Button>修改</Button>
    </React.Fragment>
  )
}
// 如果有更多的账号类型，有更多的判断
...
```

这里我们建议将权限的粒度细化到每个按钮。新增、编辑、删除、重置分别对应 02、03、04、05 运营商账号的权限列表是`['02','03']`, 管理员账号的权限列表是`['02','03','04','05']` 实现方式如下

```
render() {
  return(
    <Authority code='02' codes={authorities}>
      <Button>新增</Button>
    <Authority/>
    <Authority code='03' codes={authorities}>
      <Button>编辑</Button>
    <Authority/>
    <Authority code='04' codes={authorities}>
      <Button>删除</Button>
    <Authority/>
    <Authority code='05' codes={authorities}>
      <Button>重置</Button>
    <Authority/>
  );
}

```

可以通过配置登录账号的权限 ,简化组件书写

```
// 用户接口里面获取权限信息authorities之后
wanke.config('authority',{
  codes: authorities
});

```

```
render() {
  return(
    <Authority code='02'>
      <Button>新增</Button>
    <Authority/>
    <Authority code='03'>
      <Button>编辑</Button>
    <Authority/>
    <Authority code='04'>
      <Button>删除</Button>
    <Authority/>
    <Authority code='05'>
      <Button>重置</Button>
    <Authority/>
  );
}
```

#### 函数式

业务场景一：

> 新增客户功能: 客户类型：下拉选择框输入。当前账号为运营商用户时，选项有“运维商”、“终端用户”，默认为“运维商”。当当前用户为平台用户时，选项有“运营商”、“运维商”、“终端用户”，默认为“运营商”。

业务分析：上面的场景可以抽象为，下拉选框中的运营商需要权限 01 而运营商没有 01 权限，平台用户有 01 权限。

```

// authorities 账号的权限列表

const dataSource = [
  ...Authority.get('01',authorities,[{
    name:'运营商',
    value:'1',
  }]),
  {
    name:'运维商',
    value:'2',
  },
  {
    name:'终端用户',
    value:'3'
  }
]

const defaultValue = dataSource[0].value;
```

业务场景二：

> 点击客户管理功能首页列表中的客户单位电站数量，进入电站列表信息页面，其中电站列表的表头下面三种情况 ⑥ 运营商：该电站对应运营商单位的简称。查看运营商电站时，该字段不显示。运营商用户查看其他两类客户的电站信息时，该字段可不显示。 ⑦ 运维商：该电站对应运维商单位的简称。查看运维商电站时，该字段不显示。 ⑧ 终端用户：该电站对应终端用户单位的简称。查看终端用户电站时，该字段不显示。

业务分析：上面的场景可以抽象为，运营商代码类型 01，运维商类型 02，运营商类型 03。运营商电站拥有代码`['operation','final']`，运维商拥有代码`['operator','final']` ，终端用户电站拥有代码`['operator','operation']`

```


const codes = record.codes;
const columns = [
  {
    title: '投产时间',
    dataIndex: 'time'
    width: 200
  },
  ...Authority.get('operator',codes,[{
    title: '运营商',
    dataIndex: 'operator',
    width: 200
  }]),
  ...Authority.get('operation',codes,[{
    title: '运维商',
    dataIndex: 'operation',
    width: 200
  }]),
  ...Authority.get('final',codes,[{
    title: '终端用户',
    dataIndex: 'final',
    width: 200
  }]),

]

const defaultValue = dataSource[0].value;
```

## 模块跳转

通过字段标识
