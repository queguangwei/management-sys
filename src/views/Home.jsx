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


class Home extends React.Component {
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

    render() {
		const tabs = [
			{ title: '新进客户', sub: '1'},
			{ title: '意向客户', sub: '2' },
			{ title: '成交客户', sub: '3' },
		];

		const sidebar = (
			<List className="drawer-slider">
				<Item multipleLine>
					<div>王大锤</div>
					<Brief>13867896542</Brief>
				</Item>
				<Item className="drawer-slider-item">
					新进客户
				</Item>
				<Item className="drawer-slider-item">
					意向客户
				</Item>
				<Item className="drawer-slider-item">
					成交客户
				</Item>
				<Item className="drawer-slider-item">
					全部客户
				</Item>
				<Item className="drawer-slider-item">
					账号
				</Item>
				<Item className="drawer-slider-item">
					密码
				</Item>
			</List>);

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
					客户管理系统
				</NavBar>
				<Drawer
					className="my-drawer"
					style={{ minHeight: document.documentElement.clientHeight }}
					enableDragHandle
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
								<Item arrow="horizontal" multipleLine onClick={this.detail.bind(this)}>
									王小迪 电话:13765765436
									<Brief>电话状态:已接</Brief>
								</Item>
								<Item arrow="horizontal" multipleLine onClick={() => {}}>
									王小迪 电话:13765765436
									<Brief>电话状态:已接</Brief>
								</Item>
								<Item arrow="horizontal" multipleLine onClick={() => {}}>
									王小迪 电话:13765765436
									<Brief>电话状态:已接</Brief>
								</Item>
								<Item arrow="horizontal" multipleLine onClick={() => {}}>
									王小迪 电话:13765765436
									<Brief>电话状态:已接</Brief>
								</Item>
								<Item arrow="horizontal" multipleLine onClick={() => {}}>
									王小迪 电话:13765765436
									<Brief>电话状态:已接</Brief>
								</Item>
								<Item arrow="horizontal" multipleLine onClick={() => {}}>
									王小迪 电话:13765765436
									<Brief>电话状态:已接</Brief>
								</Item>
								<Item arrow="horizontal" multipleLine onClick={() => {}}>
									王小迪 电话:13765765436
									<Brief>电话状态:已接</Brief>
								</Item>
								<Item arrow="horizontal" multipleLine onClick={() => {}}>
									王小迪 电话:13765765436
									<Brief>电话状态:已接</Brief>
								</Item>
								<Item arrow="horizontal" multipleLine onClick={() => {}}>
									王小迪 电话:13765765436
									<Brief>电话状态:已接</Brief>
								</Item>
								<Item arrow="horizontal" multipleLine onClick={() => {}}>
									王小迪 电话:13765765436
									<Brief>电话状态:已接</Brief>
								</Item>
							</List>
						</div>
						<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
							Content of second tab
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
}))(Home)
module.exports = exports['default']
