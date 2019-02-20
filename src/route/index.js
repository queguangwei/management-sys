import { App } from '../views';

export const routes = {
    path: '/',
    getComponent(nextState,cb){
        require.ensure([],require=>{
            cb(null,require('../views/App'));
        },'nav')
    },
    indexRoute: {
        getComponent(nextState,cb) {
            require.ensure([],require=>{
                cb(null,require('../views/Home'));
            },'home')
        }
    },
    childRoutes: [
		{
			path: 'purposelist',
			getComponent(nextState,cb) {
				require.ensure([],require=>{
					cb(null,require('../views/PurposeList'));
				},'purposelist')
			}
		},
		{
			path: 'deallist',
			getComponent(nextState,cb) {
				require.ensure([],require=>{
					cb(null,require('../views/DealList'));
				},'deallist')
			}
		},
        {
            path: 'search',
            getComponent(nextState,cb) {
                require.ensure([],require=>{
                    cb(null,require('../views/Search'));
                },'search')
            }
        },
        {
			path: 'add',
			getComponent(nextState,cb) {
				require.ensure([],require=>{
					cb(null,require('../views/Add'));
				},'add')
			}
        },
        {
            path: 'edit',
            getComponent(nextState,cb) {
                require.ensure([],require=>{
                    cb(null,require('../views/EditCustomer'));
                },'edit')
            }
        },
        {
			path: 'detail',
			getComponent(nextState,cb) {
				require.ensure([],require=>{
					cb(null,require('../views/Detail'));
				},'detail')
			}
        },
		{
			path: 'followup',
			getComponent(nextState,cb) {
				require.ensure([],require=>{
					cb(null,require('../views/FollowUp'));
				},'followup')
			}
		},
		{
			path: 'deal',
			getComponent(nextState,cb) {
				require.ensure([],require=>{
					cb(null,require('../views/Deal'));
				},'deal')
			}
		}
    ]
};