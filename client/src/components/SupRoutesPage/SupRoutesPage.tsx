import React, {useEffect} from 'react';
import styles from './suproutespage.css';
import {Navbar} from "../UserPage/Navbar";
import {Title} from "../Title";
import {useHttp} from "../../hooks/useHttp";
import {RouteCard} from "./RouteCard";
import {IRoutePreview, RootState} from '../../store/rootReducer';
import {useDispatch, useSelector} from "react-redux";
import {RoutesListAction} from "../../store/rootReducer";
import {RoutesList} from "./RoutesList";
import {krasnoyarsk, RegionMenu} from "./RegionMenu";
import {Spinner} from "../Spinner";
import {Break} from "../Break";
import {Footer} from "../HomePage/Footer";
import {UpButton} from "../HomePage/UpButton";

export function SupRoutesPage() {
	const {loading, error, clearError, request} = useHttp();
	const data = useSelector<RootState, Array<IRoutePreview>>(state => state.routesList);
	const tabLoading = useSelector<RootState>(state => state.regionTab.loading);
	const dispatch = useDispatch();

	async function loadingData() {
		clearError();
		try {
			const data = await request(`/routes/${krasnoyarsk}`);
			dispatch(RoutesListAction(data));
		} catch (e) {}
	}

	useEffect(() => {
		if (data.length) return;
		loadingData();
	}, []);

  return (
    <div className={styles.supRoutesPage}>
			<Navbar />
      <div className="container">
				<div className={styles.content}>
					<Title text="Маршруты" />
					<Break size={40} tabletSize={30} mobileSize={20}/>
					<p className={styles.text}>1. Выберите регион, который вас интересует.</p>
					<RegionMenu />
					<p className={styles.text}>2. Выберите и изучите маршрут.</p>

					{!data.length && !loading && !tabLoading && <p className={styles.notRouteText}>В данной категории нет ни одного маршрута.</p>}

					{(loading || tabLoading) && <Spinner />}

					{!loading && !tabLoading && <RoutesList children={
						data.map((route: IRoutePreview) => {
							return (
								<li className={styles.item} key={route.id}>
									<RouteCard
										name={route.name}
										place={route.place}
										level={route.level}
										time={route.time}
										owner={route.ownerFullName}
										img={route.cover || ''}
										id={route.id}
									/>
								</li>
							)
						})
					}/>}
				</div>
			</div>
			<UpButton />
			<div className={styles.footer}>
				<Footer />
			</div>
    </div>
  );
}
