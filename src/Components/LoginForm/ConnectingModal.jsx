import React from "react";
import styles from "./connectingModal.module.css"; // Create a CSS file for modal styling

const ConnectingModal = ({ onClose }) => {
	return (
		<div className={styles.modalBackground}>
			<div className={styles.modalOverlay}>
				<div className={styles.modalContent}>
					<h2>Conectando a MercadoLibre...</h2>
					<p>
						Sin importar el resultado, podrás seguir usando la
						aplicación para vender.
					</p>
					<button onClick={onClose}>Cerrar</button>
				</div>
			</div>
		</div>
	);
};

export default ConnectingModal;
