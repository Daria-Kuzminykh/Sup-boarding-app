import {krasnoyarsk} from "../components/SupRoutesPage/RegionMenu";

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
	coverChoice?: string;
	stravaLink?: string;
	coordinatesLink?: string;
}
export interface IRoutePreview {
	name: string;
	place: string;
	level: number;
	time: number;
	ownerFullName: string;
	id: string;
	cover?: string;
	coverChoice: number;
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

export const initialState: RootState = {
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
		coordinatesLink: '',
		stravaLink: '',
		coverChoice: '1',
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
		coordinatesLink: '',
		stravaLink: '',
		coverChoice: '1',
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