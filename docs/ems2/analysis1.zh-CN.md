---
category: 功能实现解析
order: 6
title: 表格
---

项目里的表格相比于 antd，增加了文本溢出隐藏的功能；不用手动配置 scroll，自动实现大屏幕下表格延展；小屏下，如果表格宽大于容器宽度则出横向滚动条，如果高大于容器高度，则出纵向滚动条。

由于需要纵向滚动条的表格需要内部计算纵向的滚动高度，它的容器高度不能为 0，并且要监听容器高度的变化，我们将表格组件分成了计算纵向滚动高度（Table）和不计算纵向滚动高度的（TableX）。

TableX 业务场景比较简单，下面我们重点分析下 Table。

Table 分为四个部分：查询条件、请求数据、分页切换、redux 关联

## state

```
state: {
  query: {
    page:1,
    size:20,
  },
  total:0,
  list:[]
}
```

## 使用

```
const pageChange = (page,size)=>{dispatch({type:'pageChange',payload:{page,size}})};

return(
  <TableCon dataSource={list} columns={columns} pageChange={pageChange}/>
);

```

## effects

```
  effects: {
    updateState(payload) {
      this.dispatch({
        type: "_updateState",
        payload
      });
    },
    updateQuery(payload) {
      const { query } = this.getState();
      this.updateState({
        query: { ...query, ...payload }
      });
    },
    pageChange({page, size}){
      this.updateQuery({
        page, size
      })
      this.$getList();
    },
    async $getList(){
      const {query} = this.getState();
      const data = await services.getList(query);
      this.updateState({
        list: data.list,
        total: data.total
      })
    }
  },
```

其中我们将 updateState，updateQuery，pageChange 抽取到公共方法中，使用 nuomi.config 配置。

## nuomi.config

```
  effects: {
    updateState(payload) {
      this.dispatch({
        type: "_updateState",
        payload
      });
    },
    updateQuery(payload) {
      const { query } = this.getState();
      this.updateState({
        query: { ...query, ...payload }
      });
    },
    pageChange({page, size}){
      this.updateQuery({
        page, size
      })
      this.$getList();
    },
  }
```

## TableCon

```
  // 配置基本查询条件
 export default connect(({total,query:{page,size}},{global:{collapsed}})=>({
   collapsed,
   total,
   pageSize:size,
   current:page
  }))(Table);

```
