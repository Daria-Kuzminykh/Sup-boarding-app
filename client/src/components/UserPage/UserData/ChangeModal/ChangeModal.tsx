import React from 'react';
import styles from './changemodal.css';
import {Modal} from "../../../Modal";
import {ModalTitle} from "../../../Modal/ModalTitle";
import {Form} from "./Form";
import {Break} from "../../../Break";

export function ChangeModal() {
  return (
		<Modal path="/user" children={
			<>
				<ModalTitle text="Изменить данные" />
				<Break size={30} />
				<Form />
			</>
		} />
  );
}
