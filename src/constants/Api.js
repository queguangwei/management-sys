const API_ROOT = "http://danjuan-pan.yicp.io:28135"
const API_USER = API_ROOT + "/user"
const API_OTHER = API_ROOT + "/other"

const TYPES = {
    POST: 'post',
    GET: 'get'
};

export default {
    user: {
        list: {
            url: API_USER + '/table',
            type: TYPES.POST,
            typeJson: true
        },
        info: {
            url: API_USER + '/info',
            type: TYPES.POST,
            typeJson: true
        },
        addLesson: {
            url: API_USER + '/addLesson',
            type: TYPES.POST,
            typeJson: true
        },
        addFollowRecord: {
            url: API_USER + '/addFollowRecord',
            type: TYPES.POST,
            typeJson: true
        },
        edit: {
            url: API_USER + '/edit',
            type: TYPES.POST,
            typeJson: true
        },
        add: {
            url: API_USER + '/add',
            type: TYPES.POST,
            typeJson: true
        }
    },
    other: {
        login:{
            url: API_OTHER + '/workerLogin',
            type: TYPES.POST,
            typeJson: true
        },
        getInfo:{
            url: API_OTHER + '/workerInfo',
            type: TYPES.POST,
            typeJson: true
        },
        lessonList:{
            url: API_OTHER + '/lessonList',
            type: TYPES.POST,
            typeJson: true
        }
    }
}