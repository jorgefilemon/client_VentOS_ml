import Axios from "axios";
import styles from "./corteCaja.module.css";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Contexts/AuthContext";

const CorteCaja = () => {
	const { auth } = useContext(AuthContext);

	const [openCorte, setOpenCorte] = useState(false);
	const [mensaje, setMensaje] = useState(false);
	const [corte, setCorte] = useState({
		efectivo: "",
		tarjeta: "",
		total: "",
		cambioCliente: "",
	});
	const [, setExpenses] = useState([]);

	useEffect(() => {
		const revisarCorte = () => {
			Axios.get("https:localhost:3001/revisarCorte").then((response) => {
				console.log(response.data);
				setCorte((prevCorte) => ({
					...prevCorte,
					efectivo: response.data.cash,
					tarjeta: response.data.card,
					total: response.data.total,
					cambioCliente: response.data.cambioCliente,
				}));

				if (response.data.expense) {
					setExpenses((prevExpenses) => [
						...prevExpenses,
						response.data.expense,
					]);
				}
			});

			setOpenCorte(true);
		};

		revisarCorte();
	}, []); // Empty dependency array ensures the effect runs only once on mount

	const hacerCorte = () => {
		Axios.post("https:localhost:3001/corte", { usu_id: auth.id }).then(
			(res) => {
				console.log(res.data);
			}
		);
		setOpenCorte(false);
		setMensaje(true);
	};

	return (
		<div className={styles.corteCajaContainer}>
			{openCorte ? (
				<div className={styles.corteCajaTableContainer}>
					<table>
						<tbody>
							<tr>
								<td>Efectivo</td>
								<td>
									{new Intl.NumberFormat("en-US", {
										style: "currency",
										currency: "USD",
									}).format(corte.efectivo)}
								</td>
							</tr>
							<tr>
								<td>Tarjeta</td>
								<td>
									{new Intl.NumberFormat("en-US", {
										style: "currency",
										currency: "USD",
									}).format(corte.tarjeta)}
								</td>
							</tr>
							<tr>
								<td>Devolucion efectivo</td>
								<td>
									{new Intl.NumberFormat("en-US", {
										style: "currency",
										currency: "USD",
									}).format(corte.cambioCliente)}
								</td>
							</tr>
							<tr>
								<td>Total</td>
								<td>
									{new Intl.NumberFormat("en-US", {
										style: "currency",
										currency: "USD",
									}).format(corte.total)}
								</td>
							</tr>
						</tbody>
					</table>
					<div className={styles.buttonContainer}>
						<button
							className={styles.corteCajaBtn}
							onClick={hacerCorte}
						>
							realizar corte
						</button>
					</div>
				</div>
			) : null}
			{mensaje && (
				<div className={styles.corteExitoso}>
					Corte realizado con exito{" "}
				</div>
			)}
		</div>
	);
};

export default CorteCaja;
