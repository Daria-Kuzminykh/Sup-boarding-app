import {ActionCreator, Reducer} from "redux";
import {krasnoyarsk} from "../components/SupRoutesPage/RegionMenu";

const initialState: RootState = {
	tab: 1,
	regionTab: {
		name: krasnoyarsk,
		loading: false,
	},
	auth: {
		token: '',
		userId: '',
		isAuthenticated: false,
		loginName: '',
	},
	user: {
		name: '',
		surname: '',
		supRoutes: [],
		events: [],
	},
	route: {
		region: 'Красноярский край',
		place: '',
		name: '',
		level: '1',
		time: '',
		fotoLink: '',
		descr: '',
		plus: '',
		minus: '',
		preview: null,
	},
	routesList: [],
	event: {
		name: '',
		place: '',
		descr: '',
		contacts: '',
		contactTel: '',
		dateEvent: '',
	},
	eventsList: [],
	deleteElement: {
		id: '',
		isRoute: false,
	}
}


export interface IAuth {
	token: string;
	userId: string;
	isAuthenticated: boolean;
	loginName: string;
}
export interface IUser {
	name: string;
	surname: string;
	supRoutes: Array<object>;
	events: Array<object>;
}
export interface IRoute {
	region: string;
	place: string;
	name: string;
	level: string;
	time: string;
	fotoLink: string;
	descr: string;
	plus: string;
	minus: string;
	preview?: any;
}
export interface IRoutePreview {
	name: string;
	place: string;
	level: number;
	time: number;
	ownerFullName: string;
	id: string;
}
export interface IRegionTab {
	name: string;
	loading: boolean;
}
export interface IEvent {
	name: string;
	place: string;
	descr: string;
	contacts: string;
	contactTel: string;
	dateEvent: string;
}
export interface IEventPreview {
	name: string;
	place: string;
	ownerFullName: string;
	dateEvent: string;
	id: string;
}
export interface IDeleteElement {
	isRoute: boolean;
	id: string;
}


export interface RootState {
	tab: number;
	regionTab: IRegionTab;
	auth: IAuth;
	user: IUser;
	route: IRoute;
	routesList: Array<IRoutePreview>;
	event: IEvent;
	eventsList: Array<IEventPreview>;
	deleteElement: IDeleteElement;
}


const CHOOSE_TAB = 'CHOOSE_TAB';
const CHOOSE_REGION_TAB = 'CHOOSE_REGION_TAB';
const AUTH = 'AUTH';
const USER = 'USER';
const ROUTE = 'ROUTE';
const ROUTES_LIST = 'ROUTES_LIST';
const EVENT = 'EVENT';
const EVENTS_LIST = 'EVENTS_LIST';
const DELETE_ELEMENT = 'DELETE_ELEMENT';


type ChooseTabAction = {
	type: typeof CHOOSE_TAB;
	tab: number;
}
type ChooseRegionTabAction = {
	type: typeof CHOOSE_REGION_TAB;
	regionTab: IRegionTab;
}
type Auth = {
	type: typeof AUTH;
	auth: IAuth;
}
type User = {
	type: typeof USER;
	user: IUser;
}
type Route = {
	type: typeof ROUTE;
	route: IRoute;
}
type RoutesList = {
	type: typeof ROUTES_LIST;
	routesList: Array<IRoutePreview>;
}
type Event = {
	type: typeof EVENT;
	event: IEvent;
}
type EventsList = {
	type: typeof EVENTS_LIST;
	eventsList: Array<IEventPreview>;
}
type DeleteElement = {
	type: typeof DELETE_ELEMENT;
	deleteElement: IDeleteElement;
}


export const chooseTab: ActionCreator<ChooseTabAction> = (tab) => ({
	type: CHOOSE_TAB,
	tab,
})
export const chooseRegionTab: ActionCreator<ChooseRegionTabAction> = (regionTab) => ({
	type: CHOOSE_REGION_TAB,
	regionTab,
})
export const Auth: ActionCreator<Auth> = (auth: IAuth) => ({
	type: AUTH,
	auth
})
export const User: ActionCreator<User> = (user: IUser) => ({
	type: USER,
	user
})
export const Route: ActionCreator<Route> = (route: IRoute) => ({
	type: ROUTE,
	route
})
export const RoutesListAction: ActionCreator<RoutesList> = (routesList: Array<IRoutePreview>) => ({
	type: ROUTES_LIST,
	routesList
})
export const EventAction: ActionCreator<Event> = (event: IEvent) => ({
	type: EVENT,
	event,
})
export const EventsListAction: ActionCreator<EventsList> = (eventsList: Array<IEventPreview>) => ({
	type: EVENTS_LIST,
	eventsList
})
export const DeleteElementAction: ActionCreator<DeleteElement> = (deleteElement: IDeleteElement) => ({
	type: DELETE_ELEMENT,
	deleteElement,
})


type MyAction =
	ChooseTabAction |
	Auth |
	User |
	Route |
	RoutesList |
	ChooseRegionTabAction |
	Event |
	EventsList |
	DeleteElement;

export const rootReducer: Reducer<RootState, MyAction> = (state = initialState, action) => {
	switch (action.type) {
		case CHOOSE_TAB:
			return {
				...state,
				tab: action.tab,
			};
		case CHOOSE_REGION_TAB:
			return {
				...state,
				regionTab: action.regionTab,
			};
		case AUTH:
			return {
				...state,
				auth: action.auth
			};
		case USER:
			return {
				...state,
				user: action.user
			};
		case ROUTE:
			return {
				...state,
				route: action.route
			};
		case ROUTES_LIST:
			return {
				...state,
				routesList: action.routesList
			};
		case EVENT:
			return {
				...state,
				event: action.event
			};
		case EVENTS_LIST:
			return {
				...state,
				eventsList: action.eventsList
			};
		case DELETE_ELEMENT:
			return {
				...state,
				deleteElement: action.deleteElement
			};
		default:
			return state;
	}
}