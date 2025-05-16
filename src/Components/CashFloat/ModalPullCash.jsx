import styles from "./modalAddCash.module.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../Contexts/AuthContext";

const ModalCashFloat = ({ setModalPullCash, refreshCashFloat }) => {
	const { auth } = useContext(AuthContext);

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

	const handleKeyDown = (e, index) => {
		if (e.key === "ArrowUp" || e.key === "ArrowDown") {
			e.preventDefault();
			const inputs = document.querySelectorAll(".input");
			const targetIndex = index + (e.key === "ArrowDown" ? 1 : -1);
			inputs[targetIndex]?.focus();
		}
	};

	const currencyPlaceholder = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(0);

	const handleFocus = (e) => {
		e.target.select();
	};

	const handleSubmit = async () => {
		try {
			const response = await fetch(
				"https://localhost:3001/postCashFloat/pullCash",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						...inputs,
						usu_id: auth.id,
					}),
				}
			);

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			await refreshCashFloat();
			setModalPullCash(false);
		} catch (error) {
			console.error("Error submitting values:", error);
			alert("Error submitting data. Please try again.");
		}
	};

	return (
		<div className={styles.modalBackground}>
			{/* ✅ Add a parent class to scope special styles only here */}
			<div
				className={`${styles.modalContainer_cash} ${styles.pullCashMode}`}
			>
				<div className={styles.cancelar_Btn_Con}>
					<button onClick={() => setModalPullCash(false)}>x</button>
				</div>
				<div className={styles.agregar_efectivo_con}>
					<p>guardar</p>
				</div>
				<form
					className={styles.tableContainer_cash}
					onSubmit={(e) => {
						e.preventDefault();
						handleSubmit();
					}}
				>
					<table className={styles.add_cash_tbl}>
						<tbody>
							{denominations.map((denom, index) => (
								<tr key={denom.key}>
									<td>{denom.label}</td>
									<td>
										<input
											className="input"
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
					<div className={styles.addBtnCon}>
						<button type="submit" className={styles.pullCashBtn}>
							guardar
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ModalCashFloat;
