import React from 'react'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'
import * as Actions from '../store/actions'
import { bindActionCreators } from 'redux'
import ApiCaller from '../utils/ApiCaller'
import Api from '../constants/Api'
import { Drawer, List, NavBar, Icon, Tabs } from 'antd-mobile'
const Item = List.Item;
const Brief = Item.Brief;


class PurposeList extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			open: false,
			onUploading: false,
			data: [],
			momentHeader: [1],
			momentList: [1],
		}
	}

	componentDidMount() {

	}

	onOpenChange(...args) {

		this.setState({ open: !this.state.open });
	}

	search() {
		browserHistory.push('/search')
	}

	add() {
		browserHistory.push('/add')
	}

	detail() {
		browserHistory.push('/detail')
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

	}

	render() {
		const tabs = [
			{ title: 'A类', sub: '1'},
			{ title: 'B类', sub: '2' },
			{ title: 'C类', sub: '3' },
		];

		const sidebar = (
			<div>
				<List className="drawer-slider">
					<Item multipleLine>
						<div className="header-img">
						</div>
						<div style={{color:'#fff'}}>王大锤</div>
						<Brief style={{color:'#fff'}}>13867896542</Brief>
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
					style={{ minHeight: document.documentElement.clientHeight }}
					touch={false}
					sidebar={sidebar}
					open={this.state.open}
					onOpenChange={this.onOpenChange}
				>
					<Tabs tabs={tabs}
						  initialPage={0}
						  onChange={(tab, index) => { console.log('onChange', index, tab); }}
					>
						<div>
							<List className="my-list">
								<Item multipleLine onClick={this.detail.bind(this)}>
									<div className="my-list-content" >
										<span className="name">王小迪</span><span>电话:13765765436</span>
									</div>
									<div className="my-list-info">
										电话状态:<span className="status">已接</span>
										<span className="address">公司:上海天天食品安全有限公司有限公</span>
									</div>
								</Item>
								<Item multipleLine onClick={() => {}}>
									<div className="my-list-content" >
										<span className="name">高勤斯维</span><span>电话:13868765436</span>
									</div>
									<div className="my-list-info">
										电话状态:<span className="err-status">未接</span>
										<span className="address">公司:杭州帽科技有限公司</span>
									</div>
									<div className="my-list-time">下次跟进时间:2019-12-31</div>
								</Item>
								<Item multipleLine onClick={() => {}}>
									<div className="my-list-content" >
										<span className="name">胡晴天</span><span>电话:13868765436</span>
									</div>
									<div className="my-list-info">
										电话状态:<span className="err-status">空号</span>
										<span className="address">公司:杭州哈哈有限公司</span>
									</div>
									<div className="my-list-time">下次跟进时间:2019-12-31</div>
								</Item>
								<Item multipleLine onClick={() => {}}>
									<div className="my-list-content" >
										<span className="name">哈哈炜</span><span>电话:13868765436</span>
									</div>
									<div className="my-list-info">
										电话状态:<span className="err-status">错号</span>
										<span className="address">公司:杭州哈哈有限公司</span>
									</div>
								</Item>
							</List>
						</div>
						<div>
							<List className="my-list">
								<Item multipleLine onClick={this.detail.bind(this)}>
									<div className="my-list-content" >
										<span className="name">王小迪</span><span>电话:13765765436</span>
									</div>
									<div className="my-list-info">
										电话状态:<span className="status">已接</span>
										<span className="address">公司:上海天天食品安全有限公司有限公</span>
									</div>
								</Item>
								<Item multipleLine onClick={() => {}}>
									<div className="my-list-content" >
										<span className="name">高勤斯维</span><span>电话:13868765436</span>
									</div>
									<div className="my-list-info">
										电话状态:<span className="err-status">未接</span>
										<span className="address">公司:杭州帽科技有限公司</span>
									</div>
									<div className="my-list-time">下次跟进时间:2019-12-31</div>
								</Item>
								<Item multipleLine onClick={() => {}}>
									<div className="my-list-content" >
										<span className="name">胡晴天</span><span>电话:13868765436</span>
									</div>
									<div className="my-list-info">
										电话状态:<span className="err-status">空号</span>
										<span className="address">公司:杭州哈哈有限公司</span>
									</div>
									<div className="my-list-time">下次跟进时间:2019-12-31</div>
								</Item>
								<Item multipleLine onClick={() => {}}>
									<div className="my-list-content" >
										<span className="name">哈哈炜</span><span>电话:13868765436</span>
									</div>
									<div className="my-list-info">
										电话状态:<span className="err-status">错号</span>
										<span className="address">公司:杭州哈哈有限公司</span>
									</div>
								</Item>
							</List>
						</div>
						<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
							Content of third tab
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
