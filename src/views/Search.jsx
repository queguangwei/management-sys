import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import * as Actions from '../store/actions'
import { bindActionCreators } from 'redux'
import ApiCaller from '../utils/ApiCaller'
import Api from '../constants/Api'
import { NavBar, Icon, DatePicker, Picker, InputItem, List, WhiteSpace, Toast } from 'antd-mobile'
import { createForm } from 'rc-form'
let finialValues = {}

class Form extends  React.Component {

	onSubmit() {
		this.props.form.validateFields({ force: true }, (error, value) => {
			if (!error) {
				finialValues = value;
				console.log()
				if(value.sex !=undefined) {
					finialValues.sex = value.sex[0];
				}
				if(value.type != undefined) {
					finialValues.type = value.type[0];
				}
				if(value.startTime != undefined) {
					finialValues.startTime = value.startTime.getTime();
				}
				if(value.endTime != undefined) {
					finialValues.endTime = value.endTime.getTime();
				}
				this.props.onSubmit();
			} else {
				console.log(error);
			}
		});
	}
	render() {
		const { getFieldProps } = this.props.form;
		const IntentionDegree = [
			{label: 'A类', value: 'A'},
			{label: 'B类', value: 'B'},
			{label: 'C类', value: 'C'}
		]
		const gender = [
			{label: '男', value: 0},
			{label: '女', value: 1}
		]
		return (
			<form>
				<List>
					<Picker data={IntentionDegree} cols={1} {...getFieldProps('type')}>
						<List.Item arrow="horizontal">意向度</List.Item>
					</Picker>
					<Picker data={gender} cols={1} {...getFieldProps('sex')}>
						<List.Item arrow="horizontal">性别</List.Item>
					</Picker>
					<InputItem
						{...getFieldProps('name')}
						clear
						placeholder="请输入信息"
						style={{textAlign:'right'}}
					>客户姓名</InputItem>
					<InputItem
						{...getFieldProps('code')}
						type="phone"
						clear
						placeholder="请输入信息"
						style={{textAlign:'right'}}
					>电话</InputItem>
					<InputItem
						{...getFieldProps('city')}
						clear
						placeholder="请输入信息"
						style={{textAlign:'right'}}
					>地区</InputItem>
				</List>
				<WhiteSpace />
				<List>
					<DatePicker
						mode="date"
						{...getFieldProps('startTime')}
					>
						<List.Item arrow="horizontal">开始时间</List.Item>
					</DatePicker>
					<DatePicker
						mode="date"
						{...getFieldProps('endTime')}
					>
						<List.Item arrow="horizontal">结束时间</List.Item>
					</DatePicker>
				</List>
				<div className="search-button" onClick={this.onSubmit.bind(this)}>搜索</div>
			</form>
		)
	}

}
const FormWrapper = createForm()(Form);

class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
			cityJson: [],
			filter: {
				current: 1,
				size: 100
			}
        }
    }

	back() {
		browserHistory.goBack()
	}

	onSubmit() {
		const state = this.state;
		let params = {};
		params = Object.assign(state.filter, finialValues);
		ApiCaller.call(Api.user.list, JSON.stringify(params), (res) => {
			if (res.code == 0) {
				if(res.data.total == 0) {
					Toast.info("暂无搜索结果！");
				} else {
					browserHistory.push({
						pathname: '/alllist',
						query: {
							params: JSON.stringify(params)
						}
					})
				}
			}
		})
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
				>搜索
				</NavBar>
				<FormWrapper onSubmit={this.onSubmit.bind(this)}/>
            </div>
        )
    }
}

export default connect(state => ({
    user: state.user
}), dispath => ({
    actions: bindActionCreators(Actions, dispath)
}))(Search)
module.exports = exports['default']
