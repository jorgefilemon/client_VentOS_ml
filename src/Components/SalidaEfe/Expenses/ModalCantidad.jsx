import React, { useState, useRef, useEffect } from "react";
import styles from "./modalCantidad.module.css";
import "../../myColors.module.css";

function ModalCantidad({
	expense,
	setExpense,
	setModalCantidad,
	expenseList,
	setExpenseList,
}) {
	const [activeButton, setActiveButton] = useState(null);
	const [inputValue, setInputValue] = useState(expense.cantidad || "");
	const inputRef = useRef(null);

	const handleButtonClick = (type) => {
		setActiveButton(type);

		if (type === "origen") {
			setExpense((prevexpense) => ({ ...prevexpense, cantidad: 0 }));
			setInputValue(0); // Set the input value to 0
		} else if (type === "destino") {
			setInputValue(""); // Clear the input value
			if (inputRef && inputRef.current) {
				inputRef.current.focus();
			}
		}
	};

	useEffect(() => {
		if (inputRef.current && activeButton === "destino") {
			inputRef.current.focus();
		}
	}, [activeButton]);

	const handleAccept = (e) => {
		// e.preventDefault();
		const updatedexpense = {
			...expense,
			cantidad: parseFloat(inputValue) || 0,
		};
		const newList = [...expenseList, updatedexpense];
		setExpenseList(newList);
		setExpense({ expenseName: "", cantidad: 0 });
		setModalCantidad(false);
	};

	const handleChange = (event) => {
		setInputValue(event.target.value);
	};

	// const handleKeyDown = (e) => {
	// 	if (e.key === "Enter") {
	// 		handleAccept(e);
	// 	}
	// };

	// chooses background color
	const pickColor = ({ expense }) => {
		const color = {
			"inter bajio": "var(--rosaFuerte-bg)",
			castores: "var(--rosa-bg)",
			"julian de obregon": "var(--naranja-bg)",
			otro: "var(--morado-bg)",
			"nino obrero": "var(--rosaFuerte-bg)",
			"gabriel aguirre": "var(--rosa-bg)",
			misioneros: "var(--naranja-bg)",
			foyo: "var(--rosaFuerte-bg)",
			tony: "var(--rosa-bg)",
			alex: "var(--naranja-bg)",
		};
		return color[expense.expenseName];
	};

	const isInputDisabled = () => {
		return expense.expenseName === "castores" && activeButton !== "destino";
	};

	return (
		<div
			className={styles.modalBackgroundCantidad}
			//onKeyDown={handleKeyDown}
		>
			<div className={styles.modalContainerCantidad}>
				<div
					className={styles.expenseNameContainer}
					style={{ backgroundColor: pickColor({ expense }) }}
				>
					<h2>{expense.expenseName}</h2>
				</div>
				{expense.expenseName === "castores" ? (
					<>
						<div className={styles.castoresContainer}>
							<button
								onClick={() => handleButtonClick("destino")}
								style={{
									backgroundColor:
										activeButton === "destino"
											? "var(--rosa-bg)"
											: "white",
									color:
										activeButton === "destino"
											? "white"
											: "black",
								}}
							>
								C. DESTINO
							</button>
							<button
								onClick={() => handleButtonClick("origen")}
								style={{
									backgroundColor:
										activeButton === "origen"
											? "var(--rosa-bg)"
											: "white",
									color:
										activeButton === "origen"
											? "white"
											: "black",
								}}
							>
								C. ORIGEN
							</button>
						</div>
						<div className={styles.inputContainer}>
							<form
								className={styles.formContainer}
								onSubmit={handleAccept}
							>
								<input
									type="number"
									ref={inputRef}
									onFocus={(e) => e.target.select()}
									value={inputValue}
									onChange={handleChange}
									disabled={isInputDisabled()}
								/>

								<div className={styles.buttonContainer}>
									<button
										className={styles.aceptarButton}
										style={{
											backgroundColor: pickColor({
												expense,
											}),
										}}
										onClick={handleAccept}
									>
										aceptar
									</button>
									<button
										onClick={() => setModalCantidad(false)}
									>
										cancelar
									</button>
								</div>
							</form>
						</div>
					</>
				) : (
					<div className={styles.formContainer}>
						<form
							onSubmit={handleAccept}
							// onKeyDown={handleKeyDown}
						>
							<input
								autoFocus
								type="number"
								onFocus={(e) => e.target.select()}
								value={inputValue}
								onChange={handleChange}
							/>

							<div className={styles.buttonContainer}>
								<button
									className={styles.aceptarButton}
									style={{
										backgroundColor: pickColor({ expense }),
									}}
									onClick={handleAccept}
								>
									aceptar
								</button>
								<button onClick={() => setModalCantidad(false)}>
									cancelar
								</button>
							</div>
						</form>
					</div>
				)}
			</div>
		</div>
	);
}

export default ModalCantidad;
