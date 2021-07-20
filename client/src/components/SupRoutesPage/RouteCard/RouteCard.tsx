import React from 'react';
import styles from './routecard.css';
import {ClockIcon, LevelFiveIcon, LevelFourIcon, LevelOneIcon, LevelThereIcon, LevelTwoIcon} from "../../icons";
import {Link, useLocation} from "react-router-dom";
import cover1 from '../../../static/image/cover1.webp';
import cover2 from '../../../static/image/cover2.webp';
import cover3 from '../../../static/image/cover3.webp';
import cover4 from '../../../static/image/cover4.webp';
import cover5 from '../../../static/image/cover5.webp';


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
	const cover = img || level === 1 && cover4 || level === 2 && cover3 || level === 3 && cover2 || level === 4 && cover1 || level === 5 && cover5;

  return (
		<div className={styles.card}>
			<div className={styles.overflow}>
				<Link to={location => `${location.pathname}/routes/${id}`}></Link>
				<div className={styles.detailButton}>Подробнее</div>
			</div>
			<div className={styles.plug}/>
			<div className={styles.imgBox}>
				<img className={styles.cardCover} src={cover} alt="фотография места или обложка"/>
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

				<p className={styles.more}>Подробнее</p>
			</div>
		</div>
  );
}
