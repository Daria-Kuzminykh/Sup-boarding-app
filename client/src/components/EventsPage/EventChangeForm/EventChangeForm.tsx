import React from 'react';
import styles from './eventchangeform.css';
import {ModalTitle} from "../../Modal/ModalTitle";
import {Break} from "../../Break";
import {Form} from "../EventForm/Form";
import {Modal} from "../../Modal";

export function EventChangeForm() {
  return (
		<Modal path="/user" children={
			<>
				<ModalTitle text="Событие" />
				<Break size={30} />
				<Form isNew={false}/>
			</>
		} />
  );
}
