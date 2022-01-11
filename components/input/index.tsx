// 面包屑导航组件
import React from 'react'
import { Input } from 'antd'
import { InputProps, TextAreaProps, SearchProps } from 'antd/lib/input'
import { render } from 'react-dom'

const { Search, TextArea, Group, Password } = Input

export interface WKInputProps extends InputProps {
    autoComplete: 'on' | 'off',
}

export interface WKInputState {
    value?: string,
}

export interface WKSearchProps extends SearchProps {
    autoComplete: 'on' | 'off',
}

class WKInput extends React.PureComponent<WKInputProps, WKInputState>{
    
    static TextArea: any
    static Search: typeof WKSearch
    static Group: any
    isInput: boolean = false;

    static defaultProps = {
        autoComplete: 'off',
    }

    constructor(props){
        super(props);
        this.state = {
            value: props.value,
        }
    }

    componentDidUpdate(prevProps){
        if(prevProps.value !== this.props.value) this.setState({ value: (this.props.value) as string })
    }

    onInputChange = e => {
        const { onChange } = this.props
        this.setState({ value: e.target.value })
        !this.isInput && onChange && onChange(e)
    }
    static Password: any

    render(){
        const { onChange, autoComplete, ...restProps } = this.props
        const { value } = this.state
        return (
            <Input {...restProps}
            value={value}
            autoComplete={autoComplete}
            onCompositionStart={() => this.isInput = true}
            onCompositionEnd={(e) => {
                this.isInput = false
                this.onInputChange(e)
            }} 
            onChange={this.onInputChange} />
        )
    }
}

class WKSearch extends React.PureComponent<WKSearchProps, WKInputState>{
    isInput: boolean = false;
    static defaultProps = {
        autoComplete: 'off',
    }

    constructor(props){
        super(props);
        this.state = {
            value: props.value,
        }
    }

    componentDidUpdate(prevProps){
        if(prevProps.value !== this.props.value) this.setState({ value: (this.props.value) as string })
    }


    onInputChange = e => {
        const { onChange } = this.props
        this.setState({ value: e.target.value })
        !this.isInput && onChange && onChange(e)
    }

    render(){
        const { onChange, autoComplete, ...restProps } = this.props
        const { value } = this.state 
        return (
            <Search {...restProps}
            value={value}
            autoComplete={autoComplete}
            onCompositionStart={() => { this.isInput = true }}
            onCompositionEnd={(e) => {
                this.isInput = false
                this.onInputChange(e)
            }} onChange={this.onInputChange} />
        )
    }
}

WKInput.TextArea = TextArea
WKInput.Search = WKSearch
WKInput.Group = Group
WKInput.Password = Password

export default WKInput
