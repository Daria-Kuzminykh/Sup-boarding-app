import React, {FormEvent, useState} from 'react';
import styles from './registermodal.css';
import {Modal} from "../Modal";
import {ModalTitle} from "../Modal/ModalTitle";
import {Form} from "./Form";
import {Break} from "../Break";

export function RegisterModal() {
  return (
  	<Modal path="/" children={
  		<>
				<ModalTitle text="Регистрация" />
				<Break size={30} />
				<Form isLogin={false} />
			</>
		} />
  );
}
