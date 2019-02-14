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
					rightContent={<span onClick={this.save.bind(this)}>编辑</span>}
				>
					客户详情
				</NavBar>
				<div className="detail">
					<div className="detail-bg"></div>
					<div className="detail-layout">
						<div className="detail-content">
							<div className="detail-content-box">
								<div className="">

								</div>
							</div>
						</div>
						<div className="detail-record">
							<p className="title">跟进记录（0次）</p>
							<ul className="detail-record-list">
								<li>
									<h4>跟进时间：2018-12-30</h4>
									<p>去客户那边洽谈一些和合同相关的事项，尽量让客户签掉合 同。去见客户最好带一些客户喜欢的礼物，那样客户会比较 高兴，谈起来更融洽。</p>
								</li>
								<li>
									<h4>跟进时间：2019-02-24</h4>
									<p>去客户那边签合同</p>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div className="bottom-button">
					<button className="bottom-button-yel">添加跟进</button>
					<button className="bottom-button-blu">成交</button>
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
