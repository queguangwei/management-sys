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

class FollowUp extends React.Component {
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
					rightContent={<span onClick={this.save.bind(this)}>完成</span>}
				>
					添加跟进
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
}))(FollowUp)
module.exports = exports['default']
