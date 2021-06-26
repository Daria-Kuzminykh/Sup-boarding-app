import React from 'react';
import styles from './actionblock.css';
import {ChangeButton} from "../ChangeButton";
import {DeleteButton} from "../DeleteButton";

export interface IActionButton {
	isRoute: boolean;
	id: string;
}

export function ActionBlock({ isRoute, id }: IActionButton) {
	if (isRoute) {
		styles.class = styles.routeBlock
	} else {
		styles.class = styles.eventBlock
	}
  return (
		<div className={styles.class}>
			<ChangeButton isRoute={isRoute} id={id} />
			<DeleteButton isRoute={isRoute} id={id} />
		</div>
  );
}
