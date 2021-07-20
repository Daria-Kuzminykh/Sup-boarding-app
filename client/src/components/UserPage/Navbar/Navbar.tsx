import React, {useState} from 'react';
import styles from './navbar.css';
import stylesMenu from '../../HomePage/Header/header.css'
import logo from './../../../static/image/logo.webp';
import {Link, useHistory} from 'react-router-dom';
import {EntryButton} from "../../HomePage/Header/EntryButton";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/rootReducer";
import {BurgerIcon, CloseIcon} from "../../icons";

export function Navbar() {
	const isAuthenticated = useSelector<RootState>(state => state.auth.isAuthenticated);
	const history = useHistory();
	const [isOpen, setIsOpen] = useState(stylesMenu.nav);

  return (
		<div className={styles.header}>
			<div className="container">
				<div className={styles.content}>
					<div className={stylesMenu.burger} onClick={() => setIsOpen(stylesMenu.isOpen)}>
						<BurgerIcon />
					</div>

					<img className={stylesMenu.logo} src={logo} alt="логотип"/>

					<nav className={isOpen}>
						<div className={stylesMenu.closeButton} onClick={() => setIsOpen(stylesMenu.nav)}><CloseIcon /></div>
						<ul className={styles.list} onClick={() => setIsOpen(stylesMenu.nav)}>
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
					</nav>

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
