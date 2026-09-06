import styles from "./cambioModal.module.css";
import { useContext } from "react";
import { CambioContext } from "../../Contexts/CambioContext";
import { numeroALetras } from "../../utils/numeroALetras";

const CambioModal = () => {
	const { cambioCliente, mercadoLibreRes } = useContext(CambioContext);
	const mercadoLibreMessages = Array.isArray(mercadoLibreRes)
		? mercadoLibreRes.map((result) => result?.message).filter(Boolean)
		: [mercadoLibreRes?.message].filter(Boolean);
	const showCambio = cambioCliente > 0;
	const showMercadoMessage = mercadoLibreMessages.length > 0;

	return (
		<div className={styles.cambioModalBackground}>
			<div className={styles.modalStack}>
				<div className={styles.cancelarContainer}>
					<button
						type="submit"
						onClick={() => window.location.reload(false)}
					>
						X
					</button>
				</div>

				{showCambio && (
					<div className={styles.cambioContainer}>
						<div className={styles.cambioParaCliente}>
							<p>Cambio Para Cliente</p>
						</div>

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
				)}

				{showMercadoMessage && (
					<div className={styles.mercadoContainer}>
						<p className={styles.mercadoLabel}>Mercado Libre</p>
						<ul className={styles.mercadoMessages}>
							{mercadoLibreMessages.map((message, index) => (
								<li
									className={styles.mercadoMessage}
									key={`${message}-${index}`}
								>
									{message}
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
		</div>
	);
};

export default CambioModal;
