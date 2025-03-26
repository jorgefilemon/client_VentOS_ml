import styles from "./mensajeTarjetaModal.module.css";

const MensajeTarjetaModal = ({ setOpenMensaje }) => {
    return (

        <div className={styles.MensajeTarjeta}>
            <div className={styles.DevolucionDineroPrecio}>
                <h2>En pago con tarjeta no puedes cobrar mas del total de la venta</h2>

            </div>
            <div className={styles.modalFooter}>
                <button
                    className={styles.actualizarBtn}
                    onClick={() => setOpenMensaje(false)}
                >
                    Aceptar
                </button>
            </div>
        </div>
    );
}

export default MensajeTarjetaModal;