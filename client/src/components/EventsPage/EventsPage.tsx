import React, {useEffect} from 'react';
import styles from './eventspage.css';
import {Navbar} from "../UserPage/Navbar";
import {Title} from "../Title";
import {useHttp} from "../../hooks/useHttp";
import {useDispatch, useSelector} from "react-redux";
import {IEventPreview, RootState} from "../../store/rootState";
import {EventsList} from "./EventsList";
import {EventCard} from "./EventCard";
import {Spinner} from "../Spinner";
import {Break} from "../Break";
import figure6 from '../../static/image/figure-6.webp';
import figure7 from '../../static/image/figure-7.webp';
import {Footer} from "../HomePage/Footer";
import {EventsListAction} from "../../store/actions";
import {useHistory} from "react-router-dom";

export function EventsPage() {
	const {loading, error, clearError, request} = useHttp();
	const data = useSelector<RootState, Array<IEventPreview>>(state => state.eventsList);
	const token = useSelector<RootState>(state => state.auth.token);
	const dispatch = useDispatch();
	const history = useHistory();

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

	if (error) history.push('/no-register');

  return (
		<div className={styles.eventsPage}>
			<Navbar />
			<div className="container">
				<div className={styles.content}>
					<Title text="События" />
					<Break size={40} tabletSize={30}/>
					<img className={styles.figure6} src={figure6} alt="фотография"/>
					<img className={styles.figure7} src={figure7} alt="фотография"/>
					<p className={styles.text}>{data.length && 'Прими участие в одном из событий.' || 'Пока не добалено ни одно событие.'}</p>

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
			<div className={styles.footer}>
				<Footer />
			</div>
		</div>
  );
}
