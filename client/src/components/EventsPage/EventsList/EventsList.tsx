import React from 'react';
import styles from './eventslist.css';

export function EventsList({children}: {children: React.ReactNode}) {
  return (
		<div className={styles.list}>
			{children}
		</div>
  );
}
