import styles from "./cashClosingModal.module.css";
import { useEffect, useState, useRef, useContext } from "react";
import { AuthContext } from "../../../Contexts/AuthContext";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const CashClosingModal = ({ setCashClosingModal, netCash }) => {
	const { auth, setAuth } = useContext(AuthContext);

	console.log(auth);
	const navigate = useNavigate();
	const guardarRow7Ref = useRef(null);
	useEffect(() => {
		if (guardarRow7Ref.current) {
			guardarRow7Ref.current.focus();
		}
	}, []);

	const denominations = [
		{ label: "$0.5, $1, $2", key: "c1_2" },
		{ label: "$5", key: "c5" },
		{ label: "$10", key: "c10" },
		{ label: "$20", key: "c20" },
		{ label: "$50", key: "c50" },
		{ label: "$100", key: "c100" },
		{ label: "$200", key: "c200" },
		{ label: "$500", key: "c500" },
		{ label: "$1,000", key: "c1000" },
	];

	const [dejar, setDejar] = useState({
		c1_2: "",
		c5: "",
		c10: "",
		c20: "",
		c50: "",
		c100: "",
		c200: "",
		c500: "",
		c1000: "",
	});

	const [guardar, setGuardar] = useState({
		c1_2: "",
		c5: "",
		c10: "",
		c20: "",
		c50: "",
		c100: "",
		c200: "",
		c500: "",
		c1000: "",
	});

	const [totalCash, setTotalCash] = useState(0);

	const [submitting, setSubmitting] = useState(false);

	console.log(dejar);

	useEffect(() => {
		const calculateSum = (obj) => {
			const denom = denominations.reduce((total, denomination, index) => {
				const key = denomination.key;
				const value = parseFloat(obj[key]) || 0;
				const multiplier =
					index === 0
						? 1
						: parseFloat(denomination.label.replace(/[$,]/g, ""));
				return total + value * multiplier;
			}, 0);

			return denom;
		};

		const sumGuardar = calculateSum(guardar);
		const sumDejar = calculateSum(dejar);
		setTotalCash(sumGuardar + sumDejar - netCash);
	}, [guardar, dejar, netCash]);

	// using keyboard arrow keys
	const handleKeyDown = (e) => {
		const { key } = e;

		// Only react to the four navigation keys
		if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(key))
			return;

		/* Stop the native spinner/increment BEFORE doing anything else */
		e.preventDefault();
		e.stopPropagation();

		// Current cell position
		const row = Number(e.target.dataset.row);
		const col = Number(e.target.dataset.col);

		// Decide where to go
		let nextRow = row;
		let nextCol = col;

		if (key === "ArrowDown") nextRow += 1;
		if (key === "ArrowUp") nextRow -= 1;
		if (key === "ArrowRight") nextCol = 1;
		if (key === "ArrowLeft") nextCol = 0;

		// Keep focus inside the table bounds
		if (nextRow < 0 || nextRow >= denominations.length) return;

		const nextInput = document.querySelector(
			`[data-row="${nextRow}"][data-col="${nextCol}"]`
		);
		nextInput?.focus();
	};
	// gives $0.00 for placeholder

	const currencyPlaceholder = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(0);

	const currencyFormatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	});

	const handleFocus = (e) => {
		e.target.select();
	};

	const getCorteLabel = () => {
		if (totalCash === 0) return "Corte exacto";

		const absValue = Math.abs(totalCash).toFixed(2);
		const isSingular = parseFloat(absValue) === 1;

		if (totalCash > 0) {
			return `Sobra${isSingular ? "" : "n"} $${absValue}`;
		} else {
			return `Falta${isSingular ? "" : "n"} $${absValue}`;
		}
	};

	// closes the app.
	const handleLogout = () => {
		Axios.get("https://localhost:3001/logout", {
			withCredentials: true,
		}).then((res) => {
			setAuth((prev) => ({ ...prev, logged: false }));
			res.data === "cleared cookie" && navigate("/login");
		});
	};

	// const hacerCorte = () => {
	// 	Axios.post("https://localhost:3001/corte", { usu_id: auth.id }).then(
	// 		(res) => {
	// 			console.log(res.data);
	// 		}
	// 	);
	// 	setOpenCorte(false);
	// 	setMensaje(true);
	// };

	const hacerCorte = async () => {
		if (submitting) return;
		setSubmitting(true);
		try {
			const corteLabel = getCorteLabel();
			const dataToSend = {
				usu_id: auth.id,
				guardar,
				dejar,
				totalCash,
				corteLabel,
			};
			const res = await Axios.post(
				"https://localhost:3001/corte",
				dataToSend
			);
			console.log("Corte + cash float response:", res.data);
			setAuth((prev) => ({
				...prev,
				corteExitoso: true,
			}));

			handleLogout();
		} catch (error) {
			console.error("Error submitting corte and cash float:", error);
			alert("Error submitting data. Please try again.");
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div className={styles.modalBackground}>
			<div className={styles.modalCashClosing}>
				<div className={styles.cancelarCtn}>
					<button onClick={() => setCashClosingModal(false)}>
						x
					</button>
				</div>
				<div className={styles.cashInCashierCtn}>
					<p>Efectivo en caja: {currencyFormatter.format(netCash)}</p>
				</div>

				<form>
					<table className={styles.cashClosingTable}>
						<thead>
							<tr>
								<th></th>
								<th>Dejar en caja</th>
								<th>Guardar</th>
							</tr>
						</thead>
						<tbody>
							{denominations.map((denom, rowIndex) => (
								<tr key={denom.key}>
									<td>{denom.label}</td>

									{/* Dejar en caja column */}
									<td>
										<input
											type="number"
											data-col="0"
											data-row={rowIndex}
											value={dejar[denom.key]}
											placeholder={
												rowIndex === 0
													? currencyPlaceholder
													: ""
											}
											onChange={(e) =>
												setDejar((prev) => ({
													...prev,
													[denom.key]: e.target.value,
												}))
											}
											onBlur={(e) => {
												if (
													rowIndex === 0 &&
													e.target.value
												) {
													const formatted =
														parseFloat(
															e.target.value
														).toFixed(2);
													setDejar((prev) => ({
														...prev,
														[denom.key]: formatted,
													}));
												}
											}}
											className="input"
											onFocus={handleFocus}
											onKeyDown={handleKeyDown}
										/>
									</td>

									{/* Guardar column */}
									<td>
										<input
											type="number"
											data-col="1"
											data-row={rowIndex}
											value={guardar[denom.key]}
											ref={
												rowIndex ===
												denominations.length - 2
													? guardarRow7Ref
													: null
											}
											placeholder={
												rowIndex === 0
													? currencyPlaceholder
													: ""
											}
											onChange={(e) =>
												setGuardar((prev) => ({
													...prev,
													[denom.key]: e.target.value,
												}))
											}
											onBlur={(e) => {
												if (
													rowIndex === 0 &&
													e.target.value
												) {
													const formatted =
														parseFloat(
															e.target.value
														).toFixed(2);
													setGuardar((prev) => ({
														...prev,
														[denom.key]: formatted,
													}));
												}
											}}
											className="input"
											onFocus={handleFocus}
											onKeyDown={handleKeyDown}
										/>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					<div
						className={
							totalCash < 0
								? styles.cashMissing
								: styles.cashTotal
						}
					>
						<p>{getCorteLabel()}</p>
					</div>

					<button
						type="button"
						className={styles.cashclosingButton}
						onClick={hacerCorte}
					>
						{submitting ? "Cortando..." : "CORTAR"}
					</button>
				</form>
			</div>
		</div>
	);
};
export default CashClosingModal;
