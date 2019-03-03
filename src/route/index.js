import { App, Home, PurposeList, DealList, AllList, Search, AddCustomer, EditCustomer, Detail, FollowUp, Deal } from '../views';

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
        { path: 'add', component: AddCustomer },
        { path: 'edit', component: EditCustomer },
        { path: 'detail', component: Detail },
		{ path: 'followup', component: FollowUp },
		{ path: 'deal', component: Deal }
    ]
};