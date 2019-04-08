import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import * as Actions from '../store/actions'
import { bindActionCreators } from 'redux'
import ApiCaller from '../utils/ApiCaller'
import Api from '../constants/Api'
import * as VailddateHelper from '../utils/ValidateHelper'
import {NavBar, Icon, Picker, Modal, InputItem, List, Toast} from 'antd-mobile'
const alert = Modal.alert;

class EditCustomer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			userId: '',
            cityJson: [],
			hasError: false,
			disabled: false,
			age: '',
			code: '',
			name: '',
			idCard: '',
			company: '',
			job: '',
			sex: null,
			wx: '',
			callState: [],
			type: [],
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

	handleSubmit() {
		const state = this.state;
		const params = {
			code: state.code,
			name: state.name,
			// idCard: state.idCard,
			company: state.company,
			job: state.job,
			// sex: state.sex,
			// wx: state.wx,
			callState: state.callState,
			type: state.type,
			province: state.province,
			city: state.city
		}
		// for(let k in params) {
		// 	if(params[k] == null || params[k] == '') {
		// 		Toast.info("请检查补全信息！",2);
		// 		return;
		// 	}
		// }
		// params.sex = params.sex[0];
		params.callState = params.callState[0];
		params.type = params.type[0];
		ApiCaller.call(Api.user.edit, JSON.stringify({ userId: state.userId, user: params }), (res) => {
			if (res.code == 0) {
				browserHistory.goBack();
			} else {
				Toast.info(res.msg, 2);
			}
		})
	}

    getCityList() {
		const state = this.state;
        ApiCaller.call(Api.other.cityList, JSON.stringify({}), (res) => {
            if (res.code == 0) {
            	state.cityJson = res.data
				this.setState(state);
            } else {

            }
        })
	}

	getCustomerDetail(userId) {
		const state = this.state;
		ApiCaller.call(Api.user.info, JSON.stringify({userId: userId}), (res) => {
			if (res.code == 0) {
				state.userId = res.data.user.id;
				state.company = res.data.user.company;
				state.name = res.data.user.name;
				state.code = res.data.user.code;
				state.job = res.data.user.job;
				state.idCard = res.data.user.idCard;
				state.age = VailddateHelper.checkIdCardAge(res.data.user.idCard);
				state.wx = res.data.user.wx;
				let sex = [];
				sex.push(res.data.user.sex)
				state.sex = sex;
				let callState = [];
				callState.push(res.data.user.callState);
				state.callState = callState;
				let type = [];
				type.push(res.data.user.type);
				state.type = type;
				let district = [];
				district.push(res.data.user.province, res.data.user.city);
				state.district = district;
				state.province = res.data.user.province;
				state.city = res.data.user.city;
				this.setState(state);
			} else {
				Toast.info(res.msg, 2)
			}
		})
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

	onCallStateChange(value) {
		this.setState({callState: value})
	}

	onTypeChange(value) {
		this.setState({type: value})
	}

	onCityChange(value) {
		console.log(value)
		this.setState({
			district: value,
			province: value[0],
			city: value[1]
		})
	}

	componentDidMount() {
		this.getCustomerDetail(this.props.location.query.id);
		const state = this.state;
		state.disabled = eval(this.props.location.query.typeDisabled);
		this.setState(state);
		this.getCityList();
	}

	render() {
		const state = this.state;
		const level = [
			{label: 'A类', value: 'A'},
			{label: 'B类', value: 'B'},
			{label: 'C类', value: 'C'}
		];
		const phoneStatus = [
			{label: '已接', value: 2},
			{label: '未接', value: 1},
			{label: '空错号', value: 0}
		];
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
				>编辑客户
				</NavBar>
				<List>
					<InputItem
						value={state.company}
						clear
						placeholder="请输入信息"
						style={{textAlign:'right'}}
						onChange={this.onCompanyChange.bind(this)}
					>单位</InputItem>
					<InputItem
						value={state.name}
						clear
						placeholder="请输入信息"
						style={{textAlign:'right'}}
						onChange={this.onNameChange.bind(this)}
					>姓名</InputItem>
					<InputItem
						value={state.code}
						error={this.state.hasError}
						onErrorClick={this.onErrorClick.bind(this)}
						onChange={this.onPhoneChange.bind(this)}
						type="number"
						clear
						placeholder="请输入信息"
						maxLength={11}
						style={{textAlign:'right'}}
					>手机</InputItem>
					<InputItem
						value={state.job}
						clear
						placeholder="请输入信息"
						style={{textAlign:'right'}}
						onChange={this.onJobChange.bind(this)}
					>职位</InputItem>
					{/*<InputItem*/}
						{/*value={state.idCard}*/}
						{/*clear*/}
						{/*placeholder="请输入信息"*/}
						{/*maxLength={18}*/}
						{/*style={{textAlign:'right'}}*/}
						{/*onChange={this.onIdCardChange.bind(this)}*/}
					{/*>身份证</InputItem>*/}
					{/*<InputItem*/}
						{/*value={state.age}*/}
						{/*disabled*/}
						{/*placeholder="自动生成"*/}
						{/*style={{textAlign:'right'}}*/}
					{/*>年龄</InputItem>*/}
					{/*<InputItem*/}
						{/*value={state.wx}*/}
						{/*clear*/}
						{/*placeholder="请输入信息"*/}
						{/*maxLength={20}*/}
						{/*style={{textAlign:'right'}}*/}
						{/*onChange={this.onWxChange.bind(this)}*/}
					{/*>微信号</InputItem>*/}
					{/*<Picker*/}
						{/*data={gender}*/}
						{/*cols={1}*/}
						{/*value={state.sex}*/}
						{/*onChange={this.onSexChange.bind(this)}*/}
					{/*>*/}
						{/*<List.Item arrow="horizontal">性别</List.Item>*/}
					{/*</Picker>*/}
					<Picker
						data={phoneStatus}
						cols={1}
						value={state.callState}
						onChange={this.onCallStateChange.bind(this)}
					>
						<List.Item arrow="horizontal">电话状态</List.Item>
					</Picker>
					<Picker data={level}
							cols={1}
							value={state.type}
							disabled={state.disabled}
							onChange={this.onTypeChange.bind(this)}
					>
						<List.Item arrow="horizontal">意向度</List.Item>
					</Picker>
					<Picker
						data={this.state.cityJson}
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
}))(EditCustomer)
module.exports = exports['default']
