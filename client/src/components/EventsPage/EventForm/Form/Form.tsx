import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import styles from './form.css';
import {Button} from "../../../Button";
import {useDispatch, useSelector} from "react-redux";
import {Auth, EventAction, IEvent, IRoute, RootState, Route, User} from "../../../../store/rootReducer";
import {useHttp} from "../../../../hooks/useHttp";
import {useHistory} from "react-router-dom";
import {Message} from "../../../Message";
import {SpinnerIcon} from "../../../icons";

export function Form() {
	const form = useSelector<RootState, IEvent>(state => state.event);
	const token = useSelector<RootState>(state => state.auth.token);
	const dispatch = useDispatch();
	const history = useHistory();
	const {request, loading, error, clearError} = useHttp();
	const [message, setMessage] = useState('');
	const [success, setSuccess] = useState('');

	useEffect(() => {
		setMessage(error);
	}, [error]);

	function handlerChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
		dispatch(EventAction({ ...form, [event.target.name]: event.target.value }));
	}

	async function handlerSubmit(event: FormEvent) {
		event.preventDefault();
		clearError();
		setMessage('');

		try {
			const data = await request('/user/event-form', 'POST', {...form}, {
				Authorization: `Bearer ${token}`
			});
			setSuccess(data.message);
			setTimeout(() => {
				dispatch(User({ name: '', surname: '', supRoutes: [], events: [] }));
				history.push('/user');
			}, 700);
		} catch (e) {}
		dispatch(EventAction({ name: '', place: '', dateEvent: '', contacts: '', contactTel: '', descr: '' }));
	}
	return (
		<form onSubmit={handlerSubmit}>
			<div className={styles.inputBox}>
				<label htmlFor="name">1. Введите название события*</label>
				<input
					className={styles.input}
					value={form.name}
					id="name"
					name="name"
					type="text"
					placeholder="Название"
					onChange={handlerChange}
				/>
			</div>

			<div className={styles.inputBox}>
				<label htmlFor="place">2. Введите название места или водоема*</label>
				<input
					className={styles.input}
					value={form.place}
					id="place"
					name="place"
					type="text"
					placeholder="Место"
					onChange={handlerChange}
				/>
			</div>

			<div className={styles.inputBox}>
				<label htmlFor="dateEvent">3. Введите дату события*</label>
				<input
					className={styles.input}
					value={form.dateEvent}
					id="dateEvent"
					name="dateEvent"
					type="date"
					placeholder="Дата"
					onChange={handlerChange}
				/>
			</div>

			<div className={styles.inputBox}>
				<label htmlFor="descr">4. Кратко опишите событие</label>
				<textarea
					className={styles.textarea}
					value={form.descr}
					id="descr"
					name="descr"
					placeholder="Описание события"
					onChange={handlerChange}
				/>
			</div>

			<div className={styles.inputBox}>
				<label htmlFor="contacts">5. Вставьте ссылку на страницу соц.сетей для связи*</label>
				<input
					className={styles.input}
					value={form.contacts}
					id="contacts"
					name="contacts"
					type="text"
					placeholder="Контакты"
					onChange={handlerChange}
				/>
			</div>

			<div className={styles.inputBox}>
				<label htmlFor="contactTel">6. При желании оставьте контактный телефон</label>
				<input
					className={styles.input}
					value={form.contactTel}
					id="contactTel"
					name="contactTel"
					type="number"
					placeholder="Телефон"
					onChange={handlerChange}
				/>
			</div>

			<div className={styles.break} />

			{error && <Message message={message} isError={true} /> || success && <Message message={success} isError={false} />}

			<div className={styles.button}>
				{loading && <SpinnerIcon fill="#ffffff" />}
				<Button text="Сохранить" />
			</div>
		</form>
	);
}

