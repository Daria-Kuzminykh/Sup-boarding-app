import React from 'react';
import styles from './noregister.css';
import {Break} from "../../Break";
import {Button} from "../../Button";
import {Auth} from "../../../store/actions";
import {storageName} from "../../../hooks/useAuth";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";

export function NoRegister({ isEndTime = true }: { isEndTime?: boolean }) {
	const dispatch = useDispatch();
	const history = useHistory();

	function handlerClick() {
		dispatch(Auth({token: '', userId: '', isAuthenticated: false, loginName: ''}));
		localStorage.removeItem(storageName);
		history.push('home/auth/login');
	}

  return (
		<div className={styles.block}>
			<Break size={60} />
			<p className={styles.text}>
				{isEndTime ? 'Время сеанса истекло, необходимо войти в личный кабинет снова.' : 'Для просмотра данного раздела необходимо войти в личный профиль.'}
			</p>
			<div className={styles.button} onClick={handlerClick}>
				<Button text="Войти" />
			</div>
		</div>
  );
}
