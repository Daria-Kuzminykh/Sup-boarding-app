import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import styles from './form.css';
import {Button} from "../../../Button";
import {useDispatch, useSelector} from "react-redux";
import {Route, RouteChangeAction, User} from "../../../../store/actions";
import {IRoute, RootState} from '../../../../store/rootState';
import {useHttp} from "../../../../hooks/useHttp";
import {useHistory} from "react-router-dom";
import {Message} from "../../../Message";
import {Break} from "../../../Break";
import cover1 from '../../../../static/image/cover-preview-1.webp';
import cover2 from '../../../../static/image/cover-preview-2.webp';
import cover3 from '../../../../static/image/cover-preview-3.webp';
import cover4 from '../../../../static/image/cover-preview-4.webp';
import cover5 from '../../../../static/image/cover-preview-5.webp';
import cover6 from '../../../../static/image/cover-preview-6.webp';

export function Form({isNew}: {isNew: boolean}) {
	const form = isNew && useSelector<RootState, IRoute>(state => state.route) || useSelector<RootState, IRoute>(state => state.routeChange);
	const token = useSelector<RootState>(state => state.auth.token);
	const dispatch = useDispatch();
	const history = useHistory();
	const {request, loading, error, clearError} = useHttp();
	const [message, setMessage] = useState('');
	const [success, setSuccess] = useState('');

	if (error === 'Нет авторизации') history.push('/no-register');

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
				dispatch(Route({region: 'Красноярский край', place: '', name: '', level: '1', time: '', fotoLink: '', descr: '', plus: '', minus: '', dateEvent: '', coordinatesLink: '', stravaLink: '', coverChoice: '1' }));

				setTimeout(() => {
					dispatch(User({ name: '', surname: '', supRoutes: [], events: [] }));
					history.push('/user');
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
		<form onSubmit={handlerSubmit} className={styles.form}>
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
					required={true}
					minLength={2}
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
					required={true}
					minLength={2}
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
					required={true}
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
				<label htmlFor="fotoLink">9. Если у вас есть облачное хранилище данных (например Google-диск), то вставьте ссылку на фотографии с маршрута</label>
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

			<div className={styles.inputBox}>
				<label htmlFor="coordinatesLink">10. При желании вставьте ссылку на координаты старта маршрута из Google maps</label>
				<input
					className={styles.input}
					value={form.coordinatesLink}
					id="coordinatesLink"
					name="coordinatesLink"
					type="text"
					placeholder="Ссылка на координаты начала маршрута"
					onChange={handlerChange}
				/>
			</div>

			<div className={styles.inputBox}>
				<label htmlFor="stravaLink">11. Если вы пользуетесь Strava, то можете вставить ссылку на GPS-трек маршрута</label>
				<input
					className={styles.input}
					value={form.stravaLink}
					id="stravaLink"
					name="stravaLink"
					type="text"
					placeholder="Ссылка на GPS-трек"
					onChange={handlerChange}
				/>
			</div>

			<div className={styles.inputBox}>
				<label htmlFor="coverChoice">12. Выберите картинку для обложки карточки маршрута</label>
				<ul className={styles.coverList}>
					<li className={styles.coverItem}>
						<img className={styles.coverFoto} src={cover1} alt="обложка карточки маршрута"/>
						<p className={styles.coverText}>1. Тихая запруда</p>
					</li>
					<li className={styles.coverItem}>
						<img className={styles.coverFoto} src={cover2} alt="обложка карточки маршрута"/>
						<p className={styles.coverText}>2. Залив Бирюса</p>
					</li>
					<li className={styles.coverItem}>
						<img className={styles.coverFoto} src={cover3} alt="обложка карточки маршрута"/>
						<p className={styles.coverText}>3. Протока Татышева</p>
					</li>
					<li className={styles.coverItem}>
						<img className={styles.coverFoto} src={cover4} alt="обложка карточки маршрута"/>
						<p className={styles.coverText}>4. Река Енисей</p>
					</li>
					<li className={styles.coverItem}>
						<img className={styles.coverFoto} src={cover5} alt="обложка карточки маршрута"/>
						<p className={styles.coverText}>5. Красноярское море</p>
					</li>
					<li className={styles.coverItem}>
						<img className={styles.coverFoto} src={cover6} alt="обложка карточки маршрута"/>
						<p className={styles.coverText}>6. Красноярское море</p>
					</li>
				</ul>
				<select className={styles.select} name="coverChoice" id="coverChoice" value={form.coverChoice} onChange={handlerChange}>
					<option value={1}>Картинка 1</option>
					<option value={2}>Картинка 2</option>
					<option value={3}>Картинка 3</option>
					<option value={4}>Картинка 4</option>
					<option value={5}>Картинка 5</option>
					<option value={6}>Картинка 6</option>
				</select>
			</div>

			<Break size={20}  mobileSize={10}/>

			{error && <Message message={message} isError={true} /> || success && <Message message={success} isError={false} />}

			<div className={styles.button}>
				<Button text="Сохранить" loading={loading}/>			</div>
		</form>
  );
}
