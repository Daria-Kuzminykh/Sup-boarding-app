import React, {useEffect, useState} from 'react';
import styles from './eventspage.css';
import {Navbar} from "../UserPage/Navbar";
import {Title} from "../Title";
import {SpinnerIcon} from "../icons";
import {useHttp} from "../../hooks/useHttp";
import {useDispatch, useSelector} from "react-redux";
import {EventsListAction, IEventPreview, IRoutePreview, RootState, RoutesListAction} from "../../store/rootReducer";
import {RouteCard} from "../SupRoutesPage/RouteCard";
import {EventsList} from "./EventsList";
import {EventCard} from "./EventCard";
import {Spinner} from "../Spinner";
import {Break} from "../Break";

export function EventsPage() {
	const {loading, error, clearError, request} = useHttp();
	const data = useSelector<RootState, Array<IEventPreview>>(state => state.eventsList);
	const token = useSelector<RootState>(state => state.auth.token);
	const dispatch = useDispatch();

	async function loadingData() {
		clearError();
		try {
			const data = await request('/events', 'GET', null, {
				Authorization: `Bearer ${token}`
			});
			dispatch(EventsListAction(data));
		} catch (e) {}
	}

	useEffect(() => {
		if (data.length) return;
		loadingData();
	}, []);

	if (error) {
		return (
			<p className={styles.error}>К сожалению, произошла ошибка. {error}</p>
		)
	}
  return (
		<div className={styles.eventsPage}>
			<Navbar />
			<div className="container">
				<div className={styles.content}>
					<Title text="События" />
					<Break size={40} />
					<p className={styles.text}>Прими участие в одном из событий.</p>

					{loading && <Spinner />}

					{!loading && <EventsList children={
						data.map((event: IEventPreview) => {
							return (
								<li className={styles.item} key={event.id}>
									<EventCard
										id={event.id}
										name={event.name}
										place={event.place}
										date={event.dateEvent}
										owner={event.ownerFullName} />
								</li>
							)
						})
					}/>}
				</div>
			</div>
		</div>
  );
}
