import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import * as Actions from '../store/actions'
import { bindActionCreators } from 'redux'
import ApiCaller from '../utils/ApiCaller'
import Api from '../constants/Api'
import { NavBar, Icon, Modal, DatePicker, TextareaItem, List, WhiteSpace } from 'antd-mobile'
import { createForm } from 'rc-form'

const alert = Modal.alert;

class FollowUp extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
		    userId: '',
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
	    console.log(1)

    }

    handleChange(value) {
	    this.setState({followTime: value.getTime()})
    }

    onRemarkChange(value) {
	    this.setState({remark: value})
    }

	componentDidMount() {
        this.setState({userId: this.props.location.query.id})
	}

	render() {
		const that = this;
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
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <List>
                        <DatePicker
                            mode="date"
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
                            rows={10}
                            count={300}
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
