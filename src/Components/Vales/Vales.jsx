import Axios from "axios";
import { ProductsContext } from "../../Contexts/Context";
import { useContext } from "react";
import styles from "./vales.module.css";

const Vales = ({ resultado, setOpenGenerarVale }) => {
	const { products, setproducts } = useContext(ProductsContext);

	const addArticulo = {
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
		edited: true, // so it cant be changed any way
		ajuste: false,
		off: false,
	};

	const resultadoInverso = resultado === 0 ? resultado : resultado * -1;

	const generarVale = () => {
		Axios.get(`https:localhost:3001/search/generar`).then((response) => {
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
			newFormArticulo.vale = true;
			newFormArticulo.active = false;

			const addVale = [...products, newFormArticulo];
			setproducts(addVale);
		});
	};

	return (
		<div className={styles.valesBackground}>
			<div className={styles.valesContainer}>
				{resultadoInverso > 0 ? (
					<>
						<div className={styles.valesPrecio}>
							<h2>Generar vale por la cantidad de</h2>
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
									setOpenGenerarVale(false),
								]}
							>
								Confirmar
							</button>
							<button
								className={styles.cancelarBtn}
								onClick={() => setOpenGenerarVale(false)}
							>
								Cancelar
							</button>
						</div>
					</>
				) : (
					<>
						<div className={styles.valesPrecio}>
							<h2>
								Solo se puede generar vale cuando el total de la
								venta es negativa
							</h2>
						</div>
						<div className={styles.modalFooter}>
							<button
								className={styles.actualizarBtn}
								onClick={() => setOpenGenerarVale(false)}
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

export default Vales;
