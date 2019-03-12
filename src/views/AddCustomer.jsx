import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import * as Actions from '../store/actions'
import { bindActionCreators } from 'redux'
import ApiCaller from '../utils/ApiCaller'
import Api from '../constants/Api'
import * as VailddateHelper from '../utils/ValidateHelper'
import { NavBar, Icon, Modal, Picker, InputItem, List, Toast } from 'antd-mobile'
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
			district: [],
            cityJson: []
		}
	}

	back() {
		browserHistory.goBack()
	}

	save() {
		this.queryAreaByPhone(this.state.code);
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

	queryAreaByPhone(phone) {
		const state = this.state;
		ApiCaller.call(Api.other.queryAreaByPhone, JSON.stringify({code: phone}), (res) => {
			if (res.code == 0) {
				state.province = res.data.province;
				state.city = res.data.city;
				this.setState(state);
			}else {
				Toast.info("请输入正确格式的手机号！",2);
			}
		})
	}

	handleSubmit() {
		const state = this.state;
		const params = {
			code: state.code,
			name: state.name,
			// idCard: state.idCard,
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
		params.idCard = state.idCard;
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

	componentDidMount() {
        // this.getCityList();
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
						type="number"
						error={this.state.hasError}
						onErrorClick={this.onErrorClick.bind(this)}
						onChange={this.onPhoneChange.bind(this)}
						value={this.state.code}
						placeholder="请输入信息"
						clear
						maxLength={11}
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
						maxLength={20}
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
					{/*<Picker*/}
						{/*data={this.state.cityJson}*/}
						{/*value={this.state.district}*/}
						{/*cols={2}*/}
						{/*onChange={this.onCityChange.bind(this)}*/}
					{/*>*/}
						{/*<List.Item arrow="horizontal">地区</List.Item>*/}
					{/*</Picker>*/}
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
