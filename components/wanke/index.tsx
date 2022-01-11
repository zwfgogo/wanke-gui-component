import React from 'react';
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons';

interface Wanke {
  config: Function;
  options: any;
}

const wanke: Wanke = {
  options: {
    table: {},
    shinetable: {},
    authority: {},
    modal: {
      headerHeight: 0,
      footerHeight: 0,
      fullScreenIcon: <FullscreenOutlined/>,
      fullScreenExistIcon: <FullscreenExitOutlined/>,
    },
  },
  config(type: string, options: any) {
    const targetOpt = this.options[type];
    this.options[type] = { ...targetOpt, ...options };
  },
};

export default wanke;
