import React, {useEffect} from 'react';
import 'normalize.css';
import '../style.global.css';
import {Routes} from "../routes";
import {BrowserRouter} from "react-router-dom";
import {createStore, applyMiddleware} from "redux";
// import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {rootReducer} from '../store/rootReducer';
import {Provider} from "react-redux";
import {storageName, useAuth} from "../hooks/useAuth";
import {Auth} from "../store/actions";

//for development
// const store = createStore(rootReducer, composeWithDevTools(
// 	applyMiddleware(thunk),
// ));

//for production
const store = createStore(rootReducer, applyMiddleware(thunk));

export function App() {
	const { token, userId, loginName } = useAuth();
	const isAuthenticated = !!token;

  useEffect(() => {
		const item = localStorage.getItem(storageName);

		if (typeof item !== "string") {
			store.dispatch(Auth({ token, userId, isAuthenticated, loginName }));
		} else {
			const data = JSON.parse(item);
			store.dispatch(Auth({ token: data.token, userId: data.userId, isAuthenticated: true, loginName: data.loginName }));
		}
	}, []);

  return (
    <Provider store={store}>
			<BrowserRouter>
				<Routes />
			</BrowserRouter>
		</Provider>
  );
}

