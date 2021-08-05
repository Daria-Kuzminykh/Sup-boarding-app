import React, {useEffect, useState} from "react";
import styles from "./deletemodal.css";
import {Button} from "../../Button";
import {useHistory} from 'react-router-dom';
import {Modal} from "../../Modal";
import {useDispatch, useSelector} from "react-redux";
import {User} from "../../../store/actions";
import {useHttp} from "../../../hooks/useHttp";
import {Message} from "../../Message";
import {useAnimation} from "../../../hooks/useAnimation";
import {IDeleteElement, RootState} from "../../../store/rootState";

export function DeleteModal() {
	const history = useHistory();
	const dispatch = useDispatch();
	const token = useSelector<RootState>(state => state.auth.token);
	const {loading, error, clearError, request} = useHttp();
	const [message, setMessage] = useState('');
	const [success, setSuccess] = useState('');
	const deleteElement = useSelector<RootState, IDeleteElement>(state => state.deleteElement);

	const path = deleteElement.isRoute && `/routes/${deleteElement.id}` || !deleteElement.isRoute && `/event/${deleteElement.id}`;

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

				history.push('/me');
			}, 700);
		} catch (e) {}
	}

	function handlerClickLink() {
		useAnimation();

		setTimeout(() => {
			history.push('/me');
		}, 200);
	}

	if (error === 'Нет авторизации') history.push('/no-register');

	useEffect(() => {
		setMessage(error);
	}, [error]);

	return (
		<Modal path="/me" children={
			<div className={styles.content}>
				<p className={styles.text}>Вы уверены, что хотите удалить?</p>

				{error && <Message message={message} isError={true} /> || success && <Message message={success} isError={false} />}

				<div className={styles.button} onClick={handlerClick}>
					<Button text="Удалить" loading={loading}/>
				</div>

				<a onClick={handlerClickLink}>Отмена</a>
			</div>
		} />
	)
}