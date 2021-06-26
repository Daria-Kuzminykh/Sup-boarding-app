import React from 'react';
import styles from './eventmodal.css';
import {Modal} from "../../Modal";
import {ModalTitle} from "../../Modal/ModalTitle";

export function EventModal({path}: {path: string}) {
  return (
		<Modal path={path} children={
			<>
				<ModalTitle text="Событие" />
			</>
		} />
  );
}
