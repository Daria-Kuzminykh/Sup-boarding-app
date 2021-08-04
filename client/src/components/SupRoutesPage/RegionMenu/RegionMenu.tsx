import React from 'react';
import styles from './regionmenu.css';
import {useDispatch, useSelector} from "react-redux";
import { IRegionTab, RootState } from "../../../store/rootState";
import {chooseRegionTab, RoutesListAction} from "../../../store/actions";
import classNames from "classnames";
import {useHttp} from "../../../hooks/useHttp";

export const irkutsk = 'Иркутская область';
export const krasnoyarsk = 'Красноярский край';
export const khakassia = 'Республика Хакасия';
export const otherRegion = 'Другой регион';

export function RegionMenu() {
	const {error, clearError, request} = useHttp();
	const dispatch = useDispatch();
	const regionTab = useSelector<RootState, IRegionTab>(state => state.regionTab);
	styles.button1 = styles.button2 = styles.button3 = styles.button4 = styles.button5 = styles.button6 = styles.button;

	switch (regionTab.name) {
		case irkutsk:
			styles.button1 = classNames(styles.button, styles.active);
			break;
		case krasnoyarsk:
			styles.button2 = classNames(styles.button, styles.active);
			break;
		case khakassia:
			styles.button3 = classNames(styles.button, styles.active);
			break;
		case otherRegion:
			styles.button4 = classNames(styles.button, styles.active);
			break;
	}

	async function handlerClick(region: string) {
		clearError();
		try {
			dispatch(chooseRegionTab({ name: region, loading: true }));
			const data = await request(`/routes/${region}`);
			dispatch(RoutesListAction(data));
			dispatch(chooseRegionTab({ name: region, loading: false }));
		} catch (e) {}
	}

	if (error) return <div className={styles.error}>Что-то пошло не так...Попробуйте зайти позже.</div>

  return (
		<ul className={styles.list}>
			<li className={styles.item}>
				<button className={styles.button1} onClick={() => {handlerClick(irkutsk)}}>{irkutsk}</button>
			</li>
			<li className={styles.item}>
				<button className={styles.button2} onClick={() => {handlerClick(krasnoyarsk)}}>{krasnoyarsk}</button>
			</li>
			<li className={styles.item}>
				<button className={styles.button3} onClick={() => {handlerClick(khakassia)}}>{khakassia}</button>
			</li>
			<li className={styles.item}>
				<button className={styles.button4} onClick={() => {handlerClick(otherRegion)}}>{otherRegion}</button>
			</li>
		</ul>
  );
}
