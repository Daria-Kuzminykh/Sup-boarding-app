import React from 'react';
import styles from './header.css';
import logo from '../../../static/image/logo.webp';
import {Link} from "react-router-dom";
import {UserIcon} from "../../icons";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/rootReducer";
import {UserButton} from "./UserButton";
import {EntryButton} from "./EntryButton";
import {storageName} from "../../../hooks/useAuth";

export function Header() {
	const isAuthenticated = useSelector<RootState>(state => state.auth.isAuthenticated);
	const loginName = useSelector<RootState>(state => state.auth.loginName);

  return (
		<header id="home">
			<div className={styles.container}>
				<img src={logo} alt="логотип"/>

				<nav className={styles.nav}>
					<ul className={styles.list}>
						<li className={styles.item}>
							<a href="#about" className={styles.link}>О проекте</a>
						</li>
						<li className={styles.item}>
							<a href="#SupBoarding" className={styles.link}>Sup boarding</a>
						</li>
						<li className={styles.item}>
							<a href="#routes" className={styles.link}>Маршруты</a>
						</li>
						<li className={styles.item}>
							<a href="#events" className={styles.link}>События</a>
						</li>
						<li className={styles.item}>
							<a href="#contacts" className={styles.link}>Контакты</a>
						</li>
					</ul>
				</nav>

				{!isAuthenticated && (
					<Link to="/home/auth/login">
						<EntryButton text="Войти" />
					</Link>
				)}

				{isAuthenticated && <UserButton userName={`${loginName}`} />}
			</div>
		</header>
  );
}
