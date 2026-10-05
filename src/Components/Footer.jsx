import { useContext, useEffect } from "react";
import { ProductsContext } from "../Contexts/Context";
import "./footer.css";
import { AuthContext } from "../Contexts/AuthContext";

const Footer = ({
	setOpenVenta,
	setOpenModal,
	setOpenAjuste,
	resultado,
	rebaja,
	modalsActive,
	setModalsActive,
	openCambioModal,
	setOpenCambioModal,
	setOpenDevolucionDinero,
	setOpenGenerarVale,
	setOpenUsarVale,
}) => {
	const { products } = useContext(ProductsContext);
	const { auth } = useContext(AuthContext);

	useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.keyCode === 27) {
				if (modalsActive) {
					setModalsActive(false);
					setOpenModal(false);
					setOpenAjuste(false);
					setOpenDevolucionDinero(false);
					setOpenGenerarVale(false);
					setOpenUsarVale(false);
				}

				if (
					resultado >= 0 &&
					products.length > 0 &&
					modalsActive === false &&
					!openCambioModal
				) {
					setOpenVenta((prevOpenVenta) => !prevOpenVenta);
				}

				if (openCambioModal) {
					window.location.reload();
				}
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [
		resultado,
		products,
		setOpenVenta,
		modalsActive,
		openCambioModal,
		setModalsActive,
		setOpenAjuste,
		setOpenCambioModal,
		setOpenDevolucionDinero,
		setOpenGenerarVale,
		setOpenModal,
		setOpenUsarVale,
	]);

	return (
		<div className="footer-container">
			<div className="status_container">
				<p>Mercado Libre</p>
				<h4
					className={
						auth.mercadoConnection
							? "mercadoConectado"
							: "mercadoSinConexion"
					}
				>
					{auth.mercadoConnection ? "Conectado" : "No conectado"}
				</h4>
			</div>
			<div className="button-container">
				<button
					onClick={
						resultado >= 0 && products.length > 0
							? () => [setOpenVenta(true)]
							: null
					}
				>
					vender
				</button>
			</div>
			<div className="total-container">
				<div className={`rebaja ${rebaja < 0 ? "rosa" : "gris"}`}>
					{new Intl.NumberFormat("en-US", {
						style: "currency",
						currency: "USD",
					}).format(rebaja)}
				</div>
				<div className="precio">
					{new Intl.NumberFormat("en-US", {
						style: "currency",
						currency: "USD",
					}).format(resultado)}
				</div>
			</div>
		</div>
	);
};

export default Footer;
