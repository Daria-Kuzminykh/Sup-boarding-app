import React from 'react';
import styles from './routecard.css';
import {ClockIcon, LevelFiveIcon, LevelFourIcon, LevelOneIcon, LevelThereIcon, LevelTwoIcon} from "../../icons";
import {Link, useLocation} from "react-router-dom";

interface ICard {
	name: string;
	owner: string;
	place: string;
	level: number;
	time: number;
	id: string;
	img: string;
}

export function RouteCard({ name, id, level, owner, place, time, img }: ICard) {
  return (
		<div className={styles.card}>
			<div className={styles.overflow}>
				<Link to={location => `${location.pathname}/routes/${id}`}></Link>
				<div className={styles.detailButton}>Подробнее</div>
			</div>
			<div className={styles.plug}/>
			<div className={styles.imgBox}>
				<img src={img} alt="фотография места"/>
			</div>
			<div className={styles.content}>
				<h3 className={styles.title}>{name}</h3>

				<p className={styles.owner}>
					<span className={styles.ownerText}>Автор: </span>
					{owner}
				</p>

				<p className={styles.place}>
					<span className={styles.placeText}>Место: </span>
					{place}
				</p>

				<div className={styles.level}>
					{
						level === 1 && <LevelOneIcon /> ||
						level === 2 && <LevelTwoIcon /> ||
						level === 3 && <LevelThereIcon /> ||
						level === 4 && <LevelFourIcon /> ||
						level === 5 && <LevelFiveIcon />
					}
					<span>{level} уровень сложности</span>
				</div>

				<div className={styles.time}>
					<ClockIcon />
					<span>{time} {time === 1 && <span>час</span> || time < 5 && <span>часа</span> || time > 4 && <span>часов</span>} плавания</span>
				</div>
			</div>
		</div>
  );
}
