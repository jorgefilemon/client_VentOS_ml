import styles from "./modal.module.css";
import React, { lazy, Suspense } from "react";

function Modal({ modalName, closeModal }) {
	const DynamicComponent = lazy(() => import(`../Expenses/${modalName}`));

	return (
		<div className={styles.modalBackground}>
			<div className={styles.modalContainer}>
				<Suspense fallback={<></>}>
					<DynamicComponent
						closeModal={closeModal}
						modalName={modalName}
					/>
				</Suspense>
			</div>
		</div>
	);
}

export default Modal;
