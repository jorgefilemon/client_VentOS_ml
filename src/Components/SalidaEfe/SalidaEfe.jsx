import styles from "./salidaEfe.module.css";
import { useState, useContext } from "react";
import { ExpenseContext } from "../../Contexts/Expense";
import Modal from "./modal/Modal";
import OxxoRafiaOtrosModal from "./Expenses/OxxoRafiaOtrosModal";

const SalidaEfe = () => {
	// const { auth } = useContext(AuthContext);

	const Fletes = "Fletes"; // Define Fletes as a string
	const Donativos = "Donativos";
	const Papeleria = "Papeleria";

	// context for Oxxo Rafia otros
	const { expense, setExpense } = useContext(ExpenseContext);
	console.log(expense);

	// opens Donativos, Fletes, Papeleria Modal
	const [isModalOpen, setIsModalOpen] = useState(false);

	// function to sendExpense to the back end.

	// opens oxxoRafiaOtros.jsx
	const [oxxoRafiaOtrosModal, setOxxoRafiaOtrosModal] = useState(false);

	const [modalName, setModalName] = useState(null);

	const closeModal = () => {
		setIsModalOpen(false);
	};

	return (
		<div className={styles.salidaEfeContainer}>
			<div className={styles.row1}>
				<button
					className={styles.rosa}
					onClick={() => {
						setModalName(Fletes);
						setIsModalOpen(true);
					}}
				>
					fletes
				</button>
				<button
					className={styles.rosaFuerte}
					onClick={() => {
						setModalName(Donativos);
						setIsModalOpen(true);
					}}
				>
					donativos
				</button>
				<button
					className={styles.naranja}
					onClick={() => {
						setModalName(Papeleria);
						setIsModalOpen(true);
					}}
				>
					papeleria
				</button>
				<button
					className={styles.orange}
					onClick={() => {
						setExpense({
							...expense,
							cantidad: 0,
							type: "agua",
							expenseName: "Agua oxxo",
						});
						setOxxoRafiaOtrosModal(true);
					}}
				>
					agua oxxo
				</button>
			</div>
			<div className={styles.row2}>
				<button
					className={styles.morado}
					onClick={() => {
						setExpense({
							...expense,
							cantidad: 0,
							type: "limpieza",
							expenseName: "limpieza",
						});
						setOxxoRafiaOtrosModal(true);
					}}
				>
					limpieza
				</button>
				{/* <button className={styles.moradoClaro}>salarios</button> */}
				<button
					className={styles.verdeClaro}
					onClick={() => {
						setExpense({
							...expense,
							cantidad: 0,
							type: "rafia",
							expenseName: "rafia",
						});
						setOxxoRafiaOtrosModal(true);
					}}
				>
					rafia
				</button>
				<button
					className={styles.verde}
					onClick={() => {
						setExpense({
							...expense,
							type: "otros",
							expenseName: "otros expenses",
						});
						setOxxoRafiaOtrosModal(true);
					}}
				>
					otros
				</button>
			</div>

			{isModalOpen && (
				<Modal modalName={modalName} closeModal={closeModal} />
			)}
			{oxxoRafiaOtrosModal && (
				<OxxoRafiaOtrosModal
					setOxxoRafiaOtrosModal={setOxxoRafiaOtrosModal}
				/>
			)}
		</div>
	);
};

export default SalidaEfe;
