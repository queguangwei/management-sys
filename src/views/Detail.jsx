import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import * as Actions from '../store/actions'
import { bindActionCreators } from 'redux'
import ApiCaller from '../utils/ApiCaller'
import Api from '../constants/Api'
import { NavBar, Icon } from 'antd-mobile'

class Detail extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			data: [],
		}
	}

	back() {
		browserHistory.push('/')
	}

	edit() {
		browserHistory.push('/')
	}

	followUp() {
		browserHistory.push('/followup')
	}

	deal() {
		browserHistory.push('/deal')
	}

	componentDidMount() {

	}

	render() {
		return (
			<div>
				<NavBar
					mode="dark"
					icon={<Icon type="left"/>}
					onLeftClick={this.back.bind(this)}
					rightContent={<span onClick={this.edit.bind(this)}>编辑</span>}
				>
					客户详情
				</NavBar>
				<div className="detail">
					<div className="detail-bg"></div>
					<div className="detail-layout">
						<div className="detail-content">
							<div className="detail-content-box">
								<div className="">

								</div>
							</div>
						</div>
						<div className="detail-lesson">
							<p className="title">课程数（2）</p>
							<ul className="detail-lesson-list">
								<li>
									<h4>课程名称：舌行演讲
										<span>报名人数：3</span>
									</h4>
									<p>
										<div>1.王小峰 13456409654 高级采购员</div>
										<div>2.胡不大 13456788884 hr人员</div>
										<div>1.王小峰 13456409654 高级采购员</div>
									</p>
								</li>
								<li>
									<h4>课程名称：舌行演讲
										<span>报名人数：3</span>
									</h4>
									<p>
										<div>1.王小峰 13456409654 高级采购员</div>
										<div>2.胡不大 13456788884 hr人员</div>
										<div>1.王小峰 13456409654 高级采购员</div>
									</p>
								</li>
							</ul>
						</div>
						<div className="detail-record">
							<p className="title">跟进记录（0次）</p>
							<ul className="detail-record-list">
								<li>
									<h4>跟进时间：2018-12-30</h4>
									<p>去客户那边洽谈一些和合同相关的事项，尽量让客户签掉合 同。去见客户最好带一些客户喜欢的礼物，那样客户会比较 高兴，谈起来更融洽。</p>
								</li>
								<li>
									<h4>跟进时间：2019-02-24</h4>
									<p>去客户那边签合同</p>
								</li>
							</ul>
						</div>
						<div className="op"></div>
					</div>
				</div>
				<div className="bottom-button">
					<button className="bottom-button-yel" onClick={this.followUp.bind(this)}>添加跟进</button>
					<button className="bottom-button-blu" onClick={this.deal.bind(this)}>成交</button>
				</div>
			</div>
		)
	}
}

export default connect(state => ({
	user: state.user
}), dispath => ({
	actions: bindActionCreators(Actions, dispath)
}))(Detail)
module.exports = exports['default']
