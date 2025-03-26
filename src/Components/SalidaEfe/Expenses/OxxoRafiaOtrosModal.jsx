import styles from "./modalCantidad.module.css";
import "../../myColors.module.css";
import axios from "axios";
import { useContext } from "react";
import { ExpenseContext } from "../../../Contexts/Expense";
import { ExpenseListContext } from "../../../Contexts/ExpenseList";
import { AuthContext } from "../../../Contexts/AuthContext";

function OxxoRafiaOtrosModal({ setOxxoRafiaOtrosModal }) {
	const { expense, setExpense } = useContext(ExpenseContext);
	const { expenseList, setExpenseList } = useContext(ExpenseListContext);
	const { auth } = useContext(AuthContext);

	console.log(expenseList);
	console.log(expense);
	// manage input money
	const handleAmount = (event) => {
		setExpense((prevExpense) => ({
			...prevExpense,
			cantidad: parseFloat(event.target.value) || 0,
		}));
	};
	// handle input name
	const handleName = (event) => {
		setExpense((prevExpense) => ({
			...prevExpense,
			expenseName: event.target.value,
		}));
	};

	// send expense to the backend and database
	const sendExpense = async (e) => {
		e.preventDefault();
		// Create the updated list of expenses
		const updatedExpenseList = [...expenseList, expense];
		// Update the state with the new expense list
		setExpenseList(updatedExpenseList);
		// Then, try to post this updated list to your server
		try {
			await axios.post("https:localhost:3001/expense", {
				expenseList: updatedExpenseList, // Use the updated list directly here
				usu_id: auth.id,
				usu_name: auth.name,
			});
			console.log("Expenses sent successfully");
		} catch (error) {
			console.error("Error sending expenses:", error);
		}
		// Reset the input form
		setExpense({ type: "", expenseName: "", cantidad: 0 });
		setExpenseList([]);
		//closes a modal
		setOxxoRafiaOtrosModal(false);
	};

	// chooses background color
	const pickColor = (type) => {
		const color = {
			agua: "orange",
			rafia: "var(--verde-bg)",
			otros: "var(--verdeClaro-bg)",
			limpieza: "var(--morado-bg)",
		};
		return color[type]; // Add a default color if needed
	};

	return (
		<div className={styles.modalBackgroundCantidad}>
			<div className={styles.modalContainerCantidad}>
				<div
					className={styles.expenseNameContainer}
					style={{ backgroundColor: pickColor(expense.type) }}
				>
					<h2>{expense.type}</h2>
				</div>

				<div className={styles.formContainer}>
					<form onSubmit={sendExpense}>
						{expense.type === "otros" ? (
							<>
								<input
									autoFocus
									placeholder="nombre del gasto"
									type="text"
									onFocus={(e) => e.target.select()}
									onChange={handleName}
								/>
								<input
									type="number"
									placeholder="cantidad"
									onFocus={(e) => e.target.select()}
									value={expense.cantidad || ""}
									onChange={handleAmount}
								/>
							</>
						) : (
							<input
								autoFocus
								type="number"
								onFocus={(e) => e.target.select()}
								value={expense.cantidad || ""}
								onChange={handleAmount}
							/>
						)}
						<div className={styles.buttonContainer}>
							<button
								className={styles.aceptarButton}
								style={{
									backgroundColor: pickColor(expense.type),
								}}
								type="submit"
							>
								aceptar
							</button>
							<button
								onClick={() => setOxxoRafiaOtrosModal(false)}
							>
								cancelar
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default OxxoRafiaOtrosModal;
