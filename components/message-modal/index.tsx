// 消息提示框
import React from 'react'
import { Modal } from '../index'
import { ModalProps } from 'antd/lib/modal'
import { CheckOutlined, ExclamationCircleOutlined, FrownOutlined } from '@ant-design/icons'
import './index.less'


export interface WKModalProps extends ModalProps {
    type?: 'success' | 'warn' | 'error',
    autoClose?: boolean, // 是否自动关闭(如果是自动关闭的将使visible不受控)
    closeCallBack?: () => void, // 自动关闭回调
    duration?: number, // 延迟时间（s）
    children?: React.ReactNode,
}

export interface WKModalState{
    visible: boolean
}

class WKMessageModal extends React.Component<WKModalProps, WKModalState> {
    i: any = null;

    constructor(props){
        super(props)
        this.state = {
            visible: props.visible || false,
        }
    }

    componentDidUpdate(preProps: WKModalProps, preState: WKModalState){
        const { visible,  autoClose, duration, closeCallBack } = this.props
        if(!autoClose && visible !== preProps.visible){
            this.setState({ visible })
        }else if(autoClose && visible && visible !== preProps.visible){ // 打开
            this.setState({ visible }, () => {
                if(this.i) clearTimeout(this.i)
                this.i = setTimeout(() => {
                    this.setState({ visible: false })
                    closeCallBack && closeCallBack()
                    if(this.i) clearTimeout(this.i)
                }, duration * 1000)
            })
        }
    }

    static defaultProps = {
        mask: false,
        type: 'success',
        duration: 5,
    }

    render(){
        const { children, type, okText, cancelButtonProps, width, style, centered, autoClose, ...restProps } = this.props
        return (
            <Modal
                {...restProps}
                title={null}
                visible={this.state.visible}
                okText={okText || (type === 'warn' ? '依旧如此' : type === 'error' ? '知道了' : '确定')}
                cancelButtonProps={type === 'error' ? { style: { display: 'none' } } : { type: 'text' }}
                bodyStyle={{ minHeight: 100, height: 100 }}
                style={style ? { ...style } : { top: 20, float: 'right' }}
                width={width || 383}
                centered={centered ?? false}
                wrapClassName="antd-message-modal"
            >
                <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                    { type === 'success' ? <CheckOutlined style={{ color: '#3D7EFF', fontSize: 25 }}/> : type === 'warn' ?  <ExclamationCircleOutlined style={{ color: '#FF8522', fontSize: 25 }}/> : <FrownOutlined style={{ color: '#D61518', fontSize: 25 }}/> }
                    {children}
                </div>
            </Modal>
        )
    }
}

export default WKMessageModal