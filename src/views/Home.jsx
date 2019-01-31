import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import * as Actions from '../store/actions'
import { bindActionCreators } from 'redux'
import ApiCaller from '../utils/ApiCaller'
import Api from '../constants/Api'
import { Drawer, List, NavBar, Icon } from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
			open: true,
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
		console.log(1);
	}

    render() {
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
						<Icon key="1" type="plus" />,
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
					<List className="my-list">
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
