import React from 'react';
import Editor from 'image/core/pc/editor';

export default class SNKEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: !!props.show,
        };
        this.editorInstance = new Editor();
        if(this.state.show) {
            this.editorInstance.show({
                src:'https://www.sinosafe.com.cn/upload/cms/shop/201804/26181850g6tr.png'
            });
        }
            
    }
    componentWillReceiveProps = (nextPros) => {
        if(this.props.show && !this.state.show) {
            this.setState({
                show: true,
            }, () => {
                this.editorInstance.show({
                    src:'https://www.sinosafe.com.cn/upload/cms/shop/201804/26181850g6tr.png'
                });
            });
        } else if(!this.props.show && this.state.show) {
            this.setState({
                show: false,
            }, () => {
                this.editorInstance.hide();
            });
        }
    }
    render(){
        return <span />;
    }
}