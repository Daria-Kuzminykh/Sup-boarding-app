import React from 'react';
import styles from './deletebutton.css';
import {IActionButton} from "../ActionBlock";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {DeleteElementAction} from "../../../store/actions";

export function DeleteButton({ isRoute, id }: IActionButton) {
	const history = useHistory();
	const dispatch = useDispatch();

	function handlerClick() {
		dispatch(DeleteElementAction({ isRoute: isRoute, id: id }));
		history.push('/me/delete');
	}


  return (
			<button className={styles.button} onClick={handlerClick}>Удалить</button>
  );
}
