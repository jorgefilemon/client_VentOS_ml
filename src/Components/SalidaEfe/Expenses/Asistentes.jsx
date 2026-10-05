import { useContext, useState } from "react";
import axios from "axios";
import styles from "../modal/modal.module.css";
import { AuthContext } from "../../../Contexts/AuthContext";
import ModalCantidad from "./ModalCantidad";

function Asistentes({ closeModal, modalName }) {
	const { auth } = useContext(AuthContext);
	const [modalCantidad, setModalCantidad] = useState(false);
	const [expense, setExpense] = useState({
		type: modalName,
		expenseName: "",
		cantidad: 0,
	});
	const [expenseList, setExpenseList] = useState([]);

	const createExpense = (expenseName) => {
		setExpense({
			type: modalName,
			expenseName,
			cantidad: 0,
		});
		setModalCantidad(true);
	};

	const sendExpense = async (event) => {
		event.preventDefault();

		try {
			await axios.post("https://localhost:3001/expense", {
				expenseList,
				usu_id: auth.id,
				usu_name: auth.name,
			});
			console.log("Expenses sent successfully");
		} catch (error) {
			console.error("Error sending expenses:", error);
		}

		setExpense({ type: "", expenseName: "", cantidad: 0 });
		setExpenseList([]);
		closeModal();
	};

	const deleteExpense = (expenseIndex) => {
		setExpenseList((currentList) =>
			currentList.filter((item, index) => index !== expenseIndex)
		);
	};

	const total = expenseList.reduce(
		(sum, item) => sum + parseFloat(item.cantidad),
		0
	);

	return (
		<>
			<div className={styles.options}>
				{["mariela", "denisse", "paola", "renata"].map((name) => (
					<button
						key={name}
						className={`${styles.ciruelaPastel} ${styles.assistantNameButton}`}
						onClick={() => createExpense(name)}
					>
						{name}
					</button>
				))}
			</div>

			<div className={styles.modalTable}>
				<table>
					<thead>
						<tr>
							<th>borrar</th>
							<th>nombre del asistente</th>
							<th>cantidad</th>
						</tr>
					</thead>
					<tbody>
						{expenseList.map((item, index) => (
							<tr key={index}>
								<td>
									<button onClick={() => deleteExpense(index)}>X</button>
								</td>
								<td>{item.expenseName}</td>
								<td>
									{new Intl.NumberFormat("en-US", {
										style: "currency",
										currency: "USD",
									}).format(item.cantidad)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<div className={styles.footer}>
				<div className={styles.totalText}>total</div>
				<div className={styles.totalQuantity}>
					{new Intl.NumberFormat("en-US", {
						style: "currency",
						currency: "USD",
					}).format(total)}
				</div>
			</div>

			<div className={styles.aceptarCancelar}>
				<button
					className={`${styles.aceptarBtn} ${styles.ciruelaPastel}`}
					onClick={sendExpense}
				>
					Aceptar
				</button>
				<button className={styles.cancelarBtn} onClick={closeModal}>
					Cancelar
				</button>
			</div>

			{modalCantidad && (
				<ModalCantidad
					expense={expense}
					setExpense={setExpense}
					setModalCantidad={setModalCantidad}
					expenseList={expenseList}
					setExpenseList={setExpenseList}
				/>
			)}
		</>
	);
}

export default Asistentes;
