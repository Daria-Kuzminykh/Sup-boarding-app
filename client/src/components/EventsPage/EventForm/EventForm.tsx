import React from 'react';
import styles from './eventform.css';
import {ModalTitle} from "../../Modal/ModalTitle";
import {Modal} from "../../Modal";
import {Form} from "./Form";
import {Break} from "../../Break";

export function EventForm() {
  return (
		<Modal path="/user" children={
			<>
				<ModalTitle text="Событие" />
				<Break size={30} />
				<Form />
			</>
		} />
  );
}
