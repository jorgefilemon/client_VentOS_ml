import styles from "./cashFloat.module.css";
import ModalCashFloat from "./ModalCashFloat";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Contexts/AuthContext";

const CashFloat = () => {
	const { auth } = useContext(AuthContext);

	const [modal, setModal] = useState(false);
	return (
		<div className={styles.cashFloatContainer}>
			<div className={styles.cashFloat_Agregar_Container}>
				<div className={styles.cashFloat_Agregar_button_Container}>
					<button onClick={() => setModal(true)}>
						Agregar Efectivo
					</button>
				</div>
				<div className={styles.cashFloat_Agregar_table_Container}></div>
			</div>
			<div className={styles.cashFloat_Guardar_Container}>
				<div className={styles.cashFloat_Guardar_button_Container}>
					<button>Guardar</button>
				</div>
				<div className={styles.cashFloat_Agregar_table_Container}></div>
			</div>
			{modal && <ModalCashFloat setModal={setModal} />}
		</div>
	);
};

export default CashFloat;
