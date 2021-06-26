import React from 'react';
import styles from './routespreview.css';
import {Title} from "../../Title";
import {Button} from "../../Button";
import {Link} from 'react-router-dom';
import {RoutesList} from "../../SupRoutesPage/RoutesList";
import {RouteCard} from "../../SupRoutesPage/RouteCard";

export function RoutesPreview() {
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
							id="123qwe"
						/>
						<RouteCard
							name="Царские ворота"
							place="Красноярское море"
							level={4}
							time={10}
							owner="Дарья Кузьминых"
							img="../../../../static/image/route-2.webp"
							id="1234qwer"
						/>
						<RouteCard
							name="Вдоль берегов острова"
							place="протока Татышева"
							level={2}
							time={2}
							owner="Дарья Кузьминых"
							img="../../../../static/image/route-3.webp"
							id="12345qwert"
						/>
					</>
				}/>
				<div className={styles.button}>
					<Link to="/routes" tabIndex={-1}>
						<Button text="посмотреть все маршруты" />
					</Link>
				</div>
			</div>
		</section>
  );
}
