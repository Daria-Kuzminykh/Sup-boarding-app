import React, {useState} from 'react';
import styles from './header.css';
import logo from '../../../static/image/logo.webp';
import {Link} from "react-router-dom";
import {BurgerIcon, CloseIcon} from "../../icons";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/rootState";
import {UserButton} from "./UserButton";
import {EntryButton} from "./EntryButton";

export function Header() {
	const isAuthenticated = useSelector<RootState>(state => state.auth.isAuthenticated);
	const loginName = useSelector<RootState>(state => state.auth.loginName);
	const [isOpen, setIsOpen] = useState(styles.nav);

  return (
		<header id="home">
			<div className={styles.container}>
				<img className={styles.logo} src={logo} alt="логотип"/>

				<div className={styles.burger} onClick={() => setIsOpen(styles.isOpen)}>
					<BurgerIcon />
				</div>

				<nav className={isOpen}>
					<div className={styles.closeButton} onClick={() => setIsOpen(styles.nav)}><CloseIcon /></div>
					<ul className={styles.list} onClick={() => setIsOpen(styles.nav)}>
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
