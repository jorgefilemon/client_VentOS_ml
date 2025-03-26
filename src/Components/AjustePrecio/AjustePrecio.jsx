import { useState, useContext } from "react";
import { ProductsContext } from "../../Contexts/Context";
import styles from "./ajustePrecio.module.css"

const AjustePrecio = ({ setOpenAjuste, passPrice, setModalsActive }) => {
  const { products, setproducts } = useContext(ProductsContext);
  const [newPrice, setNewPrice] = useState(passPrice);
  const [toFixed, setToFixed] = useState(true);

  const handleChange = (value) => {

    const float = parseFloat(value);
    setNewPrice(float)
  }

  const ajustarNuevoPrecio = () => {
    setproducts(
      products.map((product) =>
        product.active && product.inapam === false
          ? {
            ...product,
            precio: newPrice * -1,
            descuento: 0,
            cantidad: -1,
            off: false,

            ajuste: false,
            rebaja: 0,

            active: false, edited: true, devolucion: true

          }
          : product
      )
    );
    setOpenAjuste(false);
  };

  return (
    <div className={styles.modalBackgroundAjustePrecio}>
      <div className={styles.ajusteContainer}>
        <div className={styles.ajustePrecio}>
          <h1>Verificar precio de venta</h1>
          <input

            className={styles.ajusteInput}
            type='number'
            autoFocus
            value={toFixed ? newPrice.toFixed(2) : newPrice}

            onFocus={(e) => { e.target.select() }}
            onChange={(event) => [setToFixed(false), handleChange(event.target.value)]}
          />
        </div>

        <div className={styles.modalFooter}>

          {newPrice > 0 ?
            <button

              className={styles.actualizarBtn}
              onClick={() => [ajustarNuevoPrecio(), setModalsActive(false)]}
            >
              Aceptar
            </button>
            :
            <button
              className="actualizar-btn-desactivado">Actualizar</button>}

          <button className={styles.cancelarBtn} onClick={() => [setOpenAjuste(false), setModalsActive(false)]}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};
export default AjustePrecio;
