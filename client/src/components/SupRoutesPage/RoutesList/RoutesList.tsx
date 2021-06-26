import React from 'react';
import styles from './routeslist.css';

export function RoutesList({children}: {children: React.ReactNode}) {
  return (
		<ul className={styles.list}>
			{children}
		</ul>
  );
}
