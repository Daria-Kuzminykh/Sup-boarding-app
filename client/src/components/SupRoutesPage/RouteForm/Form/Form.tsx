import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import styles from './form.css';
import {Button} from "../../../Button";
import {useDispatch, useSelector} from "react-redux";
import {
	Auth,
	IRoute,
	IUser,
	RootState,
	Route,
	RouteChangeAction,
	RoutesListAction,
	User
} from "../../../../store/rootReducer";
import {useHttp} from "../../../../hooks/useHttp";
import {useHistory} from "react-router-dom";
import {Message} from "../../../Message";
import {SpinnerIcon} from "../../../icons";
import {Break} from "../../../Break";

export function Form({isNew}: {isNew: boolean}) {
	const form = isNew && useSelector<RootState, IRoute>(state => state.route) || useSelector<RootState, IRoute>(state => state.routeChange);
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
		if (isNew) {
			dispatch(Route({ ...form, [event.target.name]: event.target.value }));
		} else {
			dispatch(RouteChangeAction({ ...form, [event.target.name]: event.target.value }));
		}
	}

	async function handlerSubmit(event: FormEvent) {
		event.preventDefault();
		clearError();
		setMessage('');

		try {
			if (isNew) {
				const data = await request('/user/route-form', 'POST', {...form}, {
					Authorization: `Bearer ${token}`
				});
				setSuccess(data.message);
				dispatch(Route({region: 'Красноярский край', place: '', name: '', level: '1', time: '', fotoLink: '', descr: '', plus: '', minus: '', dateEvent: '',}));

				setTimeout(() => {
					dispatch(User({ name: '', surname: '', supRoutes: [], events: [] }));
					history.push('/user/route-cover');
				}, 700);

			} else {
				const data = await request('/change-route', 'PATCH', {...form}, {
					Authorization: `Bearer ${token}`
				});
				setSuccess(data.message);
				setTimeout(() => {
					dispatch(User({ name: '', surname: '', supRoutes: [], events: [] }));
					history.push('/user');
				}, 700);
			}
		} catch (e) {}
	}
  return (
		<form onSubmit={handlerSubmit} encType="multipart/form-data">
			<div className={styles.inputBox}>
				<label htmlFor="name">1. Введите название маршрута*</label>
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
				<label htmlFor="region">2. Выберите регион </label>
				<select className={styles.select} name="region" id="region" value={form.region} onChange={handlerChange}>
					<option value="Красноярский край">Красноярский край</option>
					<option value="Иркутская область">Иркутская область</option>
					<option value="Республика Хакасия">Республика Хакасия</option>
					<option value="Другой регион">Другой регион</option>
				</select>
			</div>

			<div className={styles.inputBox}>
				<label htmlFor="place">3. Введите название места или водоема*</label>
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
				<label htmlFor="level">4. Выберите уровень сложности маршрута</label>
				<select className={styles.select} name="level" id="level" value={form.level} onChange={handlerChange}>
					<option value={1}>1 уровень</option>
					<option value={2}>2 уровень</option>
					<option value={3}>3 уровень</option>
					<option value={4}>4 уровень</option>
					<option value={5}>5 уровень</option>
				</select>
			</div>

			<div className={styles.inputBox}>
				<label htmlFor="time">5. Введите количество часов, затраченных на маршрут*</label>
				<input
					className={styles.input}
					value={form.time}
					id="time"
					name="time"
					type="number"
					min={1}
					max={1000}
					placeholder="Количество часов"
					onChange={handlerChange}
				/>
			</div>

			<div className={styles.inputBox}>
				<label htmlFor="descr">6. Опишите как можно красочнее ваш маршрут</label>
				<textarea
					className={styles.textarea}
					value={form.descr}
					id="descr"
					name="descr"
					placeholder="Описание маршрута"
					onChange={handlerChange}
				/>
			</div>

			<div className={styles.inputBox}>
				<label htmlFor="plus">7. Перечислите положительные стороны маршрута</label>
				<textarea
					className={styles.textarea}
					value={form.plus}
					id="plus"
					name="plus"
					placeholder="Плюсы маршрута"
					onChange={handlerChange}
				/>
			</div>

			<div className={styles.inputBox}>
				<label htmlFor="minus">8. Перечислите отрицательные стороны маршрута</label>
				<textarea
					className={styles.textarea}
					value={form.minus}
					id="minus"
					name="minus"
					placeholder="Минусы маршрута"
					onChange={handlerChange}
				/>
			</div>

			<div className={styles.inputBox}>
				<label htmlFor="fotoLink">9. Ввставьте ссылку на фотографии с маршрута</label>
				<input
					className={styles.input}
					value={form.fotoLink}
					id="fotoLink"
					name="fotoLink"
					type="text"
					placeholder="Ссылка на фото"
					onChange={handlerChange}
				/>
			</div>

			<Break size={20}  mobileSize={10}/>

			{error && <Message message={message} isError={true} /> || success && <Message message={success} isError={false} />}

			<div className={styles.button}>
				{loading && <SpinnerIcon fill="#ffffff" />}
				<Button text="Сохранить" />
			</div>
		</form>
  );
}
