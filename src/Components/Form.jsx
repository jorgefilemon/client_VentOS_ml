import Axios from "axios";
import { useRef, useState, useContext, useEffect } from "react";
import { ProductsContext } from "../Contexts/Context";
import "./form.css";

const Form = () => {
	// 1
	const firstUpdate = useRef(true);
	// 2
	const { products, setproducts } = useContext(ProductsContext);
	// 3 articulo mockup
	const [addArticulo, setaddArticulo] = useState({
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
		precio1: "",
		existencia: "",
		inapam: false,
		scheme: false,
		active: false,
		edited: false,
		ajuste: false,
		vale: false,
		off: false,
		devolucion: false,
	});
	// 4
	const [input, setInput] = useState("");
	// 5
	const refInput = useRef();

	const getArticulo = (e) => {
		e.preventDefault();
		if (input === "") return;
		/// le agrege esto para que no marcara error cuando le das en buscar y no hay articulo

		Axios.get(`https:localhost:3001/search/${input}`).then((response) => {
			const res = response.data[0];
			if (!res) {
				alert("producto no existe");
			} else {
				const newFormArticulo = {
					...addArticulo,
				};

				newFormArticulo.id = res.art_id;
				newFormArticulo.clave = res.clave;
				newFormArticulo.descripcion = res.descripcion;
				newFormArticulo.existencia = res.existencia;
				newFormArticulo.precio = (res.precio1 * 1.16).toFixed(2);
				newFormArticulo.precio1 = (res.precio1 * 1.16).toFixed(2);
				newFormArticulo.precioCompra = res.precioCompra * 1.16;
				newFormArticulo.importeCompra = res.precioCompra * 1.16;
				newFormArticulo.caracteristicas = res.caracteristicas;
				newFormArticulo.claveProdServ = res.claveProdServ;

				setaddArticulo(newFormArticulo);
			}
		});
		refInput.current.value = "";
		refInput.current.focus();
	};

	const getLastTicket = () => {
		Axios.get("https:localhost:3001/lastTicket").then((res) => {
			console.log(res.data);
		});
		refInput.current.focus();
	};

	const handleAddproductsSubmit = () => {
		const newArticulo = {
			id: addArticulo.id,
			clave: addArticulo.clave,

			descripcion: addArticulo.descripcion,
			cantidad: 1,
			unidad: "PZA",

			existencia: parseFloat(addArticulo.existencia),
			descuento: parseFloat(addArticulo.descuento),
			precio: parseFloat(addArticulo.precio),

			precio1: parseFloat(addArticulo.precio1),
			precioCompra: parseFloat(addArticulo.precioCompra),
			importeCompra: parseFloat(addArticulo.precioCompra),

			caracteristicas: addArticulo.caracteristicas,
			claveProdServ: addArticulo.claveProdServ,

			active: addArticulo.active,
			rebaja: addArticulo.rebaja,
			edited: addArticulo.edited,
			ajuste: addArticulo.ajuste,
			inapam: addArticulo.inapam,
			cambioCliente: addArticulo.cambioCliente,
			devolucion: addArticulo.devolucion,
			off: addArticulo.off,
			vale: addArticulo.vale,
		};

		const newproducts = [...products, newArticulo];
		setproducts(newproducts);
	};

	const clearInput = () => {
		setInput("");
	};

	const handleChange = (e) => {
		setInput(e.target.value);
	};

	useEffect(() => {
		if (firstUpdate.current) {
			firstUpdate.current = false;
			return;
		}
		handleAddproductsSubmit();

		//eslint-disable-next-line
	}, [addArticulo]);

	useEffect(() => {
		clearInput();
		refInput.current.focus();
	}, [products]);

	return (
		<div className="form-control">
			<div className="form-space"></div>
			<form onSubmit={getArticulo}>
				<input
					autoFocus
					autoComplete="off"
					ref={refInput}
					id="input-search"
					type="text"
					//required="required"
					placeholder="Buscar..."
					onChange={handleChange}
				/>
				<button className="submit-btn">buscar</button>
			</form>

			<div className="form-button">
				<button onClick={getLastTicket}>reimprimir ticket</button>
			</div>
		</div>
	);
};

export default Form;
