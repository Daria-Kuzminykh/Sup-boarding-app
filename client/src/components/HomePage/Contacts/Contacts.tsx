import React from 'react';
import styles from './contacts.css';
import {Title} from "../../Title";
import {SurfRaiderIcon} from "../../icons";
import figure5 from '../../../static/image/figure-5.webp';
import supDecor from '../../../static/image/decor-img.webp'
import {Break} from "../../Break";

export function Contacts() {
  return (
		<section className={styles.contacts}>
			<div className="container">
				<Title text="Контакты" id="contacts"/>
				<Break size={50} tabletSize={30} mobileSize={20}/>
				<p className={styles.text}>Если вас заинтересовал sup-boarding, но у вас нет собственной доски, вы можете воспользоваться прокатом сапов.</p>
				<h3 className={styles.smallTitle}>Прокат сапов в Красноярске:</h3>
				<div className={styles.linkBox}>
					<SurfRaiderIcon />
					<div className={styles.separator}/>
					<ul className={styles.list}>
						<li className={styles.item}>
							<a className={styles.link} target="_blank" href="http://adventuretourssiberia.ru/supsurf24">supsurf24</a>
						</li>
						<li className={styles.item}>
							<a className={styles.link} target="_blank" href="https://sibsup.ru">sibsup</a>
						</li>
						<li className={styles.item}>
							<a className={styles.link} target="_blank" href="https://www.instagram.com/den.ski.sup/">den.ski.sup</a>
						</li>
						<li className={styles.item}>
							<a className={styles.link} target="_blank" href="https://taplink.cc/doska_sup_club">doska_sup_club</a>
						</li>
					</ul>
				</div>

				<img className={styles.figure5} src={figure5} alt="фотография"/>
				<img className={styles.decor} src={supDecor} alt="сап-доски"/>
			</div>
		</section>
  );
}
