import React from 'react';
import styles from './upbutton.css';

export function UpButton() {
  return (
  	<a className={styles.button} href="#" onClick={() => {window.scrollTo({ top: 0, behavior: 'smooth' })}}></a>
  );
}
