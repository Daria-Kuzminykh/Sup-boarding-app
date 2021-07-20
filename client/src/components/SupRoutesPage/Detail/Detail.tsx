import React, {useEffect, useState} from 'react';
import styles from './detail.css';
import {useLocation} from "react-router-dom";
import {useHttp} from "../../../hooks/useHttp";
import {Spinner} from "../../Spinner";
import {IRoute} from "../../../store/rootReducer";
import {Message} from "../../Message";
import {Break} from "../../Break";

export function Detail() {
	const location = useLocation();
	const {request, loading, error, clearError} = useHttp();
	const [data, setData] = useState<IRoute>({region: '', place: '', name: '', level: '', time: '', fotoLink: '', descr: '', plus: '', minus: '', clicks: 0, date: '' });

	async function loadingData() {
		clearError();
		const id = location.pathname.substr(-24, 24);
		console.log(id);
		const data = await request(`/detail-route/${id}`);
		setData(data);
	}
	useEffect(() => {
		loadingData();
	}, []);

	if (loading) return (<Spinner />);

	if (error) return (<Message message={error} isError={true} />);

  return (
		<div className={styles.content}>
			<p className={styles.name}>{data.name}</p>
			<p className={styles.region}>
				<span>Регион: </span>
				{data.region}
			</p>
			<p className={styles.place}>
				<span>Место: </span>
				{data.place}
			</p>

			<h3 className={styles.smallTitle}>Описание маршрута:</h3>
			<p className={styles.text}>{data.descr || 'Описание отсутствует'}</p>

			<h3 className={styles.smallTitle}>Положительные стороны маршрута:</h3>
			<p className={styles.text}>{data.plus || 'Не указаны'}</p>

			<h3 className={styles.smallTitle}>Отрицательные стороны маршрута:</h3>
			<p className={styles.text}>{data.minus || 'Не указаны'}</p>

			{data.fotoLink && <p className={styles.foto}><a className={styles.link} target="_blank" href={data.fotoLink}>Посмотреть фотографии</a></p>}

			<p className={styles.date}>
				<span>Дата создания записи: </span>
				{data.date}
			</p>

			<Break size={0} mobileSize={20} />

			<p className={styles.clicks}>
				{data.clicks}
				<span> просмотров</span>
			</p>
		</div>
  );
}
