import styles from "../components/Modal/modal.css";

export function useAnimation() {
	const modal = document.getElementById('modalAnimate');
	const overflow = document.getElementById('overflowAnimate');
	if (modal && overflow) {
		modal.classList.add(styles.animateReverse);
		overflow.classList.add(styles.animateReverseOverflow);
	}
}