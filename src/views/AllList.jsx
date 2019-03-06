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

class AllList extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			open: false,
			data: [],
            filter: {
                current: 1,
                size: 100,
            }
		}
	}

	componentDidMount() {
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
		browserHistory.push('/purposelist')
	}

	deallist() {
		browserHistory.push('/deallist')
	}

	alllist() {
		this.setState({ open: !this.state.open });
	}

	loginout() {
        Cookie.remove('token', {path: '/'});
        location.href = '/'
	}

	render() {
        const state = this.state;
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
        let item = state.data.map(item =>
            <Item multipleLine onClick={this.detail.bind(this, item.id)}>
                <div className="my-list-content" >
                    <span className="name">{item.name}</span><span>电话:{item.code}</span>
                    {item.lessonState==0?<span className="icon_new"></span>:null}
                    {item.type=='A'?<span className="icon_type_a"></span>:(item.type=='B'?<span className="icon_type_b"></span>:(item.type=='C'?<span className="icon_type_c"></span>:null))}
                </div>
                {item.lessonRecords.length==0?
					<div className="my-list-info">
						电话状态:<span className={item.callState==2?'status':'err-status'}>{item.callState==0?'空号':(item.callState==1?'未接':(item.callState==2?'已接':'错号'))}</span>
						<span className="address">公司:{item.company}</span>
					</div>:null}
                {item.lessonRecords.map(i =>
                    <div className="my-list-info new-status">
                        <span className="lesson-name">课程名称:{i.name}</span>
                        <span className="total">报名人数:{i.total}</span>
                    </div>
                )}
				{item.followTime ? <div className="my-list-time">下次跟进时间:2019-12-31</div> : null}
            </Item>
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
					全部客户
				</NavBar>
				<Drawer
					className="my-drawer"
					style={{ minHeight: document.documentElement.clientHeight }}
					touch={false}
					sidebar={sidebar}
					open={this.state.open}
					onOpenChange={this.onOpenChange}
				>
					<div className="ov" style={{}}>
						<List className="my-list">
							{item}
						</List>
						<div className="op"></div>
					</div>
				</Drawer>
			</div>
		)
	}
}

export default connect(state => ({
	user: state.user
}), dispath => ({
	actions: bindActionCreators(Actions, dispath)
}))(AllList)
module.exports = exports['default']
