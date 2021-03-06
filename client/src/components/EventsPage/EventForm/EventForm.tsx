import React from 'react';
import {ModalTitle} from "../../Modal/ModalTitle";
import {Modal} from "../../Modal";
import {Form} from "./Form";
import {Break} from "../../Break";

export function EventForm() {
  return (
		<Modal path="/me" children={
			<>
				<ModalTitle text="Событие" />
				<Break size={30} />
				<Form isNew={true}/>
			</>
		} />
  );
}
