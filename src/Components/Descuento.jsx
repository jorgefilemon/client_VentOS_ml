import { useState, useContext } from "react";
import { ProductsContext } from "../Contexts/Context";
import "./descuento.css";
// import CurrencyInput from 'react-currency-input-field';

const Descuento = ({ closeModal, passPrice, setModalsActive }) => {
	const { products, setproducts } = useContext(ProductsContext);

	// 1
	const [newPrice, setNewPrice] = useState(passPrice);
	// 2
	const [value, setValue] = useState(0);
	console.log(typeof newPrice);
	// converts the value of input modalprecio-descuento from toFixed to number so it can be then edited
	// 3
	const [toFixed, setToFixed] = useState(true);

	const applyDiscount = (value) => {
		setNewPrice((passPrice - (passPrice * value) / 100).toFixed(2));
	};

	// muestra el porcentaje de descuento ex. 5.00%
	const getPercentage = (newPrice) => {
		const result = 100 - (newPrice * 100) / passPrice;

		setValue(result.toFixed(1));
	};

	const roundDiscount = () => {
		// setActiveButton(true);
		const precioFloor = Math.floor(newPrice / 5) * 5;
		setNewPrice(precioFloor);
		const offRealPercent = (100 - (precioFloor * 100) / passPrice).toFixed(
			1
		);
		setValue(offRealPercent);
		setToFixed(true);
	};

	// const desInput = useRef();

	const agregarNuevoPrecio = () => {
		const updatedProducts = products.map((product) =>
			product.active
				? {
						...product,
						precio: parseFloat(newPrice),
						descuento: parseFloat(value),
						active: false,
						off: true,
						rebaja: (passPrice - newPrice) * -1,
						edited: true,
				  }
				: {
						...product,
				  }
		);
		// Check and update descuento and rebaja for active products again * not necessary comment out
		// const finalUpdatedProducts = updatedProducts.map((product) => {
		//   if (product.precio > passPrice) {
		//     return {
		//       ...product,
		//       descuento: 0,
		//       rebaja: 0,
		//       cambioPrecio: true,
		//       off: false,
		//     };
		//   }
		//   return product;
		// });

		setproducts(updatedProducts);
		closeModal(false);
	};

	const clearInput = (event) => {
		event.target.select();
		// setValue(null);
	};

	return (
		<div className="modalBackground">
			<div className="modalContainer">
				<div className="modal-precio">
					<h3>Precio de Venta</h3>
					<h2>
						{" "}
						{new Intl.NumberFormat("en-US", {
							style: "currency",
							currency: "USD",
						}).format(passPrice)}
					</h2>
				</div>
				<div className="modal-descuento">
					<input
						type="number"
						onFocus={clearInput}
						className="modal-descuento-input"
						value={value}
						onChange={(event) => [
							applyDiscount(event.target.value),
							setToFixed(false),
							setValue(event.target.value),
						]}
					/>
					<p>%</p>
					<button onClick={roundDiscount}>redondeo</button>
				</div>
				<div className="precio-editable">
					<input
						className="modal-precioDescuento"
						autoFocus
						type="number"
						value={toFixed ? newPrice.toFixed(2) : newPrice}
						onFocus={(e) => e.target.select()}
						onChange={(e) => [
							setNewPrice(e.target.value),
							setToFixed(false),
							getPercentage(e.target.value),
						]}
					/>
				</div>

				<div className="modal-footer">
					<button
						className="modal-btn-agregar"
						onClick={
							newPrice !== passPrice // && newPrice <= passPrice
								? () => [
										agregarNuevoPrecio(),
										setModalsActive(false),
								  ]
								: null
						}
					>
						<span style={{ fontSize: "30px" }}>Agregar</span>
					</button>
					<button
						className="modal-btn-cancelar"
						onClick={() => [
							closeModal(false),
							setModalsActive(false),
						]}
					>
						<span style={{ fontSize: "30px" }}>Cancelar</span>
					</button>
				</div>
			</div>
		</div>
	);
};
export default Descuento;
