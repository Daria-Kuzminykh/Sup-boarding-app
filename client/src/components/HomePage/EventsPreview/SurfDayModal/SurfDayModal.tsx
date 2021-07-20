import React from 'react';
import styles from './surfdaymodal.css';
import {Modal} from "../../../Modal";
import {ModalTitle} from "../../../Modal/ModalTitle";
import {Break} from "../../../Break";

export function SurfDayModal() {
  return (
		<Modal path="/home" children={
			<>
				<ModalTitle text="День сёрфинга" />
				<Break size={30} />
				<div className={styles.content}>
					<h3 className={styles.smallTitle}>Описание события</h3>
					<p className={styles.text}>
						Международный день серфинга - праздник, посвященный серфингу как виду спорта и стилю жизни, а также сохранению ресурсов Мирового океана.Он проводится ежегодно в третью субботу июня. Международный день серфинга был учрежден в 2004 году журналом Surf Magazine и американской Организацией серферов (The Surfrider Foundation USA) — некоммерческой природоохранной организацией, задача которой — защита и сохранение океанов и пляжей. В этот день проводятся не только развлекательные мероприятия, но и природоохранные, такие как уборка пляжей, водоемов и т.д. <br/> День сёрфинга отмечают во многих странах - в Бразилии, Австралии, Новой Зеландии, Мексике, Португалии и др.
					</p>
				</div>
			</>
		} />
  );
}
