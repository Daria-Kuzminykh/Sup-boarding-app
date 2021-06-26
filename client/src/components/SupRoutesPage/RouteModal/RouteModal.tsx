import React from 'react';
import styles from './routemodal.css';
import {Modal} from "../../Modal";
import {ModalTitle} from "../../Modal/ModalTitle";

export function RouteModal({path}: {path: string}) {
  return (
		<Modal path={path} children={
			<>
				<ModalTitle text="Маршрут" />
			</>
		} />
  );
}
