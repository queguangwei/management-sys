import React from 'react'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'
import * as Actions from '../store/actions'
import { bindActionCreators } from 'redux'
import Cookie from "../utils/Cookie"
import ApiCaller from '../utils/ApiCaller'
import Api from '../constants/Api'
import { Drawer, List, NavBar, Icon } from 'antd-mobile'
const Item = List.Item;
const Brief = Item.Brief;

class DealList extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			height: '',
			open: false,
			data: [],
            filter: {
                current: 1,
                size: 300,
                lessonState: 2,
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
        console.log(filter)
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
		this.setState({ open: !this.state.open });
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
                    <span className="name">{item.name}</span><span className="phone">电话:{item.code}</span>
                </div>
				<div className="my-list-info">
					<span className="total-price">成交金额:{item.totalPrice?item.totalPrice:'0'}</span>
					<span>公司:{item.company}</span>
				</div>
                {/*{item.lessonRecords.length==0?*/}
                    {/*<div className="my-list-info">*/}
                        {/*<span className="empty">此客户还没有添加课程</span>*/}
                    {/*</div>:null}*/}
                {/*{item.lessonRecords.map(i =>*/}
                    {/*<div className="my-list-info">*/}
                        {/*<span className="lesson-name">课程名称:{i.name}</span>*/}
                        {/*<span className="total">报名人数:{i.total}</span>*/}
                    {/*</div>*/}
                {/*)}*/}
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
					成交客户
				</NavBar>
				<Drawer
					className="my-drawer"
					style={{ minHeight: state.height + 'px' }}
					touch={false}
					sidebar={sidebar}
					open={this.state.open}
					onOpenChange={this.onOpenChange}
				>
                    <div className="ov" style={{}}>
                        <List className="my-list">
                            {item}

                            {/*<Item multipleLine onClick={() => {}}>*/}
                                {/*<div className="my-list-content" >*/}
                                    {/*<span className="name">高勤斯维</span><span>电话:13868765436</span>*/}
                                {/*</div>*/}
                                {/*<div className="my-list-info new-status">*/}
                                    {/*<span className="lesson-name">课程名称:舌行演讲</span>*/}
                                    {/*<span>报名人数:5</span>*/}
                                {/*</div>*/}
                            {/*</Item>*/}
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
}))(DealList)
module.exports = exports['default']
