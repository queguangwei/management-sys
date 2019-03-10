import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import * as Actions from '../store/actions'
import { bindActionCreators } from 'redux'
import Cookie from "../utils/Cookie"
import ApiCaller from '../utils/ApiCaller'
import Api from '../constants/Api'
import { Drawer, List, NavBar, Icon, Tabs } from 'antd-mobile'
const Item = List.Item;
const Brief = Item.Brief;

class PurposeList extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			height: '',
			open: false,
			data: [],
			filter: {
				current: 1,
				size: 300,
				lessonState: 1,
				type: 'A'
			}
		}
	}

	componentDidMount() {
		let hh = document.getElementsByClassName("am-navbar")[0].offsetHeight;
		let height = document.body.clientHeight - hh;
		this.setState({height: height})
		this.getCustomerList(this.state.filter);
	}

	getCustomerList(filter) {
		const state = this.state;
		ApiCaller.call(Api.user.list, JSON.stringify(filter), (res) => {
			if (res.code == 0) {
				state.data = res.data.records;
				this.setState(state);
			} else {

			}
		})
	}

	onOpenChange() {
		this.setState({ open: !this.state.open });
	}

	search() {
		browserHistory.push('/search')
	}

	add() {
		browserHistory.push('/add')
	}

	detail(id) {
		browserHistory.push({
			pathname: '/detail',
			query: {
				id: id
			}
		})
	}

	home() {
		browserHistory.push('/')
	}

	purposelist() {
		this.setState({ open: !this.state.open })
	}

	deallist() {
		browserHistory.push('/deallist')
	}

	alllist() {
		browserHistory.push('/alllist')
	}

	loginout() {
		Cookie.remove('token', {path: '/'});
		location.href = '/'
	}

	onTabChange(index) {
		const state = this.state;
		state.filter = {
			current: 1,
			size: 300,
			lessonState: 1,
			type: index.sub
		}
		this.setState(state);
		this.getCustomerList(this.state.filter);
	}


	render() {
		let state = this.state;
		const tabs = [
			{ title: 'A类', sub: 'A'},
			{ title: 'B类', sub: 'B' },
			{ title: 'C类', sub: 'C' },
		];
		const sidebar = (
			<div>
				<List className="drawer-slider">
					<Item multipleLine>
						<div className="header-img">
						</div>
						<div style={{color:'#fff'}}>{this.props.user.get('operator').get('name')}</div>
						<Brief style={{color:'#fff'}}>{this.props.user.get('operator').get('code')}</Brief>
					</Item>
					<Item className="drawer-slider-item" onClick={this.home.bind(this)}>
						新进客户
					</Item>
					<Item className="drawer-slider-item" onClick={this.purposelist.bind(this)}>
						意向客户
					</Item>
					<Item className="drawer-slider-item" onClick={this.deallist.bind(this)}>
						成交客户
					</Item>
					<Item className="drawer-slider-item" onClick={this.alllist.bind(this)}>
						全部客户
					</Item>
				</List>
				<div className="login-out" onClick={this.loginout.bind(this)}>
					<div className="login-out-icon"></div>
					<div className="login-out-button">退出</div>
				</div>
			</div>
		);
		let item = state.data.map(item =>
			<Item multipleLine onClick={this.detail.bind(this, item.id)}>
				<div className="my-list-content" >
					<span className="name">{item.name}</span><span>电话:{item.code}</span><span className={item.type=='A'?'icon_type_a':(item.type=='B'?'icon_class_b':'icon_class_c')}></span>
				</div>
				<div className="my-list-info">
					电话状态:
					<span className={item.callState==2?'status':'err-status'}>{item.callState==0?'空号':(item.callState==1?'未接':(item.callState==2?'已接':'错号'))}</span>
					<span className="address">公司:{item.company}</span>
				</div>
				{item.followTime?<div className="my-list-time">下次跟进时间:2019-12-31</div>:null}
			</Item>
		)
		return (
			<div className="">
				<NavBar
					icon={<Icon type="ellipsis" />}
					onLeftClick={this.onOpenChange.bind(this)}
					rightContent={[
						<Icon key="0" type="search" style={{ marginRight: '16px' }} onClick={this.search.bind(this)}/>,
						<Icon key="1" type="plus" onClick={this.add.bind(this)}/>,
					]}
				>
					意向客户
				</NavBar>
				<Drawer
					className="my-drawer"
					style={{ minHeight: state.height + 'px' }}
					touch={false}
					sidebar={sidebar}
					open={this.state.open}
					onOpenChange={this.onOpenChange}
				>
					<Tabs tabs={tabs}
						  initialPage={0}
						  onChange={this.onTabChange.bind(this)}
					>
						{/* tabA */}
                        <div className="ov" style={{}}>
                            <List className="my-list">
                                {item}
                            </List>
                            <div className="op"></div>
                        </div>
						{/* tabB */}
                        <div className="ov" style={{}}>
                            <List className="my-list">
                                {item}
                            </List>
                            <div className="op"></div>
                        </div>
						{/* tabC */}
                        <div className="ov" style={{}}>
                            <List className="my-list">
                                {item}
                            </List>
                            <div className="op"></div>
                        </div>
					</Tabs>

				</Drawer>
			</div>
		)
	}
}

export default connect(state => ({
	user: state.user
}), dispath => ({
	actions: bindActionCreators(Actions, dispath)
}))(PurposeList)
module.exports = exports['default']
