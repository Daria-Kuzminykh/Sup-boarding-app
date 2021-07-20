import React from 'react';
import styles from './eventcard.css';
import {CalendarIcon} from "../../icons";
import {useHistory, useLocation} from "react-router-dom";

interface IEventCard {
	isPreview?: boolean;
	name: string;
	place: string;
	date: string;
	owner: string;
	id: string;
}

export function EventCard({ name, date, owner, place, id, isPreview = false }: IEventCard) {
	const history = useHistory();
	const location = useLocation();

	function handlerClick() {
		if (isPreview) {
			history.push(`/home/event/${id}`);
		} else {
			history.push(`${location.pathname}/events/${id}`);
		}
	}

  return (
			<div className={styles.card} onClick={handlerClick}>
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

				<p className={styles.more}>Подробнее</p>
			</div>
  );
}
