import React from 'react';
import styles from '../SurfDayModal/surfdaymodal.css';
import {ModalTitle} from "../../../Modal/ModalTitle";
import {Break} from "../../../Break";
import {Modal} from "../../../Modal";

export function SupDayModal() {
  return (
		<Modal path="/home" children={
			<>
				<ModalTitle text="День сап-бординга" />
				<Break size={30} />
				<div className={styles.content}>
					<h3 className={styles.smallTitle}>Описание события</h3>
					<p className={styles.text}>
						Всероссийский День сап-бординга отмечают сравнительно недавно. Однако участников с каждым годом все больше и больше. В этот день устраивают различные развлекательные мероприятия возле водоемов, массовые сплавы по рекам. Также в некоторых местах проводится бесплатное обучение сап-бордингу для всех желающих. Такие праздники помогают популяризировать SUP, распространить информацию и предоставить возможность попробовать поплавать на доске даже тем, кто не знаком с сап-бордингом.
					</p>
				</div>
			</>
		} />
  );
}
