import { AuthContext } from "../../Contexts/AuthContext";
import { useContext } from "react";
import styles from "./connectingModal.module.css"; // optional

function CorteExitoso() {
	const { setAuth } = useContext(AuthContext);

	const handleClose = () => {
		setAuth((prev) => ({ ...prev, corteExitoso: false }));
	};

	return (
		<div className={styles?.modalOverlay}>
			<div className={styles?.modalBackground}>
				<h1>Corte realizado con éxito</h1>
				<button type="button" onClick={handleClose}>
					Cerrar
				</button>
			</div>
		</div>
	);
}

export default CorteExitoso;
