import React, {useEffect, useState} from 'react';
import styles from './deletemodal.css';
import {Button} from "../../Button";
import {Link, useHistory} from "react-router-dom";
import {Modal} from "../../Modal";
import {useDispatch, useSelector} from "react-redux";
import {EventsListAction, IDeleteElement, RootState, RoutesListAction, User} from "../../../store/rootReducer";
import {useHttp} from "../../../hooks/useHttp";
import {Message} from "../../Message";

export function DeleteModal() {
	const history = useHistory();
	const dispatch = useDispatch();
	const token = useSelector<RootState>(state => state.auth.token);
	const {loading, error, clearError, request} = useHttp();
	const [message, setMessage] = useState('');
	const [success, setSuccess] = useState('');
	const deleteElement = useSelector<RootState, IDeleteElement>(state => state.deleteElement);

	const path = deleteElement.isRoute && `/routes/${deleteElement.id}` || !deleteElement.isRoute && `/events/${deleteElement.id}`;

	async function handlerClick() {
		clearError();
		setMessage('');

		try {
			const data = await request(path, 'DELETE', null, {
				Authorization: `Bearer ${token}`
			})
			setSuccess(data.message);
			setTimeout(() => {
				dispatch(User({ name: '', surname: '', supRoutes: [], events: [] }));

				// if (deleteElement.isRoute) {
				// 	dispatch(RoutesListAction([]));
				// } else {
				// 	dispatch(EventsListAction([]));
				// }

				history.push('/user');
			}, 700);
		} catch (e) {}
	}

	useEffect(() => {
		setMessage(error);
	}, [error]);

  return (
		<Modal path="/user" children={
			<div className={styles.content}>
				<p className={styles.text}>Вы уверены, что хотите удалить?</p>

				{error && <Message message={message} isError={true} /> || success && <Message message={success} isError={false} />}

				<div className={styles.button} onClick={handlerClick}>
					<Button text="Удалить" />
				</div>

				<Link to="/user">Отмена</Link>
			</div>
		} />
  )
}
