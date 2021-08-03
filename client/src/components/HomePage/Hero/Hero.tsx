import React from 'react';
import styles from './hero.css';
import logo from '../../../static/image/hero-logo.webp';
import logoMobile2 from '../../../static/image/hero-logo-mobile-2.png';
import {useHistory} from 'react-router-dom';
import {Button} from "../../Button";

export function Hero() {
	const history = useHistory();

	function handlerClick() {
		history.push('/routes');
		window.scrollTo(0, 0);
	}
  return (
		<section className={styles.container}>
			<div className="container">
				<h1 className={styles.visuallyHidden}>Sup boarding в Сибири</h1>
				<img src={logo} alt="логотип проекта" className={styles.logo}/>
				<img src={logoMobile2} alt="логотип проекта" className={styles.logoMobile}/>
				<p className={styles.text}>Сборник маршрутов по озерам, рекам Сибири и других регионов от любителей путешествий на sup-доске.</p>
				<p className={styles.textMobile}>Сборник маршрутов по озерам, рекам Сибири и других регионов.</p>
				<div className={styles.button} onClick={handlerClick}>
					<Button text="посмотреть маршруты" />
				</div>
			</div>
		</section>
  );
}
