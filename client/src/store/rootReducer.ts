import {ActionCreator, Reducer} from "redux";
import {initialState, RootState} from "./rootState";
import {MyAction} from "./actions";

export const CHOOSE_TAB = 'CHOOSE_TAB';
export const CHOOSE_REGION_TAB = 'CHOOSE_REGION_TAB';
export const AUTH = 'AUTH';
export const USER = 'USER';
export const ROUTE = 'ROUTE';
export const ROUTE_CHANGE = 'ROUTE_CHANGE';
export const ROUTES_LIST = 'ROUTES_LIST';
export const EVENT = 'EVENT';
export const EVENT_CHANGE = 'EVENT_CHANGE';
export const EVENTS_LIST = 'EVENTS_LIST';
export const DELETE_ELEMENT = 'DELETE_ELEMENT';




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