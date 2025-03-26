import styles from "./modalCashFloat.module.css";
// import CurrencyInput from 'react-currency-input-field';

const ModalCashFloat = ({ setModal }) => {
	return (
		<div className={styles.modalBackground}>
			<div className="modalContainer">
				<div className="modal-precio">
					<button onClick={() => setModal(false)}>x</button>
					<h3>Agregar Efectivo</h3>
				</div>

				<div className="modal-footer">
					<button className="modal-btn-agregar">
						<span style={{ fontSize: "30px" }}>Agregar</span>
					</button>
				</div>
			</div>
		</div>
	);
};
export default ModalCashFloat;
