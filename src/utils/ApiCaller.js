import request from 'superagent'
import Sign from './Sign'
import Cookie from './Cookie'
import Global from '../constants/Global'
import {getDomain} from './Runtime'
import {Toast} from 'antd-mobile'

function getCookieOptions() {
    const domain = getDomain()
    const cookieOptions = {
        domain: domain,
        path: '/'
    }
    return cookieOptions
}

function getCommonHeader() {
    let cookieOptions = getCookieOptions()
    let token = Cookie.get('token', cookieOptions) || JSON.stringify({})
    // let tokenObj = JSON.parse(token)
    // 通用参数
    const commonParams = {
        token: token
    }
    commonParams['Content-Type'] = "application/x-www-form-urlencoded"
    return commonParams
}

function call(inf, params, callback) {
    if (arguments.length == 2) {
        callback = params
        params = {}
    }
    const domain = getDomain()
    const commonParams = getCommonHeader()
    console.log(inf)
    if (inf.typeJson) {
        commonParams["Content-Type"] = "application/json"
    }
    params = params || {}
    const type = inf.type.toLowerCase()
    let req = request[type](inf.url).set(commonParams)
    if (inf.form) {
        for (var p in params) {
            req = req.field(p, params[p])
        }
    } else if (inf.xform) {
        req.type('form').send(params)
    } else {
        req = req[type == 'post' ? 'send' : 'query'](params)
    }
    req.end((err, res) => {
        if (Global.DEBUG)
            console.log('请求[' + type.toUpperCase() + ']:' + inf.url)
        const result = JSON.parse(res.text)
        if (isNaN(result.code))
            result.code = result.errcode
        if (Global.DEBUG)
            console.log(result)
        if (result.code === 3001) {
			Toast.fail('登录过期请先登录', 1)
            return
        }
        callback(result)
    })
}

function removeElement(_element) {
    var _parentElement = _element.parentNode;
    if (_parentElement) {
        _parentElement.removeChild(_element);
    }
}

function getScript(url, callback) {
    var oScript = document.createElement('script');
    oScript.type = 'text/javascript';
    oScript.async = true;
    oScript.src = url;
    /*
    ** script标签的onload和onreadystatechange事件
    ** IE6/7/8支持onreadystatechange事件
    ** IE9/10支持onreadystatechange和onload事件
    ** Firefox/Chrome/Opera支持onload事件
    */

    // 判断IE8及以下浏览器
    var isIE = !-[1,];
    if (isIE) {
        oScript.onreadystatechange = function () {
            if (this.readyState == 'loaded' || this.readyState == 'complete') {
                removeElement(oScript)
                callback();
            }
        }
    } else {
        // IE9及以上浏览器，Firefox，Chrome，Opera
        oScript.onload = function () {
            removeElement(oScript)
            callback();
        }
    }
    document.body.appendChild(oScript);
}

export default {
    call: call,
    getCommonHeader: getCommonHeader,
    getCookieOptions: getCookieOptions
}
