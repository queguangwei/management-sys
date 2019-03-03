import Api from '../../constants/Api'
import ApiCaller from '../../utils/ApiCaller'
import Cookie from '../../utils/Cookie'
import { OPERATOR_LOAD_INFO } from '../constants/ActionTypes'

// 获取用户信息
export function loadInfo(onSuccess = ()=>{}, onError = ()=>{}) {
    return dispath => {
        const cookieOptions = ApiCaller.getCookieOptions()
        if(!Cookie.get('token', cookieOptions)){
            return
        }
        ApiCaller.call(Api.other.getInfo, (res) => {
            if (res.code == 0) {
                dispath({
                    type: OPERATOR_LOAD_INFO,
                    data: res.data
                })
                onSuccess(res)
            } else {
                dispath({
                    type: OPERATOR_LOAD_INFO,
                    data: false
                })
                onError(res)
            }
        })
    }
}
