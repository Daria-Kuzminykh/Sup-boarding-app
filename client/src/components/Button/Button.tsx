import React from 'react';
import styles from './button.css';
import {SpinnerIcon} from "../icons";

export function Button({ text, loading }: { text: string, loading?: boolean }) {
  return (
		<button className={styles.button} disabled={loading}>
			{loading &&
			<div className={styles.loading}>
				<SpinnerIcon fill="#ffffff" width="25" height="25"/>
			</div>}
			{text}
		</button>
  );
}
