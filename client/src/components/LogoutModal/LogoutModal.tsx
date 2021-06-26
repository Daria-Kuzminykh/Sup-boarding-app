import React from 'react';
import styles from './logoutmodal.css';
import {Modal} from "../Modal";
import {Button} from "../Button";
import {Link} from "react-router-dom";
import {Auth, User} from "../../store/rootReducer";
import {useAuth} from "../../hooks/useAuth";
import {useDispatch} from "react-redux";

export function LogoutModal() {
	const { logout } = useAuth();
	const dispatch = useDispatch();

	function handlerClick() {
		logout();
		dispatch(Auth({ token: '', userId: '', isAuthenticated: false, loginName: '' }));
		dispatch(User({ name: '', surname: '', supRoutes: [], events: [], }));
	}

  return (
		<Modal path="/" children={
			<div className={styles.content}>
				<p className={styles.text}>Вы уверены, что хотите выйти из личного профиля?</p>
				<div className={styles.button} onClick={handlerClick}>
					<Button text="Выйти" />
				</div>
				<Link to="/">Отмена</Link>
			</div>
		} />
  );
}
