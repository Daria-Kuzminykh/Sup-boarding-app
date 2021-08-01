import React from 'react';
import styles from './eventmodal.css';
import {Modal} from "../../Modal";
import {ModalTitle} from "../../Modal/ModalTitle";
import {Break} from "../../Break";
import {Detail} from "../Detail";

export function EventModal({path}: {path: string}) {
  return (
		<Modal path={path} children={
			<>
				<ModalTitle text="Событие" />
				<Break size={30} mobileSize={20}/>
				<div className={styles.container}>
					<Detail />
				</div>
			</>
		} />
  );
}
