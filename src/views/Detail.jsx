import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import * as Actions from '../store/actions'
import { bindActionCreators } from 'redux'
import ApiCaller from '../utils/ApiCaller'
import * as Format from '../utils/Format'
import Api from '../constants/Api'
import { NavBar, Icon, Toast } from 'antd-mobile'

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
		browserHistory.push('/edit')
	}
    //新进客户 设意向
	set() {
        this.modifyCustomerStatus(1)
	}
    //成交客户 新增课程
	add() {
        browserHistory.push('/deal')
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
        this.modifyCustomerStatus(2)
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
				state.info.age = this.checkAge(res.data.user.idCard);
				this.setState(state);
			} else {

			}
		})
	}

    checkAge(idCard) {
	    console.log(idCard)
        let len = (idCard + "").length;
        if (len == 0) {
            return 0;
        } else {
            if ((len != 15) && (len != 18))//身份证号码只能为15位或18位其它不合法
            {
                return 0;
            }
        }
        let strBirthday = "";
        if (len == 18)//处理18位的身份证号码从号码中得到生日和性别代码
        {
            strBirthday = idCard.substr(6, 4) + "/" + idCard.substr(10, 2) + "/" + idCard.substr(12, 2);
        }
        if (len == 15) {
            strBirthday = "19" + idCard.substr(6, 2) + "/" + idCard.substr(8, 2) + "/" + idCard.substr(10, 2);
        }
        //时间字符串里，必须是“/”
        let birthDate = new Date(strBirthday);
        let nowDateTime = new Date();
        let age = nowDateTime.getFullYear() - birthDate.getFullYear();
        //再考虑月、天的因素;.getMonth()获取的是从0开始的，这里进行比较，不需要加1
        if (nowDateTime.getMonth() < birthDate.getMonth() || (nowDateTime.getMonth() == birthDate.getMonth() && nowDateTime.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
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
                    <div>1.王小峰 13456409654 高级采购员</div>
                    <div>2.胡不大 13456788884 hr人员</div>
                    <div>1.王小峰 13456409654 高级采购员</div>
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
                                        {info.sex==0?'先生':'女生'} {info.age}岁
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
										<span>意向度:{info.type}类</span>
									</p>
									<p>
										<span>区域:{info.province}{info.city}</span>
									</p>
									<p>身份证:{info.idCard}</p>
								</div>
							</div>
						</div>
						{type!=0?
							<div className="detail-lesson">
								<p className="title">课程数（{lessonData.length}）</p>
								<ul className="detail-lesson-list">
                                    {lesLi}

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
							<p className="title">跟进记录（{followData.length}次）</p>
							<ul className="detail-record-list">
                                {fLi}
                                {followData.length==0?
                                    <div className="no-record">
                                        <h4>此客户没有跟进记录，您可以</h4>
                                        <p>点击下方设为意向客户进行跟进</p>
                                    </div>:null}
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
