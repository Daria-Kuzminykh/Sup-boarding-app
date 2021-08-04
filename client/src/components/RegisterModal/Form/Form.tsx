import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import styles from './form.css';
import {EyeCrossIcon, EyeIcon} from "../../icons";
import {Button} from "../../Button";
import {useHttp} from "../../../hooks/useHttp";
import {Message} from "../../Message";
import {useHistory} from "react-router-dom";
import {useAuth} from "../../../hooks/useAuth";
import {useDispatch} from "react-redux";
import {Auth} from "../../../store/actions";

export function Form({isLogin}: {isLogin: boolean}) {
	const history = useHistory();
	const {request, loading, error, clearError} = useHttp();
	const {login} = useAuth();
	const dispatch = useDispatch();
	const [inputType, setInputType] = useState('password');
	const [message, setMessage] = useState('');
	const [success, setSuccess] = useState('');
	const [form, setForm] = useState({
		loginName: '',
		password: '',
		name: '',
		surname: '',
	});

	let textButton;
	if (isLogin) {
		textButton = 'Войти'
	} else textButton = 'Сохранить';

	useEffect(() => {
		setMessage(error);
	}, [error]);

	function handlerChange(event: ChangeEvent<HTMLInputElement>) {
		setForm({ ...form, [event.target.name]: event.target.value });
	}

	function handlerClick() {
		let type;
		if (inputType === 'password') {
			type = 'text'
		} else type = 'password';
		setInputType(type);
	}

	async function handlerSubmit(event: FormEvent) {
		event.preventDefault();
		clearError();
		setMessage('');

		try {
				if (!isLogin) {
					const data = await request('/auth/register', 'POST', {...form});
					setSuccess(data.message);
					setTimeout(() => {
						history.push('/home/auth/login');
					}, 700);
				} else {
					const data = await request('/auth/login', 'POST', {...form});
					login(data.token, data.userId, data.loginName);
					dispatch(Auth({ token: data.token, userId: data.userId, isAuthenticated: true, loginName: data.loginName }));
					history.push('/user');
				}
		} catch (e) {}
	}

  return (
		<form className={styles.form} onSubmit={handlerSubmit} autoComplete={`${isLogin}`}>
			{!isLogin && <p className={styles.descr}>1. Придумайте логин длиной от 4 до 15 символов.</p>}
			<div className={styles.inputBox}>
				<input
					className={styles.input}
					value={form.loginName}
					id="loginName"
					name="loginName"
					type="text"
					placeholder="Введите логин"
					onChange={handlerChange}
					required={true}
					minLength={4}
					maxLength={15}
				/>
				<label className={styles.label} htmlFor="loginName">Введите логин</label>
			</div>
			{!isLogin && <p className={styles.descr}>2. Придумайте пароль длиной от 6 символов.</p>}
			<div className={styles.inputBox}>
				<input
					className={styles.input}
					value={form.password}
					id="password"
					name="password"
					type={inputType}
					placeholder="Введите пароль"
					onChange={handlerChange}
					required={true}
					minLength={6}
				/>
				<label className={styles.label} htmlFor="password">Введите пароль</label>
				<div className={styles.visibility} onClick={handlerClick}>
					{inputType === 'text' && (<EyeIcon />) || inputType === 'password' && (<EyeCrossIcon />)}
					<div className={styles.plug} />
				</div>
			</div>
			{!isLogin && (
				<>
					<p className={styles.descr}>3. Заполните поля Имя и Фамилия.</p>
					<div className={styles.inputBox}>
						<input
							className={styles.input}
							value={form.name}
							id="name"
							name="name"
							type="text"
							placeholder="Имя"
							onChange={handlerChange}
							required={true}
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
							required={true}
						/>
						<label className={styles.label} htmlFor="surname">Фамилия</label>
					</div>
				</>
			)}
			{error && <Message message={message} isError={true} /> || success && <Message message={success} isError={false} />}
			<div className={styles.button}>
				<Button text={textButton} loading={loading}/>
			</div>
		</form>
  );
}
