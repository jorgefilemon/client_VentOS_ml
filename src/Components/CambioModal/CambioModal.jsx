import styles from "./cambioModal.module.css";
import { useContext } from "react";
// import { FaMoneyBillWave } from 'react-icons/fa'
import { CambioContext } from "../../Contexts/CambioContext";
import { numeroALetras } from "../../utils/numeroALetras";

const CambioModal = () => {
	const { cambioCliente } = useContext(CambioContext);

	return (
		<div className={styles.cambioModalBackground}>
			<div className={styles.cambioContainer}>
				<div className={styles.cancelarContainer}>
					<button
						type="submit"
						onClick={() => window.location.reload(false)}
					>
						X
					</button>
				</div>
				<div className={styles.cambioParaCliente}>
					<p>Cambio Para Cliente</p>
				</div>
				{/* <h2 className={styles.moneyLogo}><FaMoneyBillWave /></h2> */}
				<div className={styles.totalCambio}>
					<p>
						{new Intl.NumberFormat("en-US", {
							style: "currency",
							currency: "USD",
						}).format(cambioCliente)}
					</p>
				</div>
				<h2 className={styles.cambioEnLetra}>
					{numeroALetras(cambioCliente)}
				</h2>
			</div>
		</div>
	);
};

export default CambioModal;
