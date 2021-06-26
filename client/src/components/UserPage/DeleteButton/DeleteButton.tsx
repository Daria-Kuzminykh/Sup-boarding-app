import React, {useRef, useState} from 'react';
import styles from './deletebutton.css';
import {IActionButton} from "../ActionBlock";
import {useHttp} from "../../../hooks/useHttp";
import {useDispatch, useSelector} from "react-redux";
import {DeleteElementAction, RootState} from "../../../store/rootReducer";
import {EventModal} from "../../EventsPage/EventModal";
import {Route, useHistory} from "react-router-dom";
import {DeleteModal} from "../DeleteModal";
import {CloseIcon} from "../../icons";
import {Portal} from "../../Portal";
import {Button} from "../../Button";

export function DeleteButton({ isRoute, id }: IActionButton) {
	const history = useHistory();
	const dispatch = useDispatch();

	function handlerClick() {
		dispatch(DeleteElementAction({ isRoute: isRoute, id: id }));
		history.push('/user/delete');
	}


  return (
			<button className={styles.button} onClick={handlerClick}>Удалить</button>
  );
}
