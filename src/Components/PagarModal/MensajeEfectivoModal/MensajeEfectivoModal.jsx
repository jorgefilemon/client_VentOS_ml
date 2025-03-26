import styles from "./mensajeEfectivoModal.module.css";

const MensajeEfectivoModal = ({ setOpenMensajeEfectivo }) => {
    return (

        <div className={styles.MensajeTarjeta}>
            <div className={styles.DevolucionDineroPrecio}>
                <h2>No puedes hacer venta con cambio en negativo</h2>

            </div>
            <div className={styles.modalFooter}>
                <button
                    className={styles.actualizarBtn}
                    onClick={() => setOpenMensajeEfectivo(false)}
                >
                    Aceptar
                </button>
            </div>
        </div>
    );
}

export default MensajeEfectivoModal;