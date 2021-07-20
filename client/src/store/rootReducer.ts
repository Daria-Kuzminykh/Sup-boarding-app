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
	},
	routeChange: {
		region: 'Красноярский край',
		place: '',
		name: '',
		level: '1',
		time: '',
		fotoLink: '',
		descr: '',
		plus: '',
		minus: '',
		_id: '',
	},
	routesList: [],
	event: {
		name: '',
		place: '',
		descr: '',
		contacts: '',
		contactTel: '',
		dateEvent: '',
		_id: '',
	},
	eventChange: {
		name: '',
		place: '',
		descr: '',
		contacts: '',
		contactTel: '',
		dateEvent: '',
		_id: '',
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
	_id?: string;
	clicks?: number;
	date?: string;
}
export interface IRoutePreview {
	name: string;
	place: string;
	level: number;
	time: number;
	ownerFullName: string;
	id: string;
	cover?: string;
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
	_id?: string;
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
	routeChange: IRoute;
	routesList: Array<IRoutePreview>;
	event: IEvent;
	eventChange: IEvent;
	eventsList: Array<IEventPreview>;
	deleteElement: IDeleteElement;
}


const CHOOSE_TAB = 'CHOOSE_TAB';
const CHOOSE_REGION_TAB = 'CHOOSE_REGION_TAB';
const AUTH = 'AUTH';
const USER = 'USER';
const ROUTE = 'ROUTE';
const ROUTE_CHANGE = 'ROUTE_CHANGE';
const ROUTES_LIST = 'ROUTES_LIST';
const EVENT = 'EVENT';
const EVENT_CHANGE = 'EVENT_CHANGE';
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
type RouteChange = {
	type: typeof ROUTE_CHANGE;
	routeChange: IRoute;
}
type RoutesList = {
	type: typeof ROUTES_LIST;
	routesList: Array<IRoutePreview>;
}
type Event = {
	type: typeof EVENT;
	event: IEvent;
}
type EventChange = {
	type: typeof EVENT_CHANGE;
	eventChange: IEvent;
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
export const RouteChangeAction: ActionCreator<RouteChange> = (routeChange: IRoute) => ({
	type: ROUTE_CHANGE,
	routeChange
})
export const RoutesListAction: ActionCreator<RoutesList> = (routesList: Array<IRoutePreview>) => ({
	type: ROUTES_LIST,
	routesList
})
export const EventAction: ActionCreator<Event> = (event: IEvent) => ({
	type: EVENT,
	event,
})
export const EventChangeAction: ActionCreator<EventChange> = (eventChange: IEvent) => ({
	type: EVENT_CHANGE,
	eventChange,
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
	DeleteElement |
	RouteChange |
	EventChange;

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
		case ROUTE_CHANGE:
			return {
				...state,
				routeChange: action.routeChange
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
		case EVENT_CHANGE:
			return {
				...state,
				eventChange: action.eventChange
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