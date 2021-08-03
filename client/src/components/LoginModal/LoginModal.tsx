import React from 'react';
import styles from './loginmodal.css';
import {ModalTitle} from "../Modal/ModalTitle";
import {Modal} from "../Modal";
import {Form} from "../RegisterModal/Form";
import {useHistory} from "react-router-dom";
import {Break} from "../Break";

export function LoginModal() {
	const history = useHistory();

	function handlerClick(event: React.MouseEvent) {
		event.stopPropagation();
		history.push('/home/auth/register');
	}

  return (
		<Modal path="/" children={
			<>
				<ModalTitle text="Личный кабинет" />
				<Break size={30} />
				<Form isLogin={true} />
				<Break size={30} />
				<p className={styles.text}>
					Вы еще не зарегистрировались?
				</p>
				<div className={styles.buttonBox}>
					<button className={styles.button} onClick={handlerClick}>Зарегистрироваться</button>
				</div>
			</>
		}/>
  );
}
