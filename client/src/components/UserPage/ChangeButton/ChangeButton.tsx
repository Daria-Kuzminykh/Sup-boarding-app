import React from 'react';
import styles from './changebutton.css';
import {IActionButton} from "../ActionBlock";
import {useHistory} from "react-router-dom";
import {useHttp} from "../../../hooks/useHttp";
import {useDispatch} from "react-redux";

export function ChangeButton({ isRoute, id }: IActionButton) {
	const history = useHistory();
	const dispatch = useDispatch();
	const {request, loading, error, clearError} = useHttp();

	async function handlerClick() {
		if (isRoute) {

			history.push('/user/change-route');
		}
	}

  return (
		<button className={styles.button} onClick={handlerClick}>Изменить</button>
  );
}
