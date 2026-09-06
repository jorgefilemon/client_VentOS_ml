import Axios from "axios";
import { ProductsContext } from "../../Contexts/Context";
import { useContext, useState } from "react";
import styles from "./usarvale.module.css";

const UsarVale = ({ setOpenUsarVale, setModalsActive }) => {
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
		edited: true,
		ajuste: false,
		off: false,
	};

	const [valorVale, setValorVale] = useState("");

	const handleChange = (value) => {
		setValorVale(value);
	};

	const generarVale = () => {
		Axios.get(`https://localhost:3001/search/usar`).then((response) => {
			const res = response.data[0];

			const newFormArticulo = {
				...addArticulo,
			};

			newFormArticulo.id = res.art_id;
			newFormArticulo.clave = res.clave;
			newFormArticulo.descripcion = res.descripcion;
			newFormArticulo.existencia = res.existencia;
			const precioParse = valorVale * -1;
			newFormArticulo.precio = parseFloat(precioParse);
			newFormArticulo.precio1 = parseFloat(precioParse);
			newFormArticulo.precioCompra = res.precioCompra * 1.16;
			newFormArticulo.importeCompra = res.precioCompra * 1.16;
			newFormArticulo.caracteristicas = res.caracteristicas;
			newFormArticulo.claveProdServ = res.claveProdServ;
			newFormArticulo.vale = true;

			const addVale = [...products, newFormArticulo];
			setproducts(addVale);
		});
	};

	return (
		<div className={styles.valesBackground}>
			<div className={styles.valesContainer}>
				<div className={styles.valesPrecio}>
					<h2>Usar vale por la cantidad de</h2>
					<input
						type="number"
						value={valorVale}
						autoFocus
						onChange={(e) => handleChange(e.target.value)}
					/>
				</div>
				<div className={styles.modalFooter}>
					<button
						className={styles.actualizarBtn}
						onClick={() => [
							generarVale(),
							setOpenUsarVale(false),
							setModalsActive(false),
						]}
					>
						Confirmar
					</button>
					<button
						className={styles.cancelarBtn}
						onClick={() => [
							setOpenUsarVale(false),
							setModalsActive(false),
						]}
					>
						Cancelar
					</button>
				</div>
			</div>
		</div>
	);
};

export default UsarVale;
