import React from 'react';
import styles from './userdata.css';
import {useSelector} from "react-redux";
import {IUser, RootState} from "../../../store/rootState";
import {useHistory} from "react-router-dom";

export function UserData() {
	const user = useSelector<RootState, IUser>(state => state.user);
	const loginName = useSelector<RootState>(state => state.auth.loginName);
	const history = useHistory();

	function handlerClick() {
		history.push('/user/change-form');
	}

  return (
		<>
			<h3 className={styles.smallTitle}>Мои данные</h3>
			<div className={styles.data}>
				<p className={styles.dataRow}>
					<span className={styles.dataName}>Имя: </span>
					<span className={styles.dataValue}>{`${user.name}`}</span>
				</p>
				<p className={styles.dataRow}>
					<span className={styles.dataName}>Фамилия: </span>
					<span className={styles.dataValue}>{`${user.surname}`}</span>
				</p>
				<p className={styles.dataRow}>
					<span className={styles.dataName}>Логин: </span>
					<span className={styles.dataValue}>{`${loginName}`}</span>
				</p>
			</div>
			<button className={styles.changeButton} onClick={handlerClick}>Изменить личные данные</button>
		</>
  );
}
