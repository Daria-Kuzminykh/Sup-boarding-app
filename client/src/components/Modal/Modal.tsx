import React from 'react';
import styles from './modal.css';
import {Portal} from "../Portal";
import {useHistory} from "react-router-dom";
import {CloseIcon} from "../icons";
import {useEventClick} from "../../hooks/useEventClick";
import {useAnimation} from "../../hooks/useAnimation";

export function Modal({children, path}: {children: React.ReactNode, path: string}) {
	const history = useHistory();
	const ref = useEventClick(path)

	const position = window.innerWidth > 700 ? { top: `${window.scrollY + 100}px` } : { top: `${window.scrollY + 50}px` }

	function handlerClick() {
		useAnimation();

		setTimeout(() => {
			history.push(path);
		}, 200);
	}

  return (
		<Portal children={
			<>
				<div className={styles.overflow} id="overflowAnimate"></div>
				<div className={styles.modalPosition} style={position}>
					<div className={styles.modal} ref={ref} id="modalAnimate">
						<button className={styles.closeButton} onClick={handlerClick}>
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
