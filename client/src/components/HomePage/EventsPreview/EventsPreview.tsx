import React from 'react';
import styles from './eventspreview.css';
import {Title} from "../../Title";
import {EventCard} from "../../EventsPage/EventCard";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/rootReducer";
import {useHistory} from 'react-router-dom';
import {Button} from "../../Button";
import figure3 from '../../../static/image/figure-3.webp';
import figure4 from '../../../static/image/figure-4.webp';
import {Break} from "../../Break";

export function EventsPreview() {
	const isAuthenticated = useSelector<RootState>(state => state.auth.isAuthenticated);
	const history = useHistory();

  return (
		<section className={styles.events}>
			<div className="container">
				<Title text="События" id="events" />
				<Break size={40} />
				<EventCard id="event1" name="День серфинга" place="страны мира" date="18.06.2022" owner="Surfer Magazine" />
				<EventCard id="event2" name="День сап-бординга" place="Россия" date="29.06.2021" owner="неизвестно" />

				<img className={styles.figure3} src={figure3} alt="фотография"/>
				<img className={styles.figure4} src={figure4} alt="фотография"/>

				{isAuthenticated && (
					<div className={styles.button} onClick={() => history.push('/events')}>
						<Button text="Все события" />
					</div>
				)}
			</div>
		</section>
  );
}
