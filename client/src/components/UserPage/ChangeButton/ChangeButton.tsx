import React from 'react';
import styles from './changebutton.css';
import {IActionButton} from "../ActionBlock";
import {useHistory} from "react-router-dom";
import {useHttp} from "../../../hooks/useHttp";
import {useDispatch, useSelector} from "react-redux";
import {EventChangeAction, RouteChangeAction} from "../../../store/actions";
import {RootState} from "../../../store/rootState";
import {SpinnerIcon} from "../../icons";

export function ChangeButton({ isRoute, id }: IActionButton) {
	const history = useHistory();
	const dispatch = useDispatch();
	const token = useSelector<RootState>(state => state.auth.token);
	const {request, loading, error, clearError} = useHttp();

	async function handlerClick() {
		try {
			clearError();
			if (isRoute) {
				const { region, place, name, level, time, fotoLink, descr, plus, minus, _id, coverChoice, stravaLink, coordinatesLink } = await request(`/change-route/${id}`);
				dispatch(RouteChangeAction({ region, place, name, level, time, fotoLink, descr, plus, minus, _id, coverChoice, stravaLink, coordinatesLink }));
				history.push('/me/change-route');
			} else {
				const { name, place, descr, contacts, contactTel, dateEvent, _id } = await request(`/events/${id}`, 'GET', null, {
					Authorization: `Bearer ${token}`
				});
				dispatch(EventChangeAction({name, place, descr, contacts, contactTel, dateEvent, _id }));
				history.push('/me/change-event');
			}
		} catch (e) {}
		;
	}

	if (loading) {
		return <button className={styles.button}>
			<div className={styles.loading}>
				<SpinnerIcon fill="#fff" width="20" height="20"/>
			</div>
			Изменить
		</button>
	}

	if (error) history.push('/no-register');

  return (
		<button className={styles.button} onClick={handlerClick}>Изменить</button>
  );
}
