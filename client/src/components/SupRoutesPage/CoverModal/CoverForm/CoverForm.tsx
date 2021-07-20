import React, {ChangeEvent, FormEvent, useState} from 'react';
import styles from './coverform.css';
import {Button} from "../../../Button";
import {RootState, User} from "../../../../store/rootReducer";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {useHttp} from "../../../../hooks/useHttp";

export function CoverForm() {
	const dispatch = useDispatch();
	const history = useHistory();
	// const {request, loading, error, clearError} = useHttp();
	// const token = useSelector<RootState>(state => state.auth.token);
	// const [file, setFile] = useState(null);

	// function handlerChange(event: ChangeEvent<HTMLInputElement>) {
	// 	setFile(event.target.files[0]);
	// }
	//
	function handlerSubmit(event: FormEvent) {
		// event.preventDefault();
		// const data = request('/upload', 'POST', {file}, {
		// 	Authorization: `Bearer ${token}`
		// });
		setTimeout(() => {
			dispatch(User({ name: '', surname: '', supRoutes: [], events: [] }));
			history.push('/user');
		}, 700);
	}
  return (
		<form className={styles.form} action="http://localhost:5000/upload" method="POST" encType="multipart/form-data" onSubmit={handlerSubmit}>
			<p className={styles.text}>Хотите добавить для карточки маршрута собственную фото-обложку? Если да, то загрузите картинку. Если нет, то для вашего маршрута будет использована стандартная обложка. Вы сможете потом изменить или добавить картинку.</p>
			<input className={styles.input} type="file" name="cover" id="cover" accept="image/*"/>
			<div className={styles.button}>
				<Button text="Сохранить" />
			</div>
		</form>
  );
}
