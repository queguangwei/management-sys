import { App, Home } from '../views';
export const routes = {
    path: '/',
    getComponent(nextState,cb){
        require.ensure([],require=>{
            cb(null,require('../views/App'));
        },'nav')
    },
    indexRoute: {
        getComponent(nextState,cb){
            require.ensure([],require=>{
                cb(null,require('../views/Home'));
            },'home')
        }
    },
    childRoutes: [
        {
            path: 'notice',
            getComponent(nextState,cb){
                require.ensure([],require=>{
                    cb(null,require('../views/Notice'));
                },'notice')
            },

        }
    ]
};