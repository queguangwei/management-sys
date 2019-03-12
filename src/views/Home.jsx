import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import * as Actions from '../store/actions'
import { bindActionCreators } from 'redux'
import Cookie from "../utils/Cookie"
import ApiCaller from '../utils/ApiCaller'
import Api from '../constants/Api'
import { Drawer, List, NavBar, Icon, ListView } from 'antd-mobile'
import * as Format from "../utils/Format";

const Item = List.Item;
const Brief = Item.Brief;

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            height: '',
			open: false,
            data: [],
			filter: {
				current: 1,
				size: 300,
				lessonState: 0,
			}
        }
    }

    componentDidMount() {
        this.getCustomerList(this.state.filter);
        let hh = document.getElementsByClassName("am-navbar")[0].offsetHeight;
        let height = document.body.clientHeight - hh;
        this.setState({height: height});
    }

	getCustomerList(filter) {
    	const state = this.state;
		ApiCaller.call(Api.user.list, JSON.stringify(filter), (res) => {
			if (res.code == 0) {
				state.data = res.data.records;
				state.pages = res.data.pages;
				state.total = res.data.total;
				this.setState(state);
			} else {

			}
		})
	}

	onOpenChange() {
		this.setState({ open: !this.state.open });
	}

	home() {
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

	purposelist() {
		browserHistory.push('/purposelist')
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

    render() {
		let state = this.state;
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
					<span className="name">{item.name}</span><span>电话:{item.code}</span><span className="icon_new"></span>
				</div>
				<div className="my-list-info">
					电话状态:
                    <span className={item.callState==2?'status':'err-status'}>{item.callState==0?'空号':(item.callState==1?'未接':(item.callState==2?'已接':'错号'))}</span>
					<span className="address">公司:{item.company}</span>
				</div>
                {item.nextFollowTime ? <div className="my-list-time">下次跟进时间:{Format.date(item.nextFollowTime, 'yyyy-MM-dd')}</div> : null}
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
					新进客户
				</NavBar>
				<Drawer
					className="my-drawer"
					style={{ minHeight: state.height + 'px' }}
					touch={false}
					sidebar={sidebar}
					open={this.state.open}
					onOpenChange={this.onOpenChange}
				>
                    <div className="ov">
                        <List className="my-list">
                            {item}
                        </List>
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
}))(Home)
module.exports = exports['default']
