import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import * as Actions from '../store/actions'
import { bindActionCreators } from 'redux'
import ApiCaller from '../utils/ApiCaller'
import Api from '../constants/Api'
import * as VailddateHelper from '../utils/ValidateHelper'
import { NavBar, Icon, Modal, Picker, InputItem, List, Toast } from 'antd-mobile'
let cityJson = [
	{
	"value": "浙江省",
	"label": "浙江省",
	"children": [
		{
			"value": "杭州市",
			"label": "杭州市"
		},
		{
			"value": "宁波市",
			"label": "宁波市"
		},
		{
			"value": "温州市",
			"label": "温州市"
		},
		{
			"value": "嘉兴市",
			"label": "嘉兴市"
		},
		{
			"value": "湖州市",
			"label": "湖州市"
		},
		{
			"value": "绍兴市",
			"label": "绍兴市"
		},
		{
			"value": "金华市",
			"label": "金华市"
		},
		{
			"value": "衢州市",
			"label": "衢州市"
		},
		{
			"value": "舟山市",
			"label": "舟山市"
		},
		{
			"value": "台州市",
			"label": "台州市"
		},
		{
			"value": "丽水市",
			"label": "丽水市"
		}]
},
	{
		"value": "上海",
		"label": "上海",
		"children": [
			{
				"value": "上海市",
				"label": "上海市"
			}
		]
	},
	{
		"value": "江苏省",
		"label": "江苏省",
		"children": [{
			"value": "南京市",
			"label": "南京市"
		},
			{
				"value": "无锡市",
				"label": "无锡市"
			},
			{
				"value": "徐州市",
				"label": "徐州市"
			},
			{
				"value": "常州市",
				"label": "常州市"
			},
			{
				"value": "苏州市",
				"label": "苏州市"
			},
			{
				"value": "南通市",
				"label": "南通市"
			},
			{
				"value": "连云港市",
				"label": "连云港市"
			},
			{
				"value": "淮安市",
				"label": "淮安市"
			},
			{
				"value": "盐城市",
				"label": "盐城市"
			},
			{
				"value": "扬州市",
				"label": "扬州市"
			},
			{
				"value": "镇江市",
				"label": "镇江市"
			},
			{
				"value": "泰州市",
				"label": "泰州市"
			},
			{
				"value": "宿迁市",
				"label": "宿迁市"
			}]
	}];
const alert = Modal.alert;

class AddCustomer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			age: '',
			hasError: false,
			code: '',
			name: '',
			idCard: '',
			company: '',
			job: '',
			sex: null,
			wx: '',
			province: '',
			city: '',
			district: []
		}
	}

	back() {
		browserHistory.goBack()
	}

	save() {
		alert('保存', '确认保存吗???', [
			{ text: '取消', onPress: () => console.log('cancel') },
			{ text: '确定', onPress: () => this.handleSubmit() },
		])
	}

	onCompanyChange(value) {
		this.setState({
			company: value
		})
	}

	onNameChange(value) {
		this.setState({
			name: value
		})
	}

	onErrorClick() {
		if (this.state.hasError) {
			Toast.info('请输入11位电话号码！', 2);
		}
	}
	onPhoneChange(value) {
		if (value.replace(/\s/g, '').length < 11) {
			this.setState({
				hasError: true,
			});
		} else {
			this.setState({
				hasError: false,
			});
		}
		this.setState({
			code: value,
		});
	}

	onJobChange(value) {
		this.setState({job: value})
	}

	onIdCardChange(value) {
		this.setState({idCard: value})
		let age = VailddateHelper.checkIdCardAge(value)
		this.setState({age: age})
	}

	onWxChange(value) {
		this.setState({wx: value})
	}

	onSexChange(value) {
		this.setState({sex: value})
	}

	onCityChange(value) {
		console.log(value)
		this.setState({
			district: value,
			province: value[0],
			city: value[1]
		})
	}

	handleSubmit() {
		const state = this.state;
		const params = {
			code: state.code,
			name: state.name,
			idCard: state.idCard,
			company: state.company,
			job: state.job,
			sex: state.sex,
			wx: state.wx,
			province: state.province,
			city: state.city
		}
		for(let k in params) {
			if(params[k] == null || params[k] == '') {
				Toast.info("请检查补全信息！",2);
				return;
			}
		}
		params.sex = params.sex[0];
		console.log(params)
		ApiCaller.call(Api.user.add, JSON.stringify({ user: params }), (res) => {
			if (res.code == 0) {
				browserHistory.push('/');
			} else {
				Toast.info(res.msg, 2);
			}
		})
	}

	componentDidMount() {

	}

	render() {
		const gender = [
			{label: '男', value: 0},
			{label: '女', value: 1}
		];
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
				<List>
					<InputItem
						onChange={this.onCompanyChange.bind(this)}
						clear
						placeholder="请输入信息"
						style={{textAlign:'right'}}
					>公司名称</InputItem>
					<InputItem
						onChange={this.onNameChange.bind(this)}
						clear
						placeholder="请输入信息"
						style={{textAlign:'right'}}
					>联系人姓名</InputItem>
					<InputItem
						type="phone"
						error={this.state.hasError}
						onErrorClick={this.onErrorClick.bind(this)}
						onChange={this.onPhoneChange.bind(this)}
						value={this.state.code}
						placeholder="请输入信息"
						clear
						style={{textAlign:'right'}}
					>电话</InputItem>
					<InputItem
						onChange={this.onJobChange.bind(this)}
						clear
						placeholder="请输入信息"
						style={{textAlign:'right'}}
					>职位</InputItem>
					<InputItem
						onChange={this.onIdCardChange.bind(this)}
						clear
						placeholder="请输入信息"
						style={{textAlign:'right'}}
					>身份证</InputItem>
					<InputItem
						disabled
						placeholder="自动生成"
						value={this.state.age}
						style={{textAlign:'right'}}
					>年龄</InputItem>
					<InputItem
						onChange={this.onWxChange.bind(this)}
						clear
						placeholder="请输入信息"
						style={{textAlign:'right'}}
					>微信号</InputItem>
					<Picker
						data={gender}
						value={this.state.sex}
						cols={1}
						onChange={this.onSexChange.bind(this)}
					>
						<List.Item arrow="horizontal">性别</List.Item>
					</Picker>
					<Picker
						data={cityJson}
						value={this.state.district}
						cols={2}
						onChange={this.onCityChange.bind(this)}
					>
						<List.Item arrow="horizontal">地区</List.Item>
					</Picker>
				</List>
			</div>
		)
	}
}

export default connect(state => ({
	user: state.user
}), dispath => ({
	actions: bindActionCreators(Actions, dispath)
}))(AddCustomer)
module.exports = exports['default']
