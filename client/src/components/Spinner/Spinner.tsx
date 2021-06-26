import React from 'react';
import styles from './spinner.css';
import {SpinnerIcon} from "../icons";

export function Spinner() {
  return (
		<div className={styles.spinner}>
			<SpinnerIcon />
		</div>
  );
}
