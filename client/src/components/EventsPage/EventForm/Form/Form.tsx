import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import styles from './form.css';
import {Button} from "../../../Button";
import {useDispatch, useSelector} from "react-redux";
import {IEvent, RootState,} from '../../../../store/rootState';
import {EventAction, EventChangeAction, User} from "../../../../store/actions";
import {useHttp} from "../../../../hooks/useHttp";
import {useHistory} from "react-router-dom";
import {Message} from "../../../Message";

export function Form({isNew}: {isNew: boolean}) {
	const form = isNew && useSelector<RootState, IEvent>(state => state.event) || useSelector<RootState, IEvent>(state => state.eventChange);
	const token = useSelector<RootState>(state => state.auth.token);
	const dispatch = useDispatch();
	const history = useHistory();
	const {request, loading, error, clearError} = useHttp();
	const [message, setMessage] = useState('');
	const [success, setSuccess] = useState('');

	if (error) history.push('/no-register');

	useEffect(() => {
		setMessage(error);
	}, [error]);

	function handlerChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
		if (isNew) {
			dispatch(EventAction({ ...form, [event.target.name]: event.target.value }));
		} else {
			dispatch(EventChangeAction({ ...form, [event.target.name]: event.target.value }));
		}
	}

	async function handlerSubmit(event: FormEvent) {
		event.preventDefault();
		clearError();
		setMessage('');

		try {
			if (isNew) {
				const data = await request('/user/event-form', 'POST', {...form}, {
					Authorization: `Bearer ${token}`
				});
				setSuccess(data.message);
				dispatch(EventAction({ name: '', place: '', dateEvent: '', contacts: '', contactTel: '', descr: '' }));
			} else  {
				const data = await request('/event/change', 'PATCH', {...form}, {
					Authorization: `Bearer ${token}`
				});
				setSuccess(data.message);
			}
			setTimeout(() => {
				dispatch(User({ name: '', surname: '', supRoutes: [], events: [] }));
				history.push('/me');
			}, 700);
		} catch (e) {}
	}
	return (
		<form className={styles.form} onSubmit={handlerSubmit}>
			<div className={styles.inputBox}>
				<label htmlFor="name">1. ?????????????? ???????????????? ??????????????*</label>
				<input
					className={styles.input}
					value={form.name}
					id="name"
					name="name"
					type="text"
					placeholder="????????????????"
					onChange={handlerChange}
					required={true}
					minLength={2}
				/>
			</div>

			<div className={styles.inputBox}>
				<label htmlFor="place">2. ?????????????? ???????????????? ?????????? ?????? ??????????????*</label>
				<input
					className={styles.input}
					value={form.place}
					id="place"
					name="place"
					type="text"
					placeholder="??????????"
					onChange={handlerChange}
					required={true}
					minLength={2}
				/>
			</div>

			<div className={styles.inputBox}>
				<label htmlFor="dateEvent">3. ?????????????? ???????? ??????????????*</label>
				<input
					className={styles.input}
					value={form.dateEvent}
					id="dateEvent"
					name="dateEvent"
					type="date"
					placeholder="????????"
					onChange={handlerChange}
					required={true}
					min="2021-08-01"
					max="2025-01-01"
				/>
			</div>

			<div className={styles.inputBox}>
				<label htmlFor="descr">4. ???????????? ?????????????? ??????????????</label>
				<textarea
					className={styles.textarea}
					value={form.descr}
					id="descr"
					name="descr"
					placeholder="???????????????? ??????????????"
					onChange={handlerChange}
				/>
			</div>

			<div className={styles.inputBox}>
				<label htmlFor="contacts">5. ???????????????? ???????????? ???? ???????????????? ??????.?????????? ?????? ??????????*</label>
				<input
					className={styles.input}
					value={form.contacts}
					id="contacts"
					name="contacts"
					type="text"
					placeholder="????????????????"
					onChange={handlerChange}
					required={true}
				/>
			</div>

			<div className={styles.inputBox}>
				<label htmlFor="contactTel">6. ?????? ?????????????? ???????????????? ???????????????????? ??????????????</label>
				<input
					className={styles.input}
					value={form.contactTel}
					id="contactTel"
					name="contactTel"
					type="tel"
					placeholder="??????????????"
					onChange={handlerChange}
					minLength={11}
					maxLength={11}
				/>
			</div>

			<div className={styles.break} />

			{error && <Message message={message} isError={true} /> || success && <Message message={success} isError={false} />}

			<div className={styles.button}>
				<Button text="??????????????????" loading={loading}/>
			</div>
		</form>
	);
}

