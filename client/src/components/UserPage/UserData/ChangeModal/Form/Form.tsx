import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import styles from '../../../../RegisterModal/Form/form.css';
import {Message} from "../../../../Message";
import {EyeCrossIcon, EyeIcon} from "../../../../icons";
import {Button} from "../../../../Button";
import {useHttp} from "../../../../../hooks/useHttp";
import {Auth, User} from "../../../../../store/actions";
import {IUser, RootState} from "../../../../../store/rootState";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {useAuth} from "../../../../../hooks/useAuth";

export function Form() {
	const history = useHistory();
	const dispatch = useDispatch();
	const {logout} = useAuth();
	const {loading, error, clearError, request} = useHttp();
	const token = useSelector<RootState>(state => state.auth.token);
	const user = useSelector<RootState, IUser>(state => state.user);
	const loginName = useSelector<RootState, string>(state => state.auth.loginName);
	const [inputType, setInputType] = useState('password');
	const [message, setMessage] = useState('');
	const [success, setSuccess] = useState('');
	const [form, setForm] = useState({
		loginName: loginName,
		password: '',
		name: user.name,
		surname: user.surname,
	});

	async function handlerSubmit(event: FormEvent) {
		event.preventDefault();
		clearError();
		setMessage('');

		try {
			const data = await request('/user/change-data', 'PATCH', {...form}, {
				Authorization: `Bearer ${token}`
			});
			setSuccess(data.message);
			setTimeout(() => {
				logout();
				dispatch(Auth({ token: '', userId: '', isAuthenticated: false, loginName: '' }));
				dispatch(User({ name: '', surname: '', supRoutes: [], events: [], }));
				history.push('/home/auth/login');
			}, 700);
		} catch (e) {}
	}

	function handlerClick() {
		let type;
		if (inputType === 'password') {
			type = 'text'
		} else type = 'password';
		setInputType(type);
	}

	function handlerChange(event: ChangeEvent<HTMLInputElement>) {
		setForm({ ...form, [event.target.name]: event.target.value });
	}

	if (error === 'Нет авторизации') history.push('/no-register');

	useEffect(() => {
		setMessage(error);
	}, [error]);

  return (
		<form onSubmit={handlerSubmit}>
			<p className={styles.descr}>1. Измените логин (длина от 4 до 15 символов).</p>
			<div className={styles.inputBox}>
				<input
					className={styles.input}
					value={form.loginName}
					id="loginName"
					name="loginName"
					type="text"
					placeholder="Введите логин"
					onChange={handlerChange}
				/>
				<label className={styles.label} htmlFor="loginName">Введите логин</label>
			</div>

			<p className={styles.descr}>2. Измените пароль (длина от 6 символов) или введите старый.</p>
			<div className={styles.inputBox}>
				<input
					className={styles.input}
					value={form.password}
					id="password"
					name="password"
					type={inputType}
					placeholder="Введите пароль"
					onChange={handlerChange}
				/>
				<label className={styles.label} htmlFor="password">Введите пароль</label>
				<div className={styles.visibility} onClick={handlerClick}>
					{inputType === 'text' && (<EyeIcon />) || inputType === 'password' && (<EyeCrossIcon />)}
					<div className={styles.plug} />
				</div>
			</div>

			<p className={styles.descr}>3. Измените поля Имя и Фамилия.</p>
			<div className={styles.inputBox}>
				<input
					className={styles.input}
					value={form.name}
					id="name"
					name="name"
					type="text"
					placeholder="Имя"
					onChange={handlerChange}
				/>
				<label className={styles.label} htmlFor="name">Имя</label>
			</div>
			<div className={styles.inputBox}>
				<input
					className={styles.input}
					value={form.surname}
					id="surname"
					name="surname"
					type="text"
					placeholder="Фамилия"
					onChange={handlerChange}
				/>
				<label className={styles.label} htmlFor="surname">Фамилия</label>
			</div>

			<p className={styles.descr}>При изменении данных вам нужно будет зайти в систему заново.</p>

			{error && <Message message={message} isError={true} /> || success && <Message message={success} isError={false} />}
			<div className={styles.button}>
				<Button text="Сохранить" loading={loading}/>
			</div>
		</form>
  );
}
