import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import * as Actions from '../store/actions'
import { bindActionCreators } from 'redux'
import ApiCaller from '../utils/ApiCaller'
import Api from '../constants/Api'
import { NavBar, Icon, Modal, Picker, InputItem, List } from 'antd-mobile'
import { createForm } from 'rc-form'

const alert = Modal.alert;
let finialValues = {}

class Form extends  React.Component {
	handleSubmit(e) {
		e.preventDefault();
		this.props.form.validateFields({ force: true }, (error, value) => {
			console.log(value)
			if (!error) {
				console.log(this.props.form.getFieldsValue());
			} else {
				console.log(error);
				alert('Validation failed');
			}
		});

	}

	render() {
		const { getFieldProps } = this.props.form;
		const IntentionDegree = [
			{label: 'A类', value: 'classA'},
			{label: 'B类', value: 'classB'},
			{label: 'C类', value: 'classC'}
		]
		const gender = [
			{label: '男', value: 'male'},
			{label: '女', value: 'female'}
		]
		return (
			<form onSubmit={this.handleSubmit.bind(this)}>
				<List>
					<InputItem
						{...getFieldProps('companynNme')}
						clear
						placeholder="请输入信息"
						style={{textAlign:'right'}}
					>公司名称</InputItem>
					<InputItem
						{...getFieldProps('realName')}
						clear
						placeholder="请输入信息"
						style={{textAlign:'right'}}
					>联系人姓名</InputItem>
					<InputItem
						{...getFieldProps('mobile')}
						type="phone"
						clear
						placeholder="请输入信息"
						style={{textAlign:'right'}}
					>电话</InputItem>
					<InputItem
						{...getFieldProps('post')}
						clear
						placeholder="请输入信息"
						style={{textAlign:'right'}}
					>职位</InputItem>
					<InputItem
						{...getFieldProps('post')}
						clear
						placeholder="请输入信息"
						style={{textAlign:'right'}}
					>身份证</InputItem>
					<InputItem
						{...getFieldProps('wxNum')}
						clear
						placeholder="请输入信息"
						style={{textAlign:'right'}}
					>微信号</InputItem>
					<Picker data={gender} cols={1} {...getFieldProps('gender')}>
						<List.Item arrow="horizontal">性别</List.Item>
					</Picker>
				</List>
			</form>
		)
	}

}
const FormWrapper = createForm()(Form);

class Detail extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			data: [],
		}
	}

	back() {
		browserHistory.push('/')
	}

	save() {
		alert('保存', '确认保存吗???', [
			{ text: '取消', onPress: () => console.log('cancel') },
			{ text: '确定', onPress: () => console.log('ok') },
		])
		this.handleSubmit(finialValues)
	}

	handleSubmit(values) {
		console.log(values)
	}

	componentDidMount() {

	}

	render() {

		return (
			<div>
				<NavBar
					mode="dark"
					icon={<Icon type="left"/>}
					onLeftClick={this.back.bind(this)}
					rightContent={<span onClick={this.save.bind(this)}>保存</span>}
				>
					添加客户
				</NavBar>
				<div className="">
					<FormWrapper onSubmit={this.handleSubmit.bind(this)}/>
				</div>
			</div>
		)
	}
}

export default connect(state => ({
	user: state.user
}), dispath => ({
	actions: bindActionCreators(Actions, dispath)
}))(Detail)
module.exports = exports['default']
