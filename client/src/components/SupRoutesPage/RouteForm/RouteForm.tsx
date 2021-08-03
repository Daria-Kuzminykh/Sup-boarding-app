import React from 'react';
import {Modal} from "../../Modal";
import {ModalTitle} from "../../Modal/ModalTitle";
import {Form} from "./Form";
import {Break} from "../../Break";

export function RouteForm() {
  return (
		<Modal path="/user" children={
			<>
				<ModalTitle text="Маршрут" />
				<Break size={30} />
				<Form isNew={true}/>
			</>
		} />
  );
}
