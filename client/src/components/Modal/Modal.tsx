import React from 'react';
import styles from './modal.css';
import {Portal} from "../Portal";
import {useHistory} from "react-router-dom";
import {CloseIcon} from "../icons";
import {useEventClick} from "../../hooks/useEventClick";

export function Modal({children, path}: {children: React.ReactNode, path: string}) {
	const history = useHistory();
	const ref = useEventClick(path)

	const position = {
		top: `${window.scrollY + 100}px`,
	}

  return (
		<Portal children={
			<>
				<div className={styles.overflow}></div>
				<div className={styles.modalPosition} style={position}>
					<div className={styles.modal} ref={ref}>
						<button className={styles.closeButton} onClick={() => history.push(path)}>
							<CloseIcon />
						</button>
						{children}
					</div>
					<div className={styles.paddingBottom}/>
				</div>
			</>
		} />
  );
}
