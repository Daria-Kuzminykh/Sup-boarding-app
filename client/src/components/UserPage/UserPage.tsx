import React, {useEffect, useState} from 'react';
import styles from './userpage.css';
import {useHttp} from "../../hooks/useHttp";
import {useDispatch, useSelector} from "react-redux";
import {Auth, IEventPreview, IRoutePreview, RootState, User} from "../../store/rootReducer";
import {Navbar} from "./Navbar";
import {Title} from "../Title";
import {Button} from "../Button";
import {RoutesList} from "../SupRoutesPage/RoutesList";
import {EventsList} from "../EventsPage/EventsList";
import {useHistory} from "react-router-dom";
import {Spinner} from "../Spinner";
import { RouteCard } from '../SupRoutesPage/RouteCard/RouteCard';
import { EventCard } from '../EventsPage/EventCard';
import {UserData} from "./UserData";
import {Break} from "../Break";
import {NoRegister} from "./NoRegister";
import {ActionBlock} from "./ActionBlock";
import {UpButton} from "../HomePage/UpButton";
import {Footer} from "../HomePage/Footer";

export function UserPage() {
	const token = useSelector<RootState>(state => state.auth.token);
	const userId = useSelector<RootState>(state => state.auth.userId);
	const name = useSelector<RootState>(state => state.user.name);
	const supRoutes = useSelector<RootState, Array<any>>(state => state.user.supRoutes);
	const events = useSelector<RootState, Array<any>>(state => state.user.events);
	const { request, error, clearError, loading } = useHttp();
	const dispatch = useDispatch();
	const history = useHistory();
	async function getUserData() {
		if (name) return;
		clearError();

		try {
			const data = await request(`/user/${userId}`, 'GET', null, {
				Authorization: `Bearer ${token}`
			})
			dispatch(User({ name: data._doc.name, surname: data._doc.surname, supRoutes: data.supRoutes, events: data.events }))
		} catch (e) {}
	}

	useEffect(() => {
		getUserData();
	}, [name]);

	if (loading) return (<Spinner />)

	if (error) return (<NoRegister />);

  return (
    <div className={styles.userPage}>
			<Navbar />
			<div className="container">
				<div className={styles.content}>
					<Title text="Личный кабинет" />
					<Break size={60} tabletSize={40} mobileSize={30}/>
					<p className={styles.hello}>Здравствуй, {name}!</p>

					<UserData />

					<h3 className={styles.smallTitle}>Мои маршруты</h3>
					<RoutesList children={
						<>
							{!supRoutes.length && <p className={styles.descr}>Список ваших маршрутов пуст. Добавьте свой первый маршрут!</p>}

							{
								supRoutes.map((route: IRoutePreview) => {
									return (
										<li className={styles.item} key={route.id}>
											<RouteCard
												name={route.name}
												place={route.place}
												level={route.level}
												time={route.time}
												owner={route.ownerFullName}
												img={route.cover || ''}
												id={route.id}
											/>
											<ActionBlock isRoute={true} id={route.id} />
										</li>
									)
								})
							}
						</>
					} />
					<div className={styles.buttonCenter} onClick={() => history.push('/user/route-form')}>
						<Button text="добавить маршрут" />
					</div>

					<Break size={60} />

					<h3 className={styles.smallTitle}>Мои события</h3>
					<EventsList children={
						<>
							{!events.length && <p className={styles.descr}>Список ваших событий пуст. Добавьте свое первое событие!</p>}

							{
								events.map((event: IEventPreview) => {
									return (
										<li className={styles.item} key={event.id}>
											<EventCard
												id={event.id}
												name={event.name}
												place={event.place}
												date={event.dateEvent}
												owner={event.ownerFullName} />
											<ActionBlock isRoute={false} id={event.id} />
										</li>
									)
								})
							}
						</>
					} />

					<Break size={40} mobileSize={20}/>

					<div className={styles.buttonCenter} onClick={() => history.push('/user/event-form')}>
						<Button text="добавить событие"/>
					</div>
				</div>
			</div>
			<Footer />
			<UpButton />
    </div>
  );
}
