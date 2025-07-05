import styles from "./cashClosingModal.module.css";
import { useContext, useState } from "react";
// import { AuthContext } from "../../../Contexts/AuthContext";

const CashClosingModal = ({ setModal, refreshCashFloat }) => {
	// const { auth } = useContext(AuthContext);

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

	const handleFocus = (e) => {
		e.target.select();
	};

	// const handleSubmit = async () => {
	// 	try {
	// 		const response = await fetch(
	// 			"https://localhost:3001/postCashFloat/cashFloat",
	// 			{
	// 				method: "POST",
	// 				headers: {
	// 					"Content-Type": "application/json",
	// 				},
	// 				// Convert object to JSON string
	// 				body: JSON.stringify({
	// 					...inputs,
	// 					usu_id: auth.id,
	// 				}),
	// 			}
	// 		);

	// 		// Fetch does not throw an error for non-2xx responses, so check manually
	// 		if (!response.ok) {
	// 			throw new Error(`HTTP error! Status: ${response.status}`);
	// 		}

	// 		await refreshCashFloat();
	// 		// If we reach here, the response is OK (2xx)
	// 		setModal(false);
	// 	} catch (error) {
	// 		console.error("Error submitting values:", error);
	// 		alert("Error submitting data. Please try again.");
	// 	}
	// };

	return (
		<div className={styles.modalBackground}>
			<div className={styles.modalCashClosing}>
				<div className={styles.cancelarBtnCtn}>
					<button onClick={() => setModal(false)}>x</button>
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
									<td>
										<input
											type="number"
											data-col="0"
											data-row={rowIndex}
											value={inputs[denom.key]}
											placeholder={
												rowIndex === 0
													? currencyPlaceholder
													: ""
											}
											onChange={(e) =>
												setInputs((prev) => ({
													...prev,
													[denom.key]: e.target.value,
												}))
											}
											className="input"
											onFocus={handleFocus}
											onKeyDown={(e) => handleKeyDown(e)}
										/>
									</td>
									<td>
										<input
											type="number"
											data-col="1"
											data-row={rowIndex}
											placeholder={
												rowIndex === 0
													? currencyPlaceholder
													: ""
											}
											value={inputs[denom.key]} // or another state if needed
											onChange={(e) =>
												setInputs((prev) => ({
													...prev,
													[denom.key]: e.target.value,
												}))
											}
											className="input"
											onFocus={handleFocus}
											onKeyDown={handleKeyDown}
										/>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</form>
			</div>
		</div>
	);
};
export default CashClosingModal;
