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
import {EventsList} from "../../EventsPage/EventsList";

export function EventsPreview() {
	const isAuthenticated = useSelector<RootState>(state => state.auth.isAuthenticated);
	const history = useHistory();

	function handlerClick() {
		history.push('/events');
		window.scrollTo(0, 0);
	}

  return (
		<section className={styles.events}>
			<div className="container">
				<div className={styles.content}>
					<Title text="События" id="events" />
					<Break size={40} tabletSize={10} />
					<EventsList children={
						<>
							<li className={styles.item}>
								<EventCard isPreview={true} id="surf-day" name="День серфинга" place="страны мира" date="18.06.2022" owner="Surfer Magazine" />
							</li>
							<li className={styles.item}>
								<EventCard isPreview={true} id="sup-boarding-day" name="День сап-бординга" place="Россия" date="29.06.2021" owner="неизвестно" />
							</li>
						</>
					} />

					<img className={styles.figure3} src={figure3} alt="фотография"/>
					<img className={styles.figure4} src={figure4} alt="фотография"/>

					{isAuthenticated && (
						<div className={styles.button} onClick={handlerClick}>
							<Button text="Все события" />
						</div>
					)}
				</div>
			</div>
		</section>
  );
}
