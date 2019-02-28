import { App, Home, PurposeList, DealList, AllList, Search, Add, EditCustomer, Detail, FollowUp, Deal } from '../views';

export const routes = {
    path: '/',
    component: App,
    indexRoute: {
    	component: Home
	},
    childRoutes: [
    	{ path: 'purposelist', component: PurposeList },
		{ path: 'deallist', component: DealList },
		{ path: 'alllist', component: AllList },
        { path: 'search', component: Search },
        { path: 'add', component: Add },
        { path: 'edit', component: EditCustomer },
        { path: 'detail', component: Detail },
		{ path: 'followup', component: FollowUp },
		{ path: 'deal', component: Deal }
    ]
};