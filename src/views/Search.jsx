import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import * as Actions from '../store/actions'
import { bindActionCreators } from 'redux'
import ApiCaller from '../utils/ApiCaller'
import Api from '../constants/Api'


class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="ant-layout-content">
                <div className="notice-box">
                    <h3>消息通知<span className="read-all">全部标记已读</span></h3>
                    <ul className="notice-list">
                        <li className="unread">
                            <Link className="member-avatar" to="#">
                                <img src="" />
                            </Link>
                            <Link className="notice-link" to="">
                                <p>日哦就给人看了几个人看见个人开关发简历上交给了我就给我让开两个金额日哦就给人看了几个人看见个人开关</p>
                            </Link>
                            <span className="lastdate">2018-06-22 12:30:58</span>
                        </li>
                        <li>
                            <Link className="member-avatar" to="#">
                                <img src="" />
                            </Link>
                            <Link className="notice-link" to="">
                                <p>发简历上交给了我就给我让开两个金额日哦就给人看了几个人看见个人开关</p>
                            </Link>
                            <span className="lastdate">2018-06-22 12:30:58</span>
                        </li>
                        <li>
                            <Link className="member-avatar" to="#">
                                <img src="" />
                            </Link>
                            <Link className="notice-link" to="">
                                <p>发简历上交给了我就给我让开两个金额日哦就给人看了几个人看见个人开关</p>
                            </Link>
                            <span className="lastdate">2018-06-22 12:30:58</span>
                        </li>
                        <li>
                            <Link className="member-avatar" to="#">
                                <img src="" />
                            </Link>
                            <Link className="notice-link" to="">
                                <p>发简历上交给了我就给我让开两个金额日哦就给人看了几个人看见个人开关</p>
                            </Link>
                            <span className="lastdate">2018-06-22 12:30:58</span>
                        </li>
                        <li className="unread">
                            <Link className="member-avatar" to="#">
                                <img src="" />
                            </Link>
                            <Link className="notice-link" to="">
                                <p>日哦就给人看了几个人看见个人开关发简历上交给了我就给我让开两个金额日哦就给人看了几个人看见个人开关</p>
                            </Link>
                            <span className="lastdate">2018-06-22 12:30:58</span>
                        </li>
                        <li className="unread">
                            <Link className="member-avatar" to="#">
                                <img src="" />
                            </Link>
                            <Link className="notice-link" to="">
                                <p>日哦就给人看了几个人看见个人开关发简历上交给了我就给我让开两个金额日哦就给人看了几个人看见个人开关</p>
                            </Link>
                            <span className="lastdate">2018-06-22 12:30:58</span>
                        </li>
                    </ul>
                    <div className="load-more">
                        <button className="more-btn">加载更多</button>
                        <span className="no-more">没有更多消息通知了</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(state => ({
    user: state.user
}), dispath => ({
    actions: bindActionCreators(Actions, dispath)
}))(Search)
module.exports = exports['default']
