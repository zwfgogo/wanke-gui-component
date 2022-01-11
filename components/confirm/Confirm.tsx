import React from 'react'
import { Button, Modal } from 'antd'

interface Props {
  message: string
  visible: boolean
  onConfirm: () => void
  onCancel: () => void
}

const Confirm: React.FC<Props> = function(this: null, props) {
  return (
    <Modal
      width={415}
      style={{top: 100}}
      bodyStyle={{padding: '32px 32px 24px'}}
      visible={props.visible}
      title={null}
      footer={null}
      closable={false}
    >
      <div>
        <section className="confirm-title">提示</section>
        <section style={{marginTop: 8}}>{props.message || props.children}</section>
        <section style={{display: 'flex', flexDirection: 'row-reverse'}}>
          <div style={{marginTop: 20}}>
            <Button type="default" onClick={props.onCancel}>取消</Button>
            <Button danger type="default" style={{marginLeft: 10}} onClick={props.onConfirm}>确定</Button>
          </div>
        </section>
      </div>
    </Modal>
  )
}

export default Confirm
