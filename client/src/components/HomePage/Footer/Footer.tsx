import React from 'react';
import styles from './footer.css';
import logo from '../../../static/image/logo.webp';
import {InstagramIcon, VKIcon} from "../../icons";

export function Footer() {
  return (
		<footer className={styles.footer}>
			<div className="container">
				<div className={styles.content}>
					<div className={styles.left}>
						<img className={styles.logo} src={logo} alt="логотип"/>
						<p className={styles.email}>Email: <a href="mailto:ds.kuzminyh@yandex.ru">ds.kuzminyh@yandex.ru</a></p>
					</div>
					<div className={styles.right}>
						<p className={styles.copyright}>© Кузьминых Д.С., 2021</p>
						<a className={styles.vk} target="_blank" href="https://vk.com/id516034149">
							<VKIcon />
						</a>
						<a className={styles.insta} target="_blank" href="https://www.instagram.com/kuzminykh_daria99/?utm_medium=copy_link">
							<InstagramIcon />
						</a>
					</div>
				</div>
			</div>
		</footer>
  );
}
