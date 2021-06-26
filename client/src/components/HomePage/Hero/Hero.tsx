import React from 'react';
import styles from './hero.css';
import logo from '../../../static/image/hero-logo.webp';
import {Link} from 'react-router-dom';
import {Button} from "../../Button";

export function Hero() {
  return (
		<section className={styles.container}>
			<div className="container">
				<h1 className={styles.visuallyHidden}>Sup boarding в Сибири</h1>
				<img src={logo} alt="логотип проекта" className={styles.logo}/>
				<p className={styles.text}>Сборник маршрутов по озерам, рекам Сибири и других регионов от любителей путешествий на sup-доске.</p>
				<div className={styles.button}>
					<Link to="/routes" tabIndex={-1}>
						<Button text="посмотреть маршруты" />
					</Link>
				</div>
			</div>
		</section>
  );
}
