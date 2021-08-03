import React from 'react';
import {Modal} from "../Modal";
import {ModalTitle} from "../Modal/ModalTitle";
import {Form} from "./Form";
import {Break} from "../Break";

export function RegisterModal() {
  return (
  	<Modal path="/" children={
  		<>
				<ModalTitle text="Регистрация" />
				<Break size={30} mobileSize={20}/>
				<Form isLogin={false} />
			</>
		} />
  );
}
