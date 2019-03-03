import React, {Component} from "react";
import {connect} from "react-redux";
import * as Actions from "../store/actions";
import {bindActionCreators} from "redux";
import ApiCaller from "../utils/ApiCaller";
import Api from "../constants/Api";
import Cookie from "../utils/Cookie";
import { Login } from '../components/index';


class App extends React.Component {
    constructor(props) {
        super(props)
        // this.shouldComponentUpdate = shouldComponentUpdate.bind(this)
        this.state = {
            isLogined: false,

        }
    }

    componentDidMount() {
        //获取用户信息
        this.handleLogined()
    }

    isLogined() {
        return !!Cookie.get('token', ApiCaller.getCookieOptions())
    }

    handleLogined() {
        // 登录之后再次获取用户信息
        this.props.actions.loadInfo(() => {

        })
    }

    render() {
		const isLogined = this.isLogined()
		return isLogined ? (
				<div>
					{this.props.children}
				</div>
		) : <Login onLogined={this.handleLogined.bind(this)}/>

    }
}

App.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default connect(state => ({
    global: state.global,
    user: state.user
}), dispath => ({
    actions: bindActionCreators(Actions, dispath)
}))(App)
module.exports = exports['default']
