import styles from "./addCashToDrawer.module.css";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import { useCashInCashier } from "../../Contexts/CashInCashierContext";

const AddCashToDrawer = ({ setAddCashToDrawer }) => {
	const { auth } = useContext(AuthContext);
	const { cashInCashier } = useCashInCashier(); // <- first destructure
	const { cashAdded, latestColumn } = cashInCashier; // <- second destructure
	const userId = auth?.id;

	const [total, setTotal] = useState(parseFloat(cashAdded) || 0);

	console.log(latestColumn);
	const [inputs, setInputs] = useState({
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

	const denominations = [
		{ label: "0.5, 1, 2", key: "c1_2" },
		{ label: "5", key: "c5" },
		{ label: "10", key: "c10" },
		{ label: "20", key: "c20" },
		{ label: "50", key: "c50" },
		{ label: "100", key: "c100" },
		{ label: "200", key: "c200" },
		{ label: "500", key: "c500" },
		{ label: "1000", key: "c1000" },
	];

	useEffect(() => {
		const added =
			(inputs.c1_2 ? parseFloat(inputs.c1_2) * 1 : 0) +
			(inputs.c5 ? parseFloat(inputs.c5) * 5 : 0) +
			(inputs.c10 ? parseFloat(inputs.c10) * 10 : 0) +
			(inputs.c20 ? parseFloat(inputs.c20) * 20 : 0) +
			(inputs.c50 ? parseFloat(inputs.c50) * 50 : 0) +
			(inputs.c100 ? parseFloat(inputs.c100) * 100 : 0) +
			(inputs.c200 ? parseFloat(inputs.c200) * 200 : 0) +
			(inputs.c500 ? parseFloat(inputs.c500) * 500 : 0) +
			(inputs.c1000 ? parseFloat(inputs.c1000) * 1000 : 0);

		setTotal(parseFloat(cashAdded) + added);
	}, [inputs, cashAdded]);

	const handleKeyDown = (e, index) => {
		if (e.key === "ArrowUp" || e.key === "ArrowDown") {
			e.preventDefault();
			const inputs = document.querySelectorAll(".input");
			const targetIndex = index + (e.key === "ArrowDown" ? 1 : -1);
			inputs[targetIndex]?.focus();
		}
	};
	const currencyFormatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	});

	// gives $0.00 for placeholder
	const currencyPlaceholder = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(0);

	const handleFocus = (e) => {
		e.target.select();
	};

	const handleAddedCash = async () => {
		try {
			const response = await fetch(
				"https://localhost:3001/postCashFloat/cashFloat",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					// Convert object to JSON string
					body: JSON.stringify({
						...inputs,
						usu_id: userId,
						latestColumn: latestColumn,
					}),
				}
			);

			// Fetch does not throw an error for non-2xx responses, so check manually
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			setAddCashToDrawer(false);
		} catch (error) {
			console.error("Error submitting values:", error);
			alert("Error submitting data. Please try again.");
		}
	};

	return (
		<div className={styles.modalBackground}>
			<div className={styles.modalContainer_cash}>
				<div className={styles.cancelar_Btn_Con}>
					<p>Agregar efectivo</p>

					{/* <button onClick={() => setAddCashToDrawer(false)}>x</button> */}
				</div>

				<form
					className={styles.tableContainer_cash}
					onSubmit={(e) => {
						e.preventDefault();
						handleAddedCash();
					}}
				>
					<table className={styles.add_cash_tbl}>
						<tbody>
							{denominations.map((denom, index) => (
								<tr key={denom.key}>
									<td>{denom.label}</td>
									<td>
										<input
											type="number"
											placeholder={
												index === 0
													? currencyPlaceholder
													: null
											}
											value={inputs[denom.key]}
											onChange={(e) =>
												setInputs((prev) => ({
													...prev,
													[denom.key]: e.target.value,
												}))
											}
											className="input"
											autoFocus={index === 3}
											onFocus={handleFocus}
											onKeyDown={(e) => {
												if (
													e.key === "-" ||
													e.key === "e"
												)
													e.preventDefault();
												handleKeyDown(e, index);
											}}
											onBlur={(e) => {
												if (
													index === 0 &&
													e.target.value
												) {
													const formatted =
														parseFloat(
															e.target.value
														).toFixed(2);
													setInputs((prev) => ({
														...prev,
														[denom.key]: formatted,
													}));
												}
											}}
										/>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					<div className={styles.cancelar_Btn_Con}>
						<p>EN CAJA {currencyFormatter.format(total)}</p>
					</div>
					<div className={styles.addBtnCon}>
						<button type="submit" className={styles.addCashBtn}>
							Agregar
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
export default AddCashToDrawer;
