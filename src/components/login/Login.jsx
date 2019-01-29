import React, {Component} from 'react'
import ApiCaller from '../../utils/ApiCaller'
import Api from '../../constants/Api'
import Cookie from '../../utils/Cookie'
import Security from '../../utils/Security'
import { Link } from "react-router";
import { List, InputItem, WhiteSpace } from 'antd-mobile';
import { createForm } from 'rc-form';
import './Login.scss'

class BasicInputExample extends React.Component {
	componentDidMount() {
		// this.autoFocusInst.focus();
	}

	render() {
		const { getFieldProps } = this.props.form;
		return (
			<div className="login_bg_content">
				<List>
					<InputItem
						{...getFieldProps('inputclear')}
						clear
						placeholder="displayed clear while typing"
					>账号</InputItem>
				</List>
				<WhiteSpace />
				<List>
					<InputItem
						{...getFieldProps('inputclear')}
						clear
						placeholder="displayed clear while typing"
					>密码</InputItem>
				</List>
				<button className="login_bg_btn">登录</button>
				<Link className="login_bg_forgot" to="/">忘记密码？</Link>
			</div>
		);
	}
}

const BasicInputExampleWrapper = createForm()(BasicInputExample);

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      confirmLoading: false,
      codeBtn: {
          className: 'code-btn',
          text: '获取验证码',
          time: 0
      },
      disabled: false,

      passw: '',
      userId: '',
      sid: '',
      userName: '',
      changePassVisible: false,
      loginData: {},

    }
  }

  sendCode() {
      const state = this.state
      const props = this.props.form
      if (state.codeBtn.time != 0) {
          return
      }
      ApiCaller.call(Api.base.sendCode, {
          userName: props.getFieldValue('user')
      }, (res) => {
          if (res.code == 0) {
              const state = this.state
              state.codeBtn.text = '发送成功'
              state.codeBtn.time = 60
              state.codeBtn.className = 'code-btn disable'
              this.setState(state)
              // 倒计时
              this.setSendCodeInter()
          } else {
              notification['error']({
                  key: '登录',
                  message: res.msg,
              });
          }
      })
  }

  setSendCodeInter() {
      const timeHandle = this.timeHandle.bind(this)
      codeInterve = setInterval(() => {
          timeHandle()
      }, 1000)
  }

  timeHandle() {
      const state = this.state
      if (state.codeBtn.time == 0) {
          state.codeBtn.text = '获取验证码'
          state.codeBtn.className = 'code-btn'
          //  清除
          clearInterval(codeInterve)
      } else {
          state.codeBtn.time--
          state.codeBtn.text = '重新获取(' + state.codeBtn.time + ')'
      }
      this.setState(state)
  }

  handleLogin(e) {
    e.preventDefault();
    const state = this.state
    this.props.form.validateFieldsAndScroll((errors, values) => {
      if (!!errors)
        return
      if (!(/^1\d{10}$/.test(values.phone)))
        return message.error("手机格式不正确")
      if (values.password.length < 8)
        return message.error("密码必须是8-16位")
      this.setState({confirmLoading: true})
      ApiCaller.call(Api.base.login, {
        phone: values.phone,
        password: Security.encryptMd5(values.password)
      }, (res) => {
        this.setState({confirmLoading: false})
        if (res.code == 0) {
          res.data.auth = []
          if (res.data.passModifyStatus === '0') {
            state.userId = res.data.userId
            state.sid = res.data.sid
            state.changePassVisible = true
            this.setState(state)
          } else {
            this.gitInvite(res.data)
          }
        } else if (res.code == 10002) {
          state.passw = Security.encryptMd5(pass)
          state.visible = true
          this.setState(state)
        } else {
          notification['error']({
            key: '登录',
            message: res.message,
          });
        }
      })
    })
  }


  render() {
    return (
        <div className="login_bg">
			<div className="login_bg_logo">

			</div>
			<BasicInputExampleWrapper />
        </div>
    )
  }
}
export default Login
module.exports = exports['default']
