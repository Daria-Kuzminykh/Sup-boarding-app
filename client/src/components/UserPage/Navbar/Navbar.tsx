import React from 'react';
import styles from './navbar.css';
import logo from './../../../static/image/logo.webp';
import {Link, useHistory} from 'react-router-dom';
import {EntryButton} from "../../HomePage/Header/EntryButton";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/rootReducer";

export function Navbar() {
	const isAuthenticated = useSelector<RootState>(state => state.auth.isAuthenticated);
	const history = useHistory();

  return (
		<div className={styles.header}>
			<div className="container">
				<div className={styles.content}>
					<img src={logo} alt="логотип"/>

					<ul className={styles.list}>
						<li className={styles.item}>
							<Link to="/">Главная</Link>
						</li>
						<li className={styles.item}>
							<Link to="/routes">Маршруты</Link>
						</li>
						<li className={styles.item}>
							<Link to="/events">События</Link>
						</li>
						<li className={styles.item}>
							<Link to="/user">Личный кабинет</Link>
						</li>
					</ul>

					{!isAuthenticated && (
						<Link to="/home/auth/login">
							<EntryButton text="Войти" />
						</Link>
					)}

					{isAuthenticated && (
						<div onClick={() => {history.push('/home/auth/logout')}}>
							<EntryButton text="Выйти"/>
						</div>
					)}
				</div>
			</div>
		</div>
  );
}
