import React from 'react';
import styles from './menu.css';
import {useDispatch, useSelector} from "react-redux";
import {chooseTab, RootState} from "../../../../store/rootReducer";
import classNames from "classnames";

export function Menu() {
	const dispatch = useDispatch();
	const tab = useSelector<RootState>(state => state.tab);
	styles.button1 = styles.button2 = styles.button3 = styles.button4 = styles.button5 = styles.button6 = styles.button;

	switch (tab) {
		case 1:
			styles.button1 = classNames(styles.button, styles.active)
			break
		case 2:
			styles.button2 = classNames(styles.button, styles.active)
			break
		case 3:
			styles.button3 = classNames(styles.button, styles.active)
			break
		case 4:
			styles.button4 = classNames(styles.button, styles.active)
			break
		case 5:
			styles.button5 = classNames(styles.button, styles.active)
			break
		case 6:
			styles.button6 = classNames(styles.button, styles.active)
			break
	}

	const handleClick = (tab: number) => {
		dispatch(chooseTab(tab));
	}

  return (
		<ul className={styles.list}>
			<li className={styles.item} onClick={() => handleClick(1)}>
				<button className={styles.button1}>Что такое sup?</button>
			</li>
			<li className={styles.item} onClick={() => handleClick(2)}>
				<button className={styles.button2}>Экипировка</button>
			</li>
			<li className={styles.item} onClick={() => handleClick(3)}>
				<button className={styles.button3}>Разновидности</button>
			</li>
			<li className={styles.item} onClick={() => handleClick(4)}>
				<button className={styles.button4}>Спорт</button>
			</li>
			<li className={styles.item} onClick={() => handleClick(5)}>
				<button className={styles.button5}>Техника</button>
			</li>
			<li className={styles.item} onClick={() => handleClick(6)}>
				<button className={styles.button6}>Как выбрать доску?</button>
			</li>
		</ul>
  );
}
