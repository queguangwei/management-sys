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
			type: '',
			data: [],
		}
	}

	back() {
		browserHistory.goBack()
	}

	edit() {
		browserHistory.push('/edit')
	}
    //新进 设意向
	set() {
        browserHistory.push('/purposelist')
	}
    //成交 新增课程
	add() {
        browserHistory.push('/deal')
	}
    //意向 跟进
	followUp() {
		browserHistory.push('/followup')
	}
    //意向 成交
	deal() {
		browserHistory.push('/deal')
	}

	componentDidMount() {
		this.setState({type: this.props.location.query.type})
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
								<div className="top">
									<div className="headerimg"></div>
									<div className="headerinfo">
										<span>高勤斯维</span>
										先生 30岁
										{this.state.type=='new'?
											<i className="new"></i>:
											<i className="classa"></i>
										}
									</div>
									<div className="headerinfo">
										高级财务/杭州帽科技有限公司
									</div>
								</div>
								<div className="bottom">
									<p>
										<span>电话:<a href="tel:13867896470">13867896470</a></span>
										<span>电话状态:未接</span>
									</p>
									<p>
										<span>微信:wahaha372</span>
										<span>意向度:A类</span>
									</p>
									<p>
										<span>区域:浙江省杭州市</span>
									</p>
									<p>身份证:330382199087554328</p>
								</div>
							</div>
						</div>
						{this.state.type!='new'?
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
							</div>:null
						}
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
								<div className="no-record">
									<h4>此客户没有跟进记录，您可以</h4>
									<p>点击下方设为意向客户进行跟进</p>
								</div>
							</ul>
						</div>
						<div className="op"></div>
					</div>
				</div>
				{this.state.type=='new'?
					<div className="bottom-button">
						<button className="bottom-button-blu" onClick={this.set.bind(this)}>设为意向</button>
					</div>:
					this.state.type=='deal'?
						<div className="bottom-button">
							<button className="bottom-button-blu" onClick={this.add.bind(this)}>新增课程</button>
						</div>:
						<div className="bottom-button">
							<button className="bottom-button-yel fifty-per" onClick={this.followUp.bind(this)}>添加跟进</button>
							<button className="bottom-button-blu fifty-per" onClick={this.deal.bind(this)}>成交</button>
						</div>
				}
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
