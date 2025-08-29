import styles from "./cashFloat.module.css";
import ModalAddCash from "./ModalAddCash";
import ModalPullCash from "./ModalPullCash";
import AddPullCashTable from "./AddPullCashTable";
import { useState, useEffect } from "react";
import { useCashInCashier } from "../../Contexts/CashInCashierContext"; // adjust the path if needed

const CashFloat = () => {
	const [modalAddCash, setModal] = useState(false);
	const [modalPullCash, setModalPullCash] = useState(false);
	//
	const [cashFloat, setCashFloat] = useState([]);
	const [totalCash, setTotalCash] = useState(0);
	//
	const [cashPull, setCashPull] = useState([]);
	const [pullTotal, setPullTotal] = useState(0);
	const { setCashInCashier } = useCashInCashier();
	const denominationMap = [
		{ label: "$1, $2", key: "c1_2" },
		{ label: "$5", key: "c5" },
		{ label: "$10", key: "c10" },
		{ label: "$20", key: "c20" },
		{ label: "$50", key: "c50" },
		{ label: "$100", key: "c100" },
		{ label: "$200", key: "c200" },
		{ label: "$500", key: "c500" },
		{ label: "$1,000", key: "c1000" },
	];

	const currencyFormatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	});

	const fetchData = async () => {
		try {
			// Fetch for cashFloat
			const resFloat = await fetch(
				"https://localhost:3001/cashFloat/cashFloat",
				{
					method: "GET",
					credentials: "include",
				}
			);
			if (!resFloat.ok)
				throw new Error(`cashFloat error! ${resFloat.status}`);
			const dataFloat = await resFloat.json();
			setCashFloat(dataFloat.cash);
			setTotalCash(dataFloat.totalCash);
			setCashInCashier(dataFloat.totalCash); // <- update shared context here ✅

			// Fetch for addPull
			const resPull = await fetch(
				"https://localhost:3001/cashFloat/pullCash",
				{
					method: "GET",
					credentials: "include",
				}
			);
			if (!resPull.ok)
				throw new Error(`addPull error! ${resPull.status}`);
			const dataPull = await resPull.json();
			setCashPull(dataPull.cash);
			setPullTotal(dataPull.totalCash);
		} catch (err) {
			console.error("Error fetching value:", err);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className={styles.cashFloatContainer}>
			<div className={styles.cashFloat_Agregar_Container}>
				<div className={styles.cashFloat_Agregar_button_Container}>
					<button onClick={() => setModal(true)}>
						Agregar Efectivo
					</button>
				</div>
				<AddPullCashTable
					cashFloat={cashFloat}
					denominationMap={denominationMap}
				/>
				<div className={styles.cashFloat_enCaja_container}>
					<div className={styles.enCaja_ctn}>
						<p>agregado</p>
					</div>
					<div className={styles.totalCash_ctn}>
						{currencyFormatter.format(totalCash)}
					</div>
				</div>
			</div>

			{/* Guardar Container */}
			<div className={styles.cashFloat_Guardar_Container}>
				<div className={styles.cashFloat_Guardar_button_Container}>
					<button onClick={() => setModalPullCash(true)}>
						guardar
					</button>
				</div>
				<AddPullCashTable
					cashFloat={cashPull}
					denominationMap={denominationMap}
					mode="guardar"
				/>

				<div className={styles.cashFloat_enCaja_container}>
					<div className={styles.enCaja_ctn}>
						<p>guardado</p>
					</div>
					<div className={styles.totalPullCtn}>
						{currencyFormatter.format(pullTotal)}
					</div>
				</div>
			</div>
			{modalAddCash && (
				<ModalAddCash
					setModal={setModal}
					refreshCashFloat={fetchData}
				/>
			)}
			{modalPullCash && (
				<ModalPullCash
					setModalPullCash={setModalPullCash}
					refreshCashFloat={fetchData}
				/>
			)}
		</div>
	);
};

export default CashFloat;
