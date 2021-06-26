import React from 'react';
import styles from './about.css';
import {MapIcon, SurfBoardsIcon, TravelerIcon} from "../../icons";
import figure1 from '../../../static/image/figure-1.webp';
import figure2 from '../../../static/image/figure-2.webp';
import {Title} from "../../Title";
import {Link} from "react-router-dom";

export function About() {
  return (
		<section className={styles.about}>
			<div className="container">
				<ul className={styles.list}>
					<li className={styles.item}>
						<MapIcon />
						<p className={styles.descr}>Открывайте для себя новые маршруты</p>
					</li>
					<li className={styles.item}>
						<TravelerIcon />
						<p className={styles.descr}>Находите попутчиков в путешествия</p>
					</li>
					<li className={styles.item}>
						<SurfBoardsIcon />
						<p className={styles.descr}>Рассказывайте другим о своих сплавах</p>
					</li>
				</ul>
			</div>
			<div className={styles.fon}>
				<div className="container">
					<img className={styles.figure1} src={figure1} alt="фото"/>
					<img className={styles.figure2} src={figure2} alt="фото"/>
					<Title text="О проекте" id="about" />
					<p className={styles.text}>Мы рады преветствовать вас на нашем сайте, посвященом сап-бордингу!<br/>
						В этом клубе сап-путешественники из разных городов могут делиться  <Link to="/routes">маршрутами</Link> и рассказывать о своих приключениях друг другу. Мы хотим собрать информацию о прекрасных местах дикой природы, о неизвестных водоемах и нехоженых тропинках.<br/>
						<strong>Приглашаем вас присоединяйться к нашей веселой компании!</strong>
					</p>
					<p className={styles.text}>
						Здесь вы можете просматривать маршруты, пройденные другими путешественниками, а также создавать свои. Чтобы создать маршрут, необходимо пройти несложную <Link to="/auth/register">процедуру регистрации</Link> и заполнить всю подробную информацию о маршруте.
						Зарегистрированные пользователи могут также просматривать и добавлять <a href="#events">события</a>.
					</p>
				</div>
			</div>
		</section>
  );
}
