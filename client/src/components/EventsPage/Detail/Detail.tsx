import React, {useEffect, useState} from 'react';
import styles from '../../SupRoutesPage/Detail/detail.css';
import {useLocation} from "react-router-dom";
import {useHttp} from "../../../hooks/useHttp";
import {Spinner} from "../../Spinner";
import {Message} from "../../Message";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/rootReducer";
import {Break} from "../../Break";

interface IEventDetail {
	contacts: string,
	contactTel: string,
	place: string,
	name: string,
	descr: string,
	clicks: number,
}

export function Detail() {
	const token = useSelector<RootState>(state => state.auth.token);
	const location = useLocation();
	const {request, loading, error, clearError} = useHttp();
	const [data, setData] = useState<IEventDetail>({ contacts: '', contactTel: '', place: '', name: '',  descr: '',  clicks: 0 });

	async function loadingData() {
		clearError();
		const id = location.pathname.substr(-24, 24);
		const data = await request(`/detail-event/${id}`, 'GET', null, {
			Authorization: `Bearer ${token}`
		});
		setData(data);
	}
	useEffect(() => {
		loadingData();
	}, []);

	if (loading) return (<div className={styles.content}><Spinner /></div>);

	if (error) return (<Message message={error} isError={true} />);

	return (
		<div className={styles.content}>
			<p className={styles.name}>{data.name}</p>
			<p className={styles.place}>
				<span>Место: </span>
				{data.place}
			</p>
			<h3 className={styles.smallTitle}>Описание события:</h3>
			<p className={styles.text}>{data.descr || 'Описание отсутствует'}</p>

			<h3 className={styles.smallTitle}>Контактные данные:</h3>
			<p className={styles.text}>
				<a className={styles.link} href={data.contacts}>{data.contacts}</a>
			</p>

			{data.contactTel && (
				<p className={styles.tel}>
					<span>Контактный телефон: </span>
					<a className={styles.link} href={`tel:${data.contactTel}`}>{data.contactTel}</a>
				</p>
			)}

			<Break size={0} mobileSize={20} />

			<p className={styles.clicks}>
				{data.clicks}
				<span> просмотров</span>
			</p>
		</div>
  );
}
