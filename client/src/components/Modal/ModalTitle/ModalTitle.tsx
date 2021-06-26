import React from 'react';
import styles from './modaltitle.css';

export function ModalTitle({text}: {text: string}) {
  return (
		<h3 className={styles.title}>{text}</h3>
  );
}
