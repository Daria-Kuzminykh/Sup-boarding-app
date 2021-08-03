import React from 'react';
import styles from './logoutmodal.css';
import {Modal} from "../Modal";
import {Button} from "../Button";
import {useHistory} from "react-router-dom";
import {Auth, User} from "../../store/actions";
import {useAuth} from "../../hooks/useAuth";
import {useDispatch} from "react-redux";
import {useAnimation} from "../../hooks/useAnimation";

export function LogoutModal() {
	const { logout } = useAuth();
	const dispatch = useDispatch();
	const history = useHistory();

	function handlerClick() {
		useAnimation();

		setTimeout(() => {
			logout();
			dispatch(Auth({ token: '', userId: '', isAuthenticated: false, loginName: '' }));
			dispatch(User({ name: '', surname: '', supRoutes: [], events: [], }));
			history.push('/');
		}, 200)
	}

	function handlerClickLink() {
		useAnimation();

		setTimeout(() => {
			history.push('/');
		}, 200);
	}

  return (
		<Modal path="/" children={
			<div className={styles.content}>
				<p className={styles.text}>Вы уверены, что хотите выйти из личного профиля?</p>
				<div className={styles.button} onClick={handlerClick}>
					<Button text="Выйти" />
				</div>
				<a onClick={handlerClickLink}>Отмена</a>
			</div>
		} />
  );
}
