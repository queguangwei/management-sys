import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import * as Actions from '../store/actions'
import { bindActionCreators } from 'redux'
import ApiCaller from '../utils/ApiCaller'
import Api from '../constants/Api'
import { NavBar, Icon, Modal, Picker, InputItem, List, Stepper, WhiteSpace, Toast } from 'antd-mobile'

const alert = Modal.alert;

class Deal extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
            userId: '',
			lessonArray: [],
            lessonList: [],
			lesson: [],
			price: null,
			fee: null,
			number: null,
			val: 1,
			lessonUsers: [{name: '', code: '', job: '', idCard:''}]
		}
	}

	back() {
		browserHistory.goBack()
	}

	save() {
		alert('保存', '确认保存吗???', [
			{ text: '取消', onPress: () => console.log('cancel') },
			{ text: '确定', onPress: () => this.handleSubmit() },
		]);
	}

	handleSubmit() {
        const state = this.state;
        if(state.lesson.length == 0) {
			Toast.info("请选择课程!",2);
        	return;
		}
        if(state.number < 1 || state.number == null) {
        	Toast.info("请输入课程期数!",2);
        	return;
		}
		for(let i = 0; i < state.lessonUsers.length; i ++) {
			for(let j in state.lessonUsers[i]) {
				if(state.lessonUsers[i][j] == '' || state.lessonUsers[i][j] == null) {
					Toast.info("请补全报名人信息！", 2);
					return;
				}
			}
		}
        const params = {
            userId: state.userId,
            lessonRecord: {
                lessonId: state.lesson[0],
				totalPrice: state.fee,
				number: state.number,
				lessonUsers: state.lessonUsers
            }
        }
		console.log(params)
        ApiCaller.call(Api.user.addLesson, JSON.stringify(params), (res) => {
            if (res.code == 0) {
            	browserHistory.goBack();

            } else {
                Toast.info(res.msg, 2);
            }
        })
	}

    getLessonList() {
		const state = this.state;
        ApiCaller.call(Api.other.lessonList, JSON.stringify({}), (res) => {
            if (res.code == 0) {
            	let list = [];
            	for(let i = 0;i < res.data.length; i ++) {
            		let obj = {
            			label: res.data[i].name,
						value: res.data[i].id
					}
					list.push(obj);
				}
                state.lessonList = list;
            	state.lessonArray = res.data;
				this.setState(state)
            } else {

            }
        })
    }

	priceChange(value) {
		const state = this.state;
		state.price = value;
		state.fee = value * state.val;
		this.setState(state);
	}

	onChange(val) {
		const state = this.state;
		let lessonUsers = state.lessonUsers;
		let index = this.state.lessonUsers.length;
		let user = {name: '', code: '', job: '', idCard: ''}
		if(val > index) {
			lessonUsers.push(user);
		}else {
			lessonUsers.pop();
		}
		let fee = val * this.state.price;
		state.val = val;
		state.fee = fee;
		state.lessonUsers = lessonUsers;
		this.setState(state);
	}

	lessonChange(value) {
		const state = this.state;
		for(let i = 0; i < state.lessonArray.length; i ++) {
			if(value[0] == state.lessonArray[i].id) {
				state.price = state.lessonArray[i].price;
			}
		}
		state.lesson = value;
		state.fee = state.price * state.val;
		this.setState(state);
	}

	numberChange(value) {
		const state = this.state;
		state.number = value;
		this.setState(state);
	}

	onInputChange(index, item, fileds, value) {
		let obj = this.state.lessonUsers;
		obj[index][fileds] = value;
		this.setState({lessonUsers: obj});
	}

	componentDidMount() {
		const state = this.state;
		state.userId = this.props.location.query.id;
        this.setState(state)
        this.getLessonList()
	}

	render() {
		const state = this.state;
		const formItems = state.lessonUsers.map((item, index) =>
			<div style={{background:'#F0F0F0'}}>
				<List key={index}>
					<InputItem
						value={item.name}
						clear
						placeholder="请输入信息"
						style={{textAlign:'right'}}
						onChange={this.onInputChange.bind(this, index, item, 'name')}
					>姓名</InputItem>
					<InputItem
						value={item.code}
						type="number"
						clear
						maxLength={11}
						placeholder="请输入信息"
						style={{textAlign:'right'}}
						onChange={this.onInputChange.bind(this, index, item, 'code')}
					>电话</InputItem>
					<InputItem
						value={item.job}
						clear
						placeholder="请输入信息"
						style={{textAlign:'right'}}
						onChange={this.onInputChange.bind(this, index, item, 'job')}
					>职位</InputItem>
					<InputItem
						value={item.idCard}
						type="number"
						clear
						placeholder="请输入信息"
						style={{textAlign:'right'}}
						maxLength={18}
						onChange={this.onInputChange.bind(this, index, item, 'idCard')}
					>身份证</InputItem>
				</List>
				<WhiteSpace size="xs"/>
			</div>);
		return (
			<div>
				<NavBar
					mode="dark"
					icon={<Icon type="left"/>}
					onLeftClick={this.back.bind(this)}
					rightContent={<span onClick={this.save.bind(this)}>完成</span>}
				>
					新增课程
				</NavBar>
				<form onSubmit={this.handleSubmit.bind(this)}>
					<List>
						<Picker
							data={state.lessonList}
							cols={1}
							value={state.lesson}
							onChange={this.lessonChange.bind(this)}
						>
							<List.Item arrow="horizontal">课程名称</List.Item>
						</Picker>
						<InputItem
							value={state.number}
							type="number"
							placeholder="请输入信息"
							onChange={this.numberChange.bind(this)}
							style={{textAlign:'right'}}
						>期数</InputItem>
						<InputItem
							value={state.price}
							type="money"
							placeholder="请选择课程"
							onChange={this.priceChange.bind(this)}
						>课程单价</InputItem>
						<List.Item
							wrap
							extra={
								<Stepper
									style={{ width: '100%', minWidth: '100px' }}
									showNumber
									max={10}
									min={1}
									value={state.val}
									onChange={this.onChange.bind(this)}
								/>}
						>
							人数
						</List.Item>
						<InputItem
							value={state.fee}
							type="money"
							disabled
							placeholder="请选择课程"
						>费用</InputItem>
					</List>
					<WhiteSpace />
					<List>
						{formItems}
					</List>
				</form>
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
