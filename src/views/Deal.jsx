import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import * as Actions from '../store/actions'
import { bindActionCreators } from 'redux'
import ApiCaller from '../utils/ApiCaller'
import Api from '../constants/Api'
import { NavBar, Icon, Modal, Picker, InputItem, List, Stepper, WhiteSpace } from 'antd-mobile'

const alert = Modal.alert;
let finialValues = {}

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
			data: [],
			val: 1,
			keys: [1]
		}
	}

	back() {
		browserHistory.goBack()
	}

	save() {
		alert('保存', '确认保存吗???', [
			{ text: '取消', onPress: () => console.log('cancel') },
			{ text: '确定', onPress: () => this.handleSubmit(finialValues) },
		])

	}

	handleSubmit(values) {
		console.log(values)
        const state = this.state;
        const params = {
            userId: state.userId,
            lessonRecord: {
                lessonId: ''
            }
        }
        let lessonUsers = []
        let users = {
            name: '',
            code: '',
            job: '',
            company: ''
        }

        ApiCaller.call(Api.user.addLesson, JSON.stringify(params), (res) => {
            if (res.code == 0) {
                if(status == 1) {
                    browserHistory.push('/purposelist')
                }else if (status == 2) {
                    browserHistory.push('/deallist')
                }
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

	onChange(val) {
		console.log(val);
		let keys = []
		for(let i = 1;i <= val;i ++) {
			keys.push(val)
		}
		this.setState({ val, keys });
	}

	lessonChange(value) {
		const state = this.state;
		for(let i = 0; i < state.lessonArray.length; i ++) {
			if(value[0] == state.lessonArray[i].id) {
				state.price = state.lessonArray[i].price;
			}
		}
		state.lesson = value;
		this.setState(state);
	}

	componentDidMount() {
        this.setState({userId: this.props.location.query.id})
        this.getLessonList()
	}

	render() {
		const state = this.state;
		const formItems = this.state.keys.map((k, index) => {
			return (
				<div style={{background:'#F0F0F0'}}>
					<List>
						<InputItem
							value={state.name}
							clear
							placeholder="请输入信息"
							style={{textAlign:'right'}}
						>姓名</InputItem>
						<InputItem
							value={state.code}
							type="phone"
							clear
							placeholder="请输入信息"
							style={{textAlign:'right'}}
						>电话</InputItem>
						<InputItem
							value={state.job}
							clear
							placeholder="请输入信息"
							style={{textAlign:'right'}}
						>职位</InputItem>
					</List>
					<WhiteSpace size="xs"/>
				</div>
			)
		});
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
							value={state.price}
							type="money"
							disabled
							placeholder="请选择课程"
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
