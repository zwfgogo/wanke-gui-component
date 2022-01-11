import { QueryFilter } from 'wanke-gui';
import { Select, Button } from 'antd';

let FilterItem = QueryFilter.FilterItem;

let list = [
  {
    id: 1,
    name: '浙江',
    children: [
      { id: 11, name: '杭州' },
      { id: 12, name: '宁波' },
      { id: 13, name: '温州' },
      { id: 14, name: '绍兴' },
      { id: 15, name: '衢州' },
      { id: 16, name: '丽水' },
      { id: 17, name: '金华' },
      { id: 18, name: '舟山' },
      { id: 19, name: '台州' },
      { id: 110, name: '湖州' },
      { id: 111, name: '嘉兴' },
    ],
  },
  {
    id: 2,
    name: '江苏',
    children: [
      { id: 21, name: '南京' },
      { id: 22, name: '苏州' },
      { id: 23, name: '无锡' },
      { id: 24, name: '徐州' },
      { id: 25, name: '常州' },
      { id: 26, name: '南通' },
      { id: 27, name: '连云港' },
      { id: 28, name: '淮安' },
      { id: 29, name: '扬州' },
      { id: 210, name: '泰州' },
      { id: 211, name: '镇江' },
      { id: 212, name: '盐城' },
      { id: 213, name: '宿迁' },
    ],
  },
];

class Demo extends React.Component {
  state = {
    provinceId: null,
    cityId: null,
  };

  render() {
    let cityList = [];
    if (this.state.provinceId) {
      cityList = list.find(item => item.id === this.state.provinceId).list;
    }
    return (
      <QueryFilter>
        <FilterItem label="省" style={{ width: '400px' }}>
          <Select
            value={this.state.provinceId}
            onChange={v => this.setState({ provinceId: v })}
            style={{ minWidth: '100px' }}
          >
            {list.map(item => {
              return <Select.Option key={item.id}>{item.name}</Select.Option>;
            })}
          </Select>
        </FilterItem>
        <FilterItem label="市" style={{ width: '400px' }}>
          <Select
            value={this.state.provinceId}
            onChange={v => this.setState({ provinceId: v })}
            style={{ minWidth: '100px' }}
          >
            {cityList.map(item => {
              return <Select.Option key={item.id}>{item.name}</Select.Option>;
            })}
          </Select>
        </FilterItem>
        <Button type="primary" style={{ marginLeft: '30px' }}>
          搜索
        </Button>
      </QueryFilter>
    );
  }
}
