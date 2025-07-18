import Axios from "axios";
import styles from "./corteCaja.module.css";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import CashClosingModal from "./CashClosingModal/CashClosingModal";

import CorteCajaPanel from "./CorteCajaPanel";

const CorteCaja = () => {
	const { auth } = useContext(AuthContext);
	const [openCorte, setOpenCorte] = useState(false);
	const [mensaje, setMensaje] = useState(false);
	const [expense, setExpenses] = useState([]);
	const [expenseTotal, setExpenseTotal] = useState(0);
	const [corte, setCorte] = useState({
		efectivo: "",
		tarjeta: "",
		cambioCliente: "",
		total: "",
	});
	const [cashClosingModal, setCashClosingModal] = useState(false);

	const netCash = corte.efectivo - corte.cambioCliente - expenseTotal;

	const currencyFormatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	});

	const revisarCorte = async () => {
		try {
			const response = await Axios.get(
				"https://localhost:3001/revisarCorte"
			);
			console.log(response.data);

			setCorte((prevCorte) => ({
				...prevCorte,
				efectivo: response.data.cash,
				tarjeta: response.data.card,
				total: response.data.total,
				cambioCliente: response.data.cambioCliente,
			}));

			if (response.data.expense) {
				setExpenses(response.data.expense);
			}

			if (response.data.expenseTotal) {
				setExpenseTotal(response.data.expenseTotal);
			}

			setOpenCorte(true);
		} catch (error) {
			console.error("Error revisando corte:", error);
		}
	};

	useEffect(() => {
		revisarCorte();
	}, []);

	// const hacerCorte = () => {
	// 	Axios.post("https://localhost:3001/corte", { usu_id: auth.id }).then(
	// 		(res) => {
	// 			console.log(res.data);
	// 		}
	// 	);
	// 	setOpenCorte(false);
	// 	setMensaje(true);
	// };
	const hacerCorte = () => {
		setCashClosingModal(true);
	};

	return (
		<div className={styles.corteCajaContainer}>
			<CorteCajaPanel
				corte={corte}
				expense={expense}
				expenseTotal={expenseTotal}
			/>
			<div className={styles.netCashCtn}>
				<p>
					Efectivo en Caja{" "}
					{corte.efectivo && currencyFormatter.format(netCash)}
				</p>
			</div>
			<div className={styles.buttonContainer}>
				<button className={styles.corteCajaBtn} onClick={hacerCorte}>
					Hacer Corte
				</button>
			</div>
			{/* {mensaje && (
				<div className={styles.corteExitoso}>
					Corte realizado con exito
				</div>
			)} */}
			{cashClosingModal && (
				<CashClosingModal
					netCash={netCash}
					setCashClosingModal={setCashClosingModal}
				/>
			)}
		</div>
	);
};

export default CorteCaja;
