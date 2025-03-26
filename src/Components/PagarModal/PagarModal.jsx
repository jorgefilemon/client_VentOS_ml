import styles from "./pagarModal.module.css";
import { useState, useContext } from "react";
import Axios from "axios";
// import CambioModal from '../CambioModal/CambioModal'
import { ProductsContext } from "../../Contexts/Context";
import { AuthContext } from "../../Contexts/AuthContext";
import { CambioContext } from "../../Contexts/CambioContext";
import { numeroALetras } from "../../utils/numeroALetras";
//import Invoice from '../Invoice/Invoice';
// import moment from 'moment';
import MensajeTarjetaModal from "./MensajeTarjetaModal/MensajeTarjetaModal";
import MensajeEfectivoModal from "./MensajeEfectivoModal/MensajeEfectivoModal";

const PagarModal = ({ setOpenVenta, resultado, setOpenCambioModal }) => {
	// STATES
	// ProductContext
	const { products } = useContext(ProductsContext);
	// AuthContext
	const { auth } = useContext(AuthContext);

	const { setCambioCliente } = useContext(CambioContext);

	// 1 State:
	const [inputData, setInputData] = useState({
		efectivo: resultado,
		tarjeta: 0,
		tarjeta2: 0,
	});
	//4
	//const [invoiceTicket, setInvoiceTicket] = useState({})
	//5
	//const [setPagoEfectivo] = useState('')
	//6
	//const [setPagoTarjeta] = useState([])
	// 7
	const [openMensaje, setOpenMensaje] = useState(false);
	const [openMensajeEfectivo, setOpenMensajeEfectivo] = useState(false);

	const [disabled, setDisabled] = useState(false);

	//const [detallev, setDetallev] = useState([]);

	// PRICE TO LETTERS FUNCTION

	// escribe el precio en letra
	const resultadoEnLetra = `(${numeroALetras(resultado)})`;

	// convierte el inputData object en array
	const objectToArray = Object.values(inputData);

	const newArr = objectToArray.map((value) => (value === "" ? 0 : value));
	//

	const sum = newArr.reduce(
		(accumulator, value) => accumulator + parseFloat(value),
		0
	);

	console.log("sum", sum);

	const descuentoTotal = products.reduce(
		(sum, value) => (sum = sum + parseFloat(value.rebaja)),
		0
	); // products.length;

	const cambio = sum - resultado;
	// FUNCTIONS

	console.log("cambio:", cambio);

	const handlePayment = (event) => {
		const fieldName = event.target.getAttribute("name");
		const fieldValue = event.target.value;

		const newInputData = { ...inputData };
		newInputData[fieldName] = fieldValue;
		setInputData(newInputData);
	};

	// separa el inputData {} en
	const valores = Object.values(inputData);
	const efectivo = valores[0];
	const tarjeta = Number(valores[1]) + Number(valores[2]);

	// const addVenta = () => {
	// 	if (disabled) {
	// 		return; // Prevent function execution if already disabled
	// 	}
	// 	if (tarjeta > resultado) {
	// 		setOpenMensaje(true);
	// 		setDisabled(false);
	// 		return;
	// 	}
	// 	if (cambio < 0) {
	// 		setOpenMensajeEfectivo(true);
	// 		setDisabled(false);
	// 		return;
	// 	} else {
	// 		const productsReduce = products.reduce((acc, val) => {
	// 			let obj = acc.find(
	// 				(key) => key.descripcion === val.descripcion
	// 			);
	// 			if (obj) {
	// 				obj.cantidad += val.cantidad;
	// 				obj.precio += val.precio;
	// 				obj.rebaja += val.rebaja;
	// 				obj.descuento = obj.descuento + val.descuento;
	// 				obj.importeCompra += val.importeCompra;
	// 			} else {
	// 				acc.push(val);
	// 			}
	// 			return acc;
	// 		}, []);

	// 		const newResult = productsReduce.map((product) => {
	// 			if (product.cantidad > 1) {
	// 				return {
	// 					...product,
	// 					descuento: parseFloat(
	// 						product.descuento / product.cantidad
	// 					).toFixed(1),
	// 				};
	// 			} else {
	// 				return product;
	// 			}
	// 		});

	// 		const addMoreValuesToObject = newResult.map((product, index) => ({
	// 			art_id: product.id,
	// 			clave: product.clave,

	// 			descripcion: product.descripcion,
	// 			cantidad: product.cantidad,
	// 			unidad: product.unidad,

	// 			precioNorSin: (product.precio1 / 1.16).toFixed(2),
	// 			precioNorCon: product.precio1.toFixed(2),
	// 			precioSin: product.precio1 / 1.16,

	// 			precioCon: product.precio1.toFixed(2),
	// 			importeNorSin: product.precio / 1.16,
	// 			importeNorCon: product.precio,

	// 			importeSin: product.precio / 1.16,
	// 			importeCon: product.precio,

	// 			descPorcentaje: product.descuento,

	// 			descTotal: product.rebaja * -1,
	// 			precioCompra: product.precioCompra,
	// 			importeCompra: product.importeCompra,

	// 			sinGravar: 0,
	// 			caracteristicas: product.caracteristicas,
	// 			// agrega el orden de los productos en venta 0,1,2,3 etc
	// 			orden: index,
	// 			// mas datos para la tabla de detallev
	// 			cuentaPredial: "",
	// 			movVen: 1,
	// 			movVenC: -2,
	// 			claveProdServ: product.claveProdServ,
	// 		}));

	// 		const newList = [...addMoreValuesToObject];

	// 		Axios.post(
	// 			"https:localhost:3001/venta",

	// 			{
	// 				total: resultado,
	// 				resultadoEnLetra: resultadoEnLetra,
	// 				cambio: cambio,
	// 				descuento: descuentoTotal * -1,
	// 				products: newList,
	// 				efectivo: efectivo,
	// 				tarjeta: tarjeta,
	// 				usu_id: auth.id,
	// 			}
	// 		)
	// 			.then((res) => {
	// 				//console.log('res', res.data)
	// 				// const detallevDescripcion = res.data.detallev;
	// 				// setDetallev(...detallev, detallevDescripcion)
	// 				// const venta = res.data.venta[0]
	// 				// const addVenta = { ...invoiceTicket }
	// 				// addVenta.total = venta.total;
	// 				// addVenta.cambio = venta.cambio;
	// 				// addVenta.ticket = venta.tic_id;
	// 				// const fecha = venta.fecha;
	// 				// const onlyDate = moment(fecha).locale('es').format
	// 				//     ("DD/MMM/YYYY")
	// 				// const onlyTime = moment(fecha).format
	// 				//     ("h:mm:ss A")
	// 				// addVenta.date = onlyDate;
	// 				// addVenta.time = onlyTime;
	// 				// setInvoiceTicket(addVenta)
	// 				// const movDescripcion = res.data.movimiento;
	// 				// // setMovTicket(...movTicket, movDescripcion)
	// 				// const cash = movDescripcion.filter((paymentType) => paymentType.tpa_id === 1);
	// 				// if (cash.length === 0) {
	// 				//     cash.push({ tpa_id: 1, total: '0.00' });
	// 				// }
	// 				// setPagoEfectivo(cash);
	// 				// const card = movDescripcion.filter((paymentType) => paymentType.tpa_id === 6);
	// 				// if (card.length === 0) {
	// 				//     card.push({ tpa_id: 6, total: '0.00' });
	// 				// }
	// 				// setPagoTarjeta(card);
	// 			})
	// 			.then(() => {
	// 				//
	// 				//  to make it work to the original page uncomment
	// 				if (cambio > 0) {
	// 					setOpenVenta(false);
	// 					setCambioCliente(cambio);
	// 					setOpenCambioModal(true);

	// 					//
	// 					//setDisabled(false);
	// 				} else {
	// 					// setDisabled(false);
	// 					window.location.reload();
	// 				}
	// 			})
	// 			.catch((error) => {
	// 				// Handle errors if necessary
	// 				console.log(error);
	// 				setDisabled(false); // Make sure to re-enable the button even in case of errors
	// 			});
	// 	}
	// };

	const addVenta = async () => {
		if (disabled) {
			return; // Prevent function execution if already disabled
		}
		if (tarjeta > resultado) {
			setOpenMensaje(true);
			setDisabled(false);
			return;
		}
		if (cambio < 0) {
			setOpenMensajeEfectivo(true);
			setDisabled(false);
			return;
		} else {
			const productsReduce = products.reduce((acc, val) => {
				let obj = acc.find(
					(key) => key.descripcion === val.descripcion
				);
				if (obj) {
					obj.cantidad += val.cantidad;
					obj.precio += val.precio;
					obj.rebaja += val.rebaja;
					obj.descuento += val.descuento;
					obj.importeCompra += val.importeCompra;
				} else {
					acc.push(val);
				}
				return acc;
			}, []);

			const newResult = productsReduce.map((product) => {
				if (product.cantidad > 1) {
					return {
						...product,
						descuento: parseFloat(
							product.descuento / product.cantidad
						).toFixed(1),
					};
				} else {
					return product;
				}
			});

			const addMoreValuesToObject = newResult.map((product, index) => ({
				art_id: product.id,
				clave: product.clave,
				descripcion: product.descripcion,
				cantidad: product.cantidad,
				unidad: product.unidad,
				precioNorSin: (product.precio1 / 1.16).toFixed(2),
				precioNorCon: product.precio1.toFixed(2),
				precioSin: product.precio1 / 1.16,
				precioCon: product.precio1.toFixed(2),
				importeNorSin: product.precio / 1.16,
				importeNorCon: product.precio,
				importeSin: product.precio / 1.16,
				importeCon: product.precio,
				descPorcentaje: product.descuento,
				descTotal: product.rebaja * -1,
				precioCompra: product.precioCompra,
				importeCompra: product.importeCompra,
				sinGravar: 0,
				caracteristicas: product.caracteristicas,
				orden: index,
				cuentaPredial: "",
				movVen: 1,
				movVenC: -2,
				claveProdServ: product.claveProdServ,
			}));

			const newList = [...addMoreValuesToObject];

			try {
				await Axios.post("https:localhost:3001/venta", {
					total: resultado,
					resultadoEnLetra: resultadoEnLetra,
					cambio: cambio,
					descuento: descuentoTotal * -1,
					products: newList,
					efectivo: efectivo,
					tarjeta: tarjeta,
					usu_id: auth.id,
				});

				if (cambio > 0) {
					setOpenVenta(false);
					setCambioCliente(cambio);
					setOpenCambioModal(true);
				} else {
					window.location.reload();
				}
			} catch (error) {
				console.log(error);
				setDisabled(false); // Re-enable in case of errors
			}
		}
	};

	return (
		<div className={styles.pagarModalBackground}>
			<div className={styles.pagarContainer}>
				{openMensaje ? (
					<MensajeTarjetaModal setOpenMensaje={setOpenMensaje} />
				) : openMensajeEfectivo ? (
					<MensajeEfectivoModal
						setOpenMensajeEfectivo={setOpenMensajeEfectivo}
					/>
				) : (
					<>
						<div className={styles.cancelarContainer}>
							<button
								onClick={() => {
									setOpenVenta(false);
								}}
							>
								X
							</button>
						</div>
						<div className={styles.totalPagarContainer}>
							<p>Total a pagar</p>
							{new Intl.NumberFormat("en-US", {
								style: "currency",
								currency: "USD",
							}).format(resultado)}
						</div>
						<div className={styles.pagarEnLetra}>
							{numeroALetras(resultado)}
						</div>
						<div className={styles.formContainer}>
							<div className={styles.cardContainer}>
								<div className={styles.efectivo}>
									<button
										onClick={() =>
											setInputData({
												efectivo: resultado,
												tarjeta: 0,
												tarjeta2: 0,
											})
										}
										type="button"
									>
										efectivo
									</button>
									<input
										className={styles.cardContainerInput}
										name="efectivo"
										type="number"
										autoFocus
										value={inputData.efectivo}
										onFocus={(e) => e.target.select()}
										onChange={handlePayment}
									/>
								</div>
								<div className={styles.tarjeta}>
									<button
										className="tarjetaBtn"
										onClick={() =>
											setInputData({
												efectivo: 0,
												tarjeta: resultado,
												tarjeta2: 0,
											})
										}
										type="button"
									>
										tarjeta
									</button>
									<input
										className={styles.cardContainerInput}
										name="tarjeta"
										type="number"
										value={inputData.tarjeta}
										onFocus={(e) => e.target.select()}
										onChange={handlePayment}
									/>
								</div>
								<div className={styles.tarjeta2}>
									<button
										className="deactivatedBtn"
										type="button"
									>
										tarjeta 2
									</button>
									<input
										className={styles.cardContainerInput}
										name="tarjeta2"
										type="number"
										onFocus={(e) => e.target.select()}
										value={inputData.tarjeta2}
										onChange={handlePayment}
									/>
								</div>
							</div>
							<div className={styles.cambioContainer}>
								<span className={styles.cambio}>
									{cambio >= 0 ? "Cambio" : "Faltan"}
								</span>
								<span
									className={
										cambio < 0
											? styles.cambioEnDineroNegativo
											: styles.cambioEnDinero
									}
								>
									{new Intl.NumberFormat("en-US", {
										style: "currency",
										currency: "USD",
									}).format(cambio)}
								</span>
							</div>
							<div className={styles.aceptarContainer}>
								<button
									type="submit"
									disabled={disabled}
									onClick={() => {
										setDisabled(true);
										addVenta();
									}}
								>
									aceptar
								</button>
							</div>
						</div>
					</>
				)}
			</div>

			{/* {openCambioModal && (
                <CambioModal cambio={cambio}
                    setOpenCambioModal={setOpenCambioModal}
                    setOpenVenta={setOpenVenta} />
            )
            } */}
			{/* {hide ? '' : (<Invoice
                    passDetallev={detallev}
                    passVenta={invoiceTicket}
                    passEfectivoPago={pagoEfectivo}
                    passTarjetaPago={pagoTarjeta} />)
                } */}
		</div>
	);
};

export default PagarModal;
