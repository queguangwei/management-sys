import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import * as Actions from '../store/actions'
import { bindActionCreators } from 'redux'
import ApiCaller from '../utils/ApiCaller'
import Api from '../constants/Api'
import { NavBar, Icon, Modal, Picker, InputItem, List, Stepper, WhiteSpace } from 'antd-mobile'
import { createForm } from 'rc-form'

const alert = Modal.alert;
let finialValues = {}

class Form extends  React.Component {
	constructor(props) {
		super(props);
		this.state = {
			val: 1,
			keys: [1]
		};
	}
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
	onChange(val) {
		console.log(val);
		let keys = []
		for(let i = 1;i <= val;i ++) {
			keys.push(val)
		}
		this.setState({ val, keys });
	}
	render() {
		const { getFieldProps } = this.props.form;
		const lessons = [
			{label: '男', value: 'male'},
			{label: '女', value: 'female'},
			{label: 'A类', value: 'classA'},
			{label: 'B类', value: 'classB'},
			{label: 'C类', value: 'classC'}
		]
		const formItems = this.state.keys.map((k, index) => {
			return (
				<div >
					<InputItem
						{...getFieldProps('name')}
						clear
						placeholder="请输入信息"
						style={{textAlign:'right'}}
					>姓名</InputItem>
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
				</div>
			)
		});
		return (
			<form onSubmit={this.handleSubmit.bind(this)}>
				<List>
					<Picker data={lessons} cols={1} {...getFieldProps('lesson')}>
						<List.Item arrow="horizontal">课程名称</List.Item>
					</Picker>
					<InputItem
						{...getFieldProps('companynNme')}
						type="money"
						clear
						placeholder="请输入信息"
					>课程单价</InputItem>
					<List.Item
						wrap
						extra={
							<Stepper
								style={{ width: '100%', minWidth: '100px' }}
								showNumber
								max={10}
								min={1}
								value={this.state.val}
								onChange={this.onChange.bind(this)}
							/>}
					>
						人数
					</List.Item>
				</List>
				<List>
					{formItems}


				</List>
				<WhiteSpace />
				<List>
					<InputItem
						{...getFieldProps('companynNme')}
						type="money"
						clear
						placeholder="请输入信息"
					>费用</InputItem>
				</List>
			</form>
		)
	}

}
const FormWrapper = createForm()(Form);

class Deal extends React.Component {
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
					成交填写信息
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
}))(Deal)
module.exports = exports['default']
