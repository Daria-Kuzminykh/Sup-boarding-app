import React from 'react';
import styles from './userbutton.css';
import {UserIcon} from "../../../icons";
import {Link, useHistory} from "react-router-dom";

export function UserButton({ userName }: {userName: string}) {
	const history = useHistory();

  return (
		<div className={styles.entry}>
			<span>{userName}</span>
			<UserIcon />
			<ul className={styles.action}>
				<li className={styles.item}>
					<Link to="/user">Личный кабинет</Link>
				</li>
				<li className={styles.item}>
					<button className={styles.button} onClick={() => {history.push('home/auth/logout')}}>Выйти</button>
				</li>
			</ul>
		</div>
  );
}
