import React from 'react';
import styles from './routemodal.css';
import {Modal} from "../../Modal";
import {ModalTitle} from "../../Modal/ModalTitle";
import {Detail} from "../Detail";
import {Break} from "../../Break";

export function RouteModal({path}: {path: string}) {
  return (
		<Modal path={path} children={
			<>
				<ModalTitle text="Маршрут" />
				<Break size={30} mobileSize={20}/>
				<div className={styles.container}>
					<Detail />
				</div>
			</>
		} />
  );
}
