import React, {Component} from 'react'
import ApiCaller from '../../utils/ApiCaller'
import Api from '../../constants/Api'
import Cookie from '../../utils/Cookie'
import Security from '../../utils/Security'
import {Link} from "react-router";
import { Toast } from 'antd-mobile';
import './Login.scss'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            adminUser: '',
            pwd: '',
            showPwd: false,
            data: {}
        }
    }

    componentDidMount() {

    }

    handleLogin() {
        if (!(/^1\d{10}$/.test(this.state.adminUser))) {
            Toast.info("手机格式不正确", 2);
            return;
        }

        if (this.state.pwd.length < 8) {
            Toast.info("密码必须是8-16位", 2);
            return;
        }

        ApiCaller.call(Api.other.login, JSON.stringify({adminUser: this.state.adminUser,pwd: this.state.pwd}), (res) => {
            if (res.code == 200) {
                this.state.data = res.data.admin;

                Cookie.set('token', JSON.stringify(res.data.logToken), {path: '/'})
            } else {

            }
        })

    }

    handleChangePhone(e) {
        this.setState({adminUser: e.target.value})
    }
    handleChangePwd(e) {
        this.setState({pwd: e.target.value})
    }
    showPwd() {
        this.setState({showPwd: !this.state.showPwd})
    }

    render() {
        return (
            <div className="login_bg">
                <div className="login_bg_logo">

                </div>
                <div className="login-w login_bg_number">
                    <div className="number__left">账号</div>
                    <div className="number__right">
                        <input className="number__right--input" type="text" value={this.state.adminUser} placeholder="请输入手机号"
                               onChange={this.handleChangePhone.bind(this)}/>
                    </div>
                </div>
                <div className="login-w login_bg_password">
                    <div className="password__left">密码</div>
                    <div className="password__right">
                        <input className="number__right--input" value={this.state.pwd} type={this.state.showPwd?"text":"password"} placeholder="请输入密码"
                               onChange={this.handleChangePwd.bind(this)}/>
                    </div>
                    <div className="password__hide" onClick={this.showPwd.bind(this)}>
                        {/*<span className="{'password__hide--icon': true, 'icon-icon_dakai': passwordType === 'text', 'icon-icon_guanbi': passwordType === 'password'}"></span>*/}
                    </div>
                </div>
                <button className={this.state.adminUser&&this.state.pwd?"login_button_active":"login_button"} onClick={this.handleLogin.bind(this)}>登录</button>
                {/*<Link className="login_bg_forgot" to="/">忘记密码？</Link>*/}
            </div>
        )
    }
}

export default Login
module.exports = exports['default']
