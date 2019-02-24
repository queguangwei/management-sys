import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import * as Actions from '../store/actions'
import { bindActionCreators } from 'redux'
import ApiCaller from '../utils/ApiCaller'
import Api from '../constants/Api'
import { NavBar, Icon, DatePicker, Picker, InputItem, List, WhiteSpace } from 'antd-mobile'
import { createForm } from 'rc-form'

class Form extends  React.Component {

	onSubmit() {
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
		const phoneStatus = [
			{label: '已接', value: 'classA'},
			{label: '未接', value: 'classB'},
			{label: '错号', value: 'classC'},
			{label: '空号', value: 'classD'}
		]
		const gender = [
			{label: '男', value: 'male'},
			{label: '女', value: 'female'}
		]
		return (
			<form>
				<List>
					<InputItem
						{...getFieldProps('name')}
						clear
						placeholder="请输入信息"
						style={{textAlign:'right'}}
					>公司名称</InputItem>
					<InputItem
						{...getFieldProps('name')}
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
						{...getFieldProps('district')}
						clear
						placeholder="请输入信息"
						style={{textAlign:'right'}}
					>地区</InputItem>
					<InputItem
						{...getFieldProps('district')}
						clear
						placeholder="请输入信息"
						style={{textAlign:'right'}}
					>地区</InputItem>
					<Picker data={gender} cols={1} {...getFieldProps('gender')}>
						<List.Item arrow="horizontal">性别</List.Item>
					</Picker>
					<Picker data={phoneStatus} cols={1} {...getFieldProps('IntentionDegree')}>
						<List.Item arrow="horizontal">电话状态</List.Item>
					</Picker>
				</List>
				<WhiteSpace />
				<List>
					<DatePicker
						mode="date"
						{...getFieldProps('startDate')}
					>
						<List.Item arrow="horizontal">开始时间</List.Item>
					</DatePicker>
					<DatePicker
						mode="date"
						{...getFieldProps('endDate')}
					>
						<List.Item arrow="horizontal">结束时间</List.Item>
					</DatePicker>
				</List>
			</form>
		)
	}

}
const FormWrapper = createForm()(Form);

class EditCustomer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			data: [],
			cols: 1,
			pickerValue: [],
			asyncValue: [],
			sValue: ['2013', '春'],
			visible: false,
			colorValue: ['#00FF00'],
		}
	}

	back() {
		browserHistory.push('/')
	}

	genderPick(val) {
		console.log(val)
	}

	degreePick(val) {
		console.log(val)
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
				>编辑客户
				</NavBar>
				<div className="">
					<FormWrapper />

				</div>
			</div>
		)
	}
}

export default connect(state => ({
	user: state.user
}), dispath => ({
	actions: bindActionCreators(Actions, dispath)
}))(EditCustomer)
module.exports = exports['default']
