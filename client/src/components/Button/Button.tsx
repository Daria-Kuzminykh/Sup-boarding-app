import React from 'react';
import styles from './button.css';

export function Button({ text, loading }: { text: string, loading?: boolean }) {
  return (
		<button className={styles.button} disabled={loading}>
			{text}
		</button>
  );
}
