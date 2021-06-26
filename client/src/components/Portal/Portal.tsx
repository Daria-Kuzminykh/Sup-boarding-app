import React from "react";
import ReactDOM from "react-dom";

export function Portal({ children }: { children: React.ReactNode }) {
	const node = document.querySelector('#modal_root');
	if (!node) return null;

	return ReactDOM.createPortal(children, node);
}