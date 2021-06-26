import React from 'react';
import styles from './title.css';

export function Title({text, id}: {text: string, id?: string}) {
  return (
		<h2 id={id} className={styles.title}>{text}</h2>
  );
}
