import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import * as Actions from '../store/actions'
import { bindActionCreators } from 'redux'
import ApiCaller from '../utils/ApiCaller'
import Api from '../constants/Api'
import { NavBar, Icon, Modal, DatePicker, TextareaItem, List, WhiteSpace } from 'antd-mobile'
import { createForm } from 'rc-form'

const alert = Modal.alert;
let finialValues = {}

class Form extends  React.Component {
	constructor(props) {
		super(props);
	}
	handleSubmit() {
		this.props.form.validateFields({ force: true }, (error, value) => {
			if (!error) {
				console.log(this.props.form.getFieldsValue());
			} else {
				console.log(error);
				alert('Validation failed');
			}
		});

	}

	componentDidMount() {
	}

	render() {
		const { getFieldProps } = this.props.form;
		return (
			<form onSubmit={this.handleSubmit.bind(this)}>
				<List>
					<DatePicker
						mode="date"
						{...getFieldProps('startDate')}
					>
						<List.Item arrow="horizontal">跟进时间</List.Item>
					</DatePicker>
				</List>
				<WhiteSpace />
				<List>
					<TextareaItem
						{...getFieldProps('count', {
							initialValue: '跟进内容...',
						})}
						clear={true}
						placeholder="请输入信息"
						rows={10}
						count={300}
					/>
				</List>
			</form>
		)
	}

}
const FormWrapper = createForm()(Form);

class Child extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			info:'快点击子组件按钮哈哈哈'
		}
	}
	componentDidMount(){
		this.props.onRef(this)
		console.log(this)
	}

	handleChildClick() {
		this.setState({info:'通过父组件按钮获取到子组件信息啦啦啦'})
	}

	render() {
		return (
			<div>
				<button onClick={this.handleChildClick}>子组件按钮</button>
			</div>
		)
	}
}

class FollowUp extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			data: [],
		}
	}

	back() {
		browserHistory.goBack()
	}

	save() {
		console.log(this,child.state.info)
		this.child.myName();
		// alert('保存', '确认保存吗???', [
		// 	{ text: '取消', onPress: () => console.log('cancel') },
		// 	{ text: '确定', onPress: () => console.log('ok') },
		// ])

	}

	onRef(ref) {
		this.child = ref;
		console.log(ref)
	}

	componentDidMount() {

	}

	render() {
		const that = this;
		return (
			<div>
				<NavBar
					mode="dark"
					icon={<Icon type="left"/>}
					onLeftClick={this.back.bind(this)}
					rightContent={<span onClick={this.save.bind(this)}>完成</span>}
				>
					添加跟进
				</NavBar>
				<Child onRef={that.onRef}/>
				{/*<FormWrapper ref={r => this.child = r}/>*/}
			</div>
		)
	}
}

export default connect(state => ({
	user: state.user
}), dispath => ({
	actions: bindActionCreators(Actions, dispath)
}))(FollowUp)
module.exports = exports['default']
