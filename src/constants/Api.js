const API_ROOT = "http://danjuan-pan.yicp.io:28135/"
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
            type: TYPES.POST
        },
        info: {
            url: API_USER + '/info',
            type: TYPES.POST
        },
        addLesson: {
            url: API_USER + '/addLesson',
            type: TYPES.POST
        },
        addFollowRecord: {
            url: API_USER + '/addFollowRecord',
            type: TYPES.POST
        },
        edit: {
            url: API_USER + '/edit',
            type: TYPES.POST
        },
        add: {
            url: API_USER + '/add',
            type: TYPES.POST
        }
    },
    other: {
        login:{
            url: API_OTHER + '/workerLogin',
            type: TYPES.POST,
        },
        lessonList:{
            url: API_OTHER + '/lessonList',
            type: TYPES.POST
        }
    }
}