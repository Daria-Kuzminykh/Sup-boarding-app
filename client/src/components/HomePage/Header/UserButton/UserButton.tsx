import React, {useEffect, useRef, useState} from 'react';
import styles from './userbutton.css';
import {UserIcon} from "../../../icons";
import {Link, useHistory} from "react-router-dom";

export function UserButton({ userName }: {userName: string}) {
	const history = useHistory();
	const [isOpen, setIsOpen] = useState(false);

	function handlerClick() {
		setIsOpen(!isOpen);
	}

  return (
		<div className={styles.entry}>
			<button className={styles.userSpan} onClick={handlerClick}>
				<span>{userName}</span>
				<UserIcon />
			</button>
			{isOpen && (
				<ul className={styles.action}>
					<li className={styles.item} onClick={handlerClick}>
						<Link to="/me">Личный кабинет</Link>
					</li>
					<li className={styles.item} onClick={handlerClick}>
						<button className={styles.button} onClick={() => {history.push('home/auth/logout')}}>Выйти</button>
					</li>
				</ul>
			)}
		</div>
  );
}
