import React from 'react';
import styles from './routespreview.css';
import {Title} from "../../Title";
import {Button} from "../../Button";
import {Link, useHistory} from 'react-router-dom';
import {RoutesList} from "../../SupRoutesPage/RoutesList";
import {RouteCard} from "../../SupRoutesPage/RouteCard";

export function RoutesPreview() {
	const history = useHistory();

	function handlerClick() {
		history.push('/routes');
		window.scrollTo(0, 0);
	}

  return (
		<section className={styles.routes}>
			<div className="container">
				<Title text="Маршруты" id="routes" />
				<p className={styles.text}>Это только маленькая часть всех маршрутов из нашей коллекции.</p>
				<RoutesList children={
					<>
						<RouteCard
							name="Енисейские красоты"
							place="река Енисей"
							level={3}
							time={5}
							owner="Дарья Кузьминых"
							img="../../../../static/image/route-1.webp"
							id="60d96b627dc4c3674082be86"
						/>
						<RouteCard
							name="Царские ворота"
							place="Красноярское море"
							level={4}
							time={10}
							owner="Дарья Кузьминых"
							img="../../../../static/image/route-2.webp"
							id="60d96b867dc4c3674082be8c"
						/>
						<RouteCard
							name="Вдоль берегов острова"
							place="протока Татышева"
							level={2}
							time={2}
							owner="Дарья Кузьминых"
							img="../../../../static/image/route-3.webp"
							id="60d96ba87dc4c3674082be92"
						/>
					</>
				}/>
				<div className={styles.button} onClick={handlerClick}>
					<Button text="посмотреть все маршруты" />
				</div>
			</div>
		</section>
  );
}
