import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import * as Actions from '../store/actions'
import { bindActionCreators } from 'redux'
import ApiCaller from '../utils/ApiCaller'
import * as Format from '../utils/Format'
import * as VailddateHelper from '../utils/ValidateHelper'
import Api from '../constants/Api'
import {NavBar, Icon, Toast, Modal} from 'antd-mobile'
const alert = Modal.alert;

class Detail extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
            type: null,     //新进(0), 意向(1), 成交(2)
            userId: '',
            info: {},
            followData: [],
            lessonData: [],
        }
	}

	back() {
		browserHistory.goBack()
	}

	edit() {
        browserHistory.push({
            pathname: '/edit',
            query: {
                id: this.state.userId
            }
        })
	}
    //新进客户 设意向
	set() {
        if(this.state.info.type == '') {
            Toast.info("请先设置意向度!",2);
            return
        }
        alert('提交', '确认设为意向客户吗???', [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确定', onPress: () => this.modifyCustomerStatus(1) },
        ]);
	}
    //成交客户 新增课程
	add() {
        const state = this.state;
        browserHistory.push({
            pathname: '/deal',
            query: {
                id: state.userId
            }
        })
	}
    //意向客户 跟进
	followUp() {
	    const state = this.state;
        browserHistory.push({
            pathname: '/followup',
            query: {
                id: state.userId
            }
        })
	}
    //意向客户 成交
	deal() {
        alert('成交', '确认成交吗???', [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确定', onPress: () => this.modifyCustomerStatus(2) },
        ]);
	}

	modifyCustomerStatus(status) {
	    const state = this.state;
	    const user = {
            lessonState: status
        }
        const params = {
            userId: state.userId,
            user: user
        }
        ApiCaller.call(Api.user.edit, JSON.stringify(params), (res) => {
            if (res.code == 0) {
                if(status == 1) {
                    browserHistory.push('/purposelist')
                }else if (status == 2) {
                    browserHistory.push('/deallist')
                }
            } else {
                Toast.info(res.msg, 2);
            }
        })
    }

	getCustomerDetail(userId) {
		const state = this.state;
		ApiCaller.call(Api.user.info, JSON.stringify({userId: userId}), (res) => {
			if (res.code == 0) {
			    state.type = res.data.user.lessonState;
			    state.userId = res.data.user.id;
				state.info = res.data.user;
				state.followData = res.data.followRecords;
				state.lessonData = res.data.lessonRecords;
				state.info.cellphoneState = this.checkCallStatus(res.data.user.callState);
				state.info.age = VailddateHelper.checkIdCardAge(res.data.user.idCard);
				this.setState(state);
			} else {

			}
		})
	}

    checkCallStatus(status) {
        let sta = '';
        if(status == 0) {
            sta = '空号'
        }else if (status == 1) {
            sta = '未接'
        }else if(status == 2) {
            sta = '已接'
        }else {
            sta = '错号'
        }
        return sta;
    }

	componentDidMount() {
		this.getCustomerDetail(this.props.location.query.id);
	}

	render() {
        let { type, info, followData, lessonData } = this.state;
        let fLi = followData.map(item =>
            <li>
                <h4>跟进时间：{Format.date(item.followTime, 'yyyy-MM-dd')}</h4>
                <p>{item.remark}</p>
            </li>
        );
        let lesLi = lessonData.map(item =>
            <li>
                <h4>课程名称：{item.name}
                    <span>报名人数：{item.total}</span>
                </h4>
                <p>
                    {item.lessonUsers.map((v, i) =>
                        <div>{i+1}.{v.name}  {v.code}  {v.job}</div>
                    )}
                </p>
            </li>
        );
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
										<span>{info.name}</span>
                                        {info.sex==0?'先生':'女士'} {info.age}岁
										{type==0?
											<i className="new"></i>:
											<i className={info.type=='A'?'classa':(info.type=='B'?'classb':'classc')}></i>
										}
									</div>
									<div className="headerinfo">
                                        {info.job}/{info.company}
									</div>
								</div>
								<div className="bottom">
									<p>
										<span>电话:<a href="tel:13867896470">{info.code}</a></span>
                                        <span>电话状态:<span className={info.callState==2?'status-gre':'status-red'}>{info.cellphoneState}</span></span>
									</p>
									<p>
										<span>微信:{info.wx}</span>
										<span>意向度:{info.type?info.type:'~~'}类</span>
									</p>
									<p>
										<span className="area">区域:{info.province}{info.city}</span>
									</p>
									<p>身份证:{info.idCard}</p>
								</div>
							</div>
						</div>
						{type==2?
							<div className="detail-lesson">
								<p className="title">课程数（{lessonData.length}）<span className="total">成交金额:{info.totalPrice?info.totalPrice:'0'}元</span></p>
								<ul className="detail-lesson-list">
                                    {lesLi}
                                    {lessonData.length==0?
                                        <div className="no-lesson">
                                            <h4>此客户还没有添加课程</h4>
                                            <p>点击下方新增课程按钮进行添加</p>
                                        </div>:null}
								</ul>
							</div>:null
						}
						<div className="detail-record">
							<p className="title">跟进记录（{followData.length}次）</p>
							<ul className="detail-record-list">
                                {fLi}
                                {followData.length==0&&info.lessonState==0?
                                    <div className="no-record">
                                        <h4>此客户没有跟进记录，您可以</h4>
                                        <p>点击下方设为意向客户进行跟进</p>
                                    </div>:(followData.length==0?
                                        <div className="no-record">
                                            <h4>此客户没有跟进记录，您可以</h4>
                                            <p>点击下方添加按钮进行跟进</p>
                                        </div>:null)}
							</ul>
						</div>
						<div className="op"></div>
					</div>
				</div>
				{type==0?
					<div className="bottom-button">
						<button className="bottom-button-blu" onClick={this.set.bind(this)}>设为意向</button>
					</div>:
					type==2?
						<div className="bottom-button">
							<button className="bottom-button-yel fifty-per" onClick={this.followUp.bind(this)}>添加跟进</button>
							<button className="bottom-button-blu fifty-per" onClick={this.add.bind(this)}>新增课程</button>
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
