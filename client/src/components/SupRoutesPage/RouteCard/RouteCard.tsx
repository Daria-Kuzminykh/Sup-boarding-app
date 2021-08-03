import React from 'react';
import styles from './routecard.css';
import {ClockIcon, LevelFiveIcon, LevelFourIcon, LevelOneIcon, LevelThereIcon, LevelTwoIcon} from "../../icons";
import {Link} from "react-router-dom";
import cover6 from '../../../static/image/cover1.webp';
import cover5 from '../../../static/image/cover2.webp';
import cover4 from '../../../static/image/cover3.webp';
import cover3 from '../../../static/image/cover4.webp';
import cover2 from '../../../static/image/cover5.webp';
import cover1 from '../../../static/image/cover6.webp';


interface ICard {
	name: string;
	owner: string;
	place: string;
	level: number;
	time: number;
	id: string;
	img: string;
	coverNumber: number;
}

export function RouteCard({ name, id, level, owner, place, time, img, coverNumber }: ICard) {
	const cover = img || coverNumber === 1 && cover1 || coverNumber === 2 && cover2 || coverNumber === 3 && cover3 || coverNumber === 4 && cover4 || coverNumber === 5 && cover5  || coverNumber === 6 && cover6;

  return (
		<div className={styles.card}>
			<div className={styles.overflow}>
				<Link to={location => `${location.pathname}/routes/${id}`}></Link>
				<div className={styles.detailButton}>Подробнее</div>
			</div>
			<div className={styles.plug}/>
			<div className={styles.imgBox}>
				<img className={styles.cardCover} src={String(cover)} alt="фотография места или обложка"/>
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
