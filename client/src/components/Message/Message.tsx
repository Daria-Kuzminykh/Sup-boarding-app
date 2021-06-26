import React from 'react';
import styles from './message.css';
import classNames from "classnames";

export function Message({message, isError}: {message: string, isError: boolean}) {
	if (isError) {
		styles.class = classNames(styles.message, styles.error);
	} else {
		styles.class = classNames(styles.message, styles.success);
	}

  return (
		<p className={styles.class}>
			{message}
		</p>
  );
}
