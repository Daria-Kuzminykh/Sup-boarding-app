import {ActionCreator} from "redux";
import {IAuth, IDeleteElement, IEvent, IEventPreview, IRegionTab, IRoute, IRoutePreview, IUser} from "./rootState";
import {CHOOSE_TAB, CHOOSE_REGION_TAB, AUTH, USER, ROUTE, ROUTE_CHANGE, EVENT_CHANGE, EVENT, DELETE_ELEMENT, EVENTS_LIST, ROUTES_LIST} from "./rootReducer";

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


export type MyAction =
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