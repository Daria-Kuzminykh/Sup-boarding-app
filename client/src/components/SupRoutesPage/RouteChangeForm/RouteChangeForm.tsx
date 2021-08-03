import React from 'react';
import {ModalTitle} from "../../Modal/ModalTitle";
import {Break} from "../../Break";
import {Form} from "../RouteForm/Form";
import {Modal} from "../../Modal";

export function RouteChangeForm() {
  return (
		<Modal path="/user" children={
			<>
				<ModalTitle text="Маршрут" />
				<Break size={30} />
				<Form isNew={false}/>
			</>
		} />
  );
}
