import { useState } from "react";

import AjustePrecio from "../Components/AjustePrecio/AjustePrecio";
import Nav from "../Components/Nav";
import Descuento from "../Components/Descuento";
// import Menu from "../Components/Menu/Menu";
import Form from "../Components/Form";
import "../../src/App.css";
import { ProductsContext } from "../Contexts/Context";
import { CambioContext } from "../Contexts/CambioContext";
import Table from "../Components/Table";
import Footer from "../Components/Footer";
import PagarModal from "../Components/PagarModal/PagarModal";
import Vales from "../Components/Vales/Vales";
import UsarVale from "../Components/UsarVale/UsarVale";
import DevolucionDinero from "../Components/DevolucionDinero/DevolucionDinero";
import CambioModal from "../Components/CambioModal/CambioModal";

function Home() {
	//1
	const [products, setproducts] = useState([]);
	//2
	const [openModal, setOpenModal] = useState(false);
	//3
	const [openAjuste, setOpenAjuste] = useState(false);
	//4
	const [openVenta, setOpenVenta] = useState(false);
	//5
	const [price, setPrice] = useState(0);
	//6
	const [openGenerarVale, setOpenGenerarVale] = useState(false);
	//7
	const [openUsarVale, setOpenUsarVale] = useState(false);
	//8
	const [openDevolucionDinero, setOpenDevolucionDinero] = useState(false);
	//9
	const [openCambioModal, setOpenCambioModal] = useState(false);

	const [cambioCliente, setCambioCliente] = useState(0);

	// 9 state of modals setModals Active or Not
	const [modalsActive, setModalsActive] = useState(false);

	const resultado = products.reduce(
		(total, currentValue) =>
			(total = total + parseFloat(currentValue.precio)),
		0
	);
	// rebaja
	const rebaja = products.reduce(
		(total, currentValue) =>
			(total = total + parseFloat(currentValue.rebaja)),
		0
	);

	// const { auth } = useContext(AuthContext);
	// // verifies if a session exists

	return (
		<div className="container">
			<ProductsContext.Provider value={{ products, setproducts }}>
				
				<Nav
					setOpenModal={setOpenModal}
					setOpenAjuste={setOpenAjuste}
					setPrice={setPrice}
					setOpenGenerarVale={setOpenGenerarVale}
					setOpenUsarVale={setOpenUsarVale}
					setOpenDevolucionDinero={setOpenDevolucionDinero}
					setModalsActive={setModalsActive}
				/>
				<Form />
				<Table />
				<Footer
					setOpenVenta={setOpenVenta}
					resultado={resultado}
					rebaja={rebaja}
					modalsActive={modalsActive}
					setModalsActive={setModalsActive}
					setOpenModal={setOpenModal}
					setOpenAjuste={setOpenAjuste}
					setOpenDevolucionDinero={setOpenDevolucionDinero}
					setOpenGenerarVale={setOpenGenerarVale}
					setOpenUsarVale={setOpenUsarVale}
					openCambioModal={openCambioModal}
				/>

				{openModal && (
					<Descuento
						closeModal={setOpenModal}
						passPrice={price}
						setModalsActive={setModalsActive}
					/>
				)}

				{openAjuste && (
					<AjustePrecio
						setOpenAjuste={setOpenAjuste}
						passPrice={price}
						setModalsActive={setModalsActive}
					/>
				)}

				<CambioContext.Provider
					value={{ cambioCliente, setCambioCliente }}
				>
					{openVenta && (
						<PagarModal
							setOpenVenta={setOpenVenta}
							resultado={resultado}
							openCambioModal={openCambioModal}
							setOpenCambioModal={setOpenCambioModal}
						/>
					)}

					{openCambioModal && <CambioModal />}
				</CambioContext.Provider>

				{openGenerarVale && (
					<Vales
						resultado={resultado}
						setOpenGenerarVale={setOpenGenerarVale}
						setModalsActive={setModalsActive}
					/>
				)}
				{openUsarVale && (
					<UsarVale
						setOpenUsarVale={setOpenUsarVale}
						setModalsActive={setModalsActive}
					/>
				)}

				{openDevolucionDinero && (
					<DevolucionDinero
						resultado={resultado}
						setOpenDevolucionDinero={setOpenDevolucionDinero}
						setModalsActive={setModalsActive}
					/>
				)}
			</ProductsContext.Provider>
		</div>
	);
}

export default Home;
