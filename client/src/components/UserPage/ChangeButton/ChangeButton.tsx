import React from 'react';
import styles from './changebutton.css';
import {IActionButton} from "../ActionBlock";
import {useHistory} from "react-router-dom";
import {useHttp} from "../../../hooks/useHttp";
import {useDispatch, useSelector} from "react-redux";
import {EventChangeAction, RootState, RouteChangeAction} from "../../../store/rootReducer";
import {SpinnerIcon} from "../../icons";

export function ChangeButton({ isRoute, id }: IActionButton) {
	const history = useHistory();
	const dispatch = useDispatch();
	const token = useSelector<RootState>(state => state.auth.token);
	const {request, loading, error, clearError} = useHttp();

	async function handlerClick() {
		try {
			if (isRoute) {
				const { region, place, name, level, time, fotoLink, descr, plus, minus, _id } = await request(`/change-route/${id}`);
				dispatch(RouteChangeAction({ region, place, name, level, time, fotoLink, descr, plus, minus, _id }));
				history.push('/user/change-route');
			} else {
				const { name, place, descr, contacts, contactTel, dateEvent, _id } = await request(`/events/${id}`, 'GET', null, {
					Authorization: `Bearer ${token}`
				});
				dispatch(EventChangeAction({name, place, descr, contacts, contactTel, dateEvent, _id }));
				history.push('/user/change-event');
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

  return (
		<button className={styles.button} onClick={handlerClick}>Изменить</button>
  );
}
