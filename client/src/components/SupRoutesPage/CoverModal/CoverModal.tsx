import React from 'react';
import styles from './covermodal.css';
import {Modal} from "../../Modal";
import {ModalTitle} from "../../Modal/ModalTitle";
import {Break} from "../../Break";
import {CoverForm} from "./CoverForm";

export function CoverModal() {
  return (
		<Modal path="/user" children={
			<>
				<ModalTitle text="Обложка маршрута" />
				<Break size={30} mobileSize={20} />
				<CoverForm />
			</>
		} />
  );
}
