import Axios from "axios";
import { ProductsContext } from "../../Contexts/Context";
import { useContext, useState } from "react";
import styles from "./devolucionDinero.module.css";

const DevolucionDinero = ({
	resultado,
	setOpenDevolucionDinero,
	setModalsActive,
}) => {
	const { products, setproducts } = useContext(ProductsContext);

	const [addArticulo] = useState({
		id: "",
		clave: "",

		descripcion: "",
		cantidad: 1,
		unidad: "PZA",

		precioNorSin: "",
		precio: 0,
		precioSin: "",

		precioCon: "",
		importeNorSin: "",
		importeNorCon: "",

		importeSin: "",
		importeCon: "",
		descuento: 0,

		rebaja: 0,
		precioCompra: "",
		importeCompra: "",

		caracteristicas: "",
		orden: "",
		// ===================================
		precio1: 0,
		existencia: "",
		inapam: false,

		active: false,
		edited: false,
		ajuste: false,
		off: false,
	});

	const resultadoInverso = resultado === 0 ? resultado : resultado * -1;

	const generarVale = () => {
		Axios.get(`https:localhost:3001/search/cambio`).then((response) => {
			const res = response.data[0];

			const newFormArticulo = {
				...addArticulo,
			};

			newFormArticulo.id = res.art_id;
			newFormArticulo.clave = res.clave;
			newFormArticulo.descripcion = res.descripcion;
			newFormArticulo.existencia = res.existencia;
			const precioParse = resultadoInverso;
			newFormArticulo.precio = parseFloat(precioParse);
			newFormArticulo.precio1 = parseFloat(precioParse);
			newFormArticulo.precioCompra = res.precioCompra * 1.16;
			newFormArticulo.importeCompra = res.precioCompra * 1.16;
			newFormArticulo.caracteristicas = res.caracteristicas;
			newFormArticulo.claveProdServ = res.claveProdServ;
			newFormArticulo.cambioCliente = true;
			newFormArticulo.active = false;

			const addVale = [...products, newFormArticulo];
			setproducts(addVale);
		});
	};

	return (
		<div className={styles.DevolucionDineroBackground}>
			<div className={styles.DevolucionDineroContainer}>
				{resultadoInverso > 0 ? (
					<>
						<div className={styles.DevolucionDineroPrecio}>
							<h2>
								Devolucion de dinero para cliente por la
								cantidad de
							</h2>
							<h1>
								{new Intl.NumberFormat("en-US", {
									style: "currency",
									currency: "USD",
								}).format(resultadoInverso)}
							</h1>
						</div>
						<div className={styles.modalFooter}>
							<button
								className={styles.actualizarBtn}
								onClick={() => [
									generarVale(),
									setOpenDevolucionDinero(false),
									setModalsActive(false),
								]}
							>
								Confirmar
							</button>
							<button
								className={styles.cancelarBtn}
								onClick={() => [
									setOpenDevolucionDinero(false),
									setModalsActive(false),
								]}
							>
								Cancelar
							</button>
						</div>
					</>
				) : (
					<>
						<div className={styles.DevolucionDineroPrecio}>
							<h2>
								Solo se puede devolver dinero al cliente cuando
								el total de la venta es negativa
							</h2>
						</div>
						<div className={styles.modalFooter}>
							<button
								className={styles.actualizarBtn}
								onClick={() => [
									setOpenDevolucionDinero(false),
									setModalsActive(false),
								]}
							>
								Aceptar
							</button>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default DevolucionDinero;
