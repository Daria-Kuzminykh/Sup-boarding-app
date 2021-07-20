import React, {useEffect} from "react";
import {Switch, Route, Redirect} from 'react-router-dom';
import {HomePage} from "./components/HomePage";
import {UserPage} from "./components/UserPage";
import {SupRoutesPage} from "./components/SupRoutesPage";
import {RegisterModal} from "./components/RegisterModal";
import {LoginModal} from "./components/LoginModal";
import {useSelector} from "react-redux";
import {RootState} from "./store/rootReducer";
import {EventsPage} from "./components/EventsPage";
import {RouteForm} from "./components/SupRoutesPage/RouteForm";
import {EventForm} from "./components/EventsPage/EventForm";
import {RouteModal} from "./components/SupRoutesPage/RouteModal";
import {EventModal} from "./components/EventsPage/EventModal";
import {ChangeModal} from "./components/UserPage/UserData/ChangeModal";
import {LogoutModal} from "./components/LogoutModal";
import {DeleteModal} from "./components/UserPage/DeleteModal";
import {RouteChangeForm} from "./components/SupRoutesPage/RouteChangeForm";
import {EventChangeForm} from "./components/EventsPage/EventChangeForm";
import {SurfDayModal} from "./components/HomePage/EventsPreview/SurfDayModal";
import {SupDayModal} from "./components/HomePage/EventsPreview/SupDayModal";
import {CoverModal} from "./components/SupRoutesPage/CoverModal";

export function Routes() {
	const isAuthenticated = useSelector<RootState>(state => state.auth.isAuthenticated);

  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/user">
          <UserPage />
					<Route path="/user/route-form">
						<RouteForm />
					</Route>
					<Route path="/user/route-cover">
						<CoverModal />
					</Route>
					<Route path="/user/event-form">
						<EventForm />
					</Route>
					<Route path="/user/change-form">
						<ChangeModal />
					</Route>
					<Route path="/user/routes/:id">
						<RouteModal path="/user" />
					</Route>
					<Route path="/user/events/:id">
						<EventModal path="/user" />
					</Route>
					<Route path="/user/delete">
						<DeleteModal />
					</Route>
					<Route path="/user/change-route">
						<RouteChangeForm />
					</Route>
					<Route path="/user/change-event">
						<EventChangeForm />
					</Route>
        </Route>
        <Route path="/routes">
          <SupRoutesPage />
					<Route path="/routes/routes/:id">
						<RouteModal path="/routes" />
					</Route>
        </Route>
				<Route path="/events">
					<EventsPage />
					<Route path="/events/events/:id">
						<EventModal path="/events"/>
					</Route>
				</Route>
				<Route path="/home">
					<HomePage />
					<Route path="/home/auth/login" exact>
						<LoginModal />
					</Route>
					<Route path="/home/auth/logout" exact>
						<LogoutModal />
					</Route>
					<Route path="/home/routes/:id">
						<RouteModal path="/home"/>
					</Route>
					<Route path="/home/events/:id">
						<EventModal path="/home"/>
					</Route>
					<Route path="/home/event/surf-day">
						<SurfDayModal />
					</Route>
					<Route path="/home/event/sup-boarding-day">
						<SupDayModal />
					</Route>
				</Route>
        <Redirect to="/home"/>
      </Switch>
    )
  }

  return (
    <Switch>
			<Route path="/routes">
				<SupRoutesPage />
				<Route path="/routes/routes/:id">
					<RouteModal path="/routes" />
				</Route>
			</Route>
      <Route path="/home">
        <HomePage />
        <Route path="/home/auth/register" exact>
          <RegisterModal />
        </Route>
        <Route path="/home/auth/login" exact>
          <LoginModal />
        </Route>
				<Route path="/home/routes/:id">
					<RouteModal path="/home"/>
				</Route>
				<Route path="/home/event/surf-day">
					<SurfDayModal />
				</Route>
				<Route path="/home/event/sup-boarding-day">
					<SupDayModal />
				</Route>
      </Route>
      <Redirect to="/home"/>
    </Switch>
  )
}