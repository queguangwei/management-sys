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
		console.log(args);
		this.setState({ open: !this.state.open });
	}

    render() {
		const sidebar = (<List>
			{[0, 1, 2, 3, 4, 5].map((i, index) => {
				if (index === 0) {
					return (<List.Item key={index}
									   thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
									   multipleLine
					>Category</List.Item>);
				}
				return (<List.Item key={index}
								   thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
				>Category{index}</List.Item>);
			})}
		</List>);

        return (
            <div className="">
				<NavBar
					icon={<Icon type="ellipsis" />}
					onLeftClick={this.onOpenChange.bind(this)}
					rightContent={[
						<Icon key="0" type="search" style={{ marginRight: '16px' }} />,
						<Icon key="1" type="plus" />,
					]}>
					客户管理系统
				</NavBar>
				<Drawer
					className="my-drawer"
					style={{ minHeight: document.documentElement.clientHeight }}
					enableDragHandle
					contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
					sidebar={sidebar}
					open={this.state.open}
					onOpenChange={this.onOpenChange.bind(this)}
				>
					<List renderHeader={() => 'Subtitle'} className="my-list">
						<Item arrow="horizontal" multipleLine onClick={() => {}}>
							Title <Brief>subtitle</Brief>
						</Item>
						<Item
							arrow="horizontal"
							multipleLine
							onClick={() => {}}
							platform="android"
						>
							ListItem （Android）<Brief>There may have water ripple effect of <br /> material if you set the click event.</Brief>
						</Item>
						<Item
							arrow="horizontal"
							thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
							multipleLine
							onClick={() => {}}
						>
							Title <Brief>subtitle</Brief>
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
