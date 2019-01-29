const API_ROOT = "/api"
const API_USER = API_ROOT + "/user"

const TYPES = {
    POST: 'post',
    GET: 'get'
};

export default {
    user: {
        login:{
            url: API_USER + '/login',
            type: TYPES.POST,
        },
        getInfo:{
            url: API_USER + '/info',
            type: TYPES.GET
        }
    }

}