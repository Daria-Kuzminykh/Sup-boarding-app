import React from 'react';
import styles from './eventcard.css';
import {CalendarIcon} from "../../icons";
import {useHistory, useLocation} from "react-router-dom";

interface IEventCard {
	name: string;
	place: string;
	date: string;
	owner: string;
	id: string;
}

export function EventCard({ name, date, owner, place, id }: IEventCard) {
	const history = useHistory();
	const location = useLocation();
  return (
			<div className={styles.card} onClick={() => history.push(`${location.pathname}/events/${id}`)}>
				<CalendarIcon />
				<div className={styles.left}>
					<p className={styles.name}>{name}</p>
					<p className={styles.place}><span className={styles.placeText}>Место: </span>{place}</p>
				</div>

				<div className={styles.separator}/>

				<div className={styles.right}>
					<p className={styles.date}><span className={styles.dateText}>Дата: </span>{date}</p>
					<p className={styles.owner}><span className={styles.ownerText}>Автор: </span>{owner}</p>
				</div>
			</div>
  );
}
