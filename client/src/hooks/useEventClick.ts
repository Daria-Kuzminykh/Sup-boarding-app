import React, {useEffect, useRef} from "react";
import { useHistory } from 'react-router-dom';

export function useEventClick(path: string) {
	const ref = useRef<HTMLDivElement>(null);
	const history = useHistory();

	useEffect(() => {
		function handleClick(event: MouseEvent) {
			if (event.target instanceof Node && !ref.current?.contains(event.target)) {
				history.push(path);
			}
		}
		document.addEventListener('click', handleClick)

		return () => {
			document.removeEventListener('click', handleClick);
		}
	}, []);

	return ref;
}