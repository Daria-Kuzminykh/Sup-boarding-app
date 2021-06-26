import React from 'react';
import styles from './break.css';
import classNames from "classnames";

type TBreakSize = 10 | 20 | 30 | 40 | 50 | 60

interface IBreak {
	size: TBreakSize;
	mobileSize?: TBreakSize;
	tabletSize?: TBreakSize;
}

export function Break({size, mobileSize, tabletSize}: IBreak) {
	const classes = classNames(
		styles[`s${size}`],
		{ [styles[`m${mobileSize}`]]: mobileSize },
		{ [styles[`t${tabletSize}`]]: tabletSize },
	)

  return (
		<div className={classes} />
  );
}
