import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import * as Actions from '../store/actions'
import { bindActionCreators } from 'redux'
import ApiCaller from '../utils/ApiCaller'
import Api from '../constants/Api'
import { NavBar, Icon, Modal, Toast, DatePicker, TextareaItem, List, WhiteSpace } from 'antd-mobile'

const alert = Modal.alert;

class FollowUp extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
		    userId: '',
            followDate: '',
            followTime: '',
            remark: ''
		}
	}

	back() {
		browserHistory.goBack()
	}

	save() {
		alert('保存', '确认保存吗???', [
			{ text: '取消', onPress: () => console.log('cancel') },
			{ text: '确定', onPress: () => this.handleSubmit() },
		])
	}

    handleSubmit() {
        const state = this.state;
        if(state.followTime == '') {
            Toast.info("请选择跟进时间！", 2);
            return;
        }
	    if(state.remark =='' || state.remark == null) {
            Toast.info("跟进内容为空！",2);
            return;
        }
	    const params = {
            userId: state.userId,
            record: {
                followTime: state.followTime,
                remark: state.remark
            }
        }
        ApiCaller.call(Api.user.addFollowRecord, JSON.stringify(params), (res) => {
            if (res.code == 0) {
                browserHistory.goBack()
            } else {
                Toast.info(res.msg, 2);
            }
        })
    }

    handleChange(value) {
	    this.setState({followDate: value, followTime: value.getTime()})
    }

    onRemarkChange(value) {
	    this.setState({remark: value})
    }

	componentDidMount() {
        this.setState({userId: this.props.location.query.id})
	}

	render() {
		return (
			<div>
				<NavBar
					mode="dark"
					icon={<Icon type="left"/>}
					onLeftClick={this.back.bind(this)}
					rightContent={<span onClick={this.save.bind(this)}>完成</span>}
				>
					添加跟进
				</NavBar>
                <form>
                    <List>
                        <DatePicker
                            mode="date"
                            value={this.state.followDate}
                            onChange={this.handleChange.bind(this)}
                        >
                            <List.Item arrow="horizontal">跟进时间</List.Item>
                        </DatePicker>
                    </List>
                    <WhiteSpace />
                    <List>
                        <TextareaItem
                            onChange={this.onRemarkChange.bind(this)}
                            clear={true}
                            placeholder="请输入信息"
                            rows={8}
                            count={155}
                        />
                    </List>
                </form>
			</div>
		)
	}
}

export default connect(state => ({
	user: state.user
}), dispath => ({
	actions: bindActionCreators(Actions, dispath)
}))(FollowUp)
module.exports = exports['default']
