import React from 'react';
import styles from './entrybutton.css';
import {UserIcon} from "../../../icons";

export function EntryButton({text}: {text: string}) {
  return (
		<div className={styles.entry}>
			<span>{text}</span>
			<UserIcon />
		</div>
  );
}
