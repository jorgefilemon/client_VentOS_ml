//import DatePicker from "react-datepicker";
//import { registerLocale } from "react-datepicker";
import { useContext, useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import "./Menu.css";
//import es from 'date-fns/locale/es';
import { IoHappyOutline } from "react-icons/io5";
import { AuthContext } from "../../Contexts/AuthContext";
import "react-datepicker/dist/react-datepicker.css";
// import moment from "moment";
// import "moment/locale/es";

const Menu = () => {
	const { auth, setAuth } = useContext(AuthContext);
	const [shoeSellsInPeriod, setShoeSellsInPeriod] = useState(null);
	const [daysPeriod, setDaysPeriod] = useState(null);

	// let month = moment().locale("es").format("MMM");
	// month = month.replace(".", "");

	// const dayYear = moment().format("DD/YYYY");

	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await Axios.get(
					"https:localhost:3001/shoeSellsInPeriod",
					{
						withCredentials: true,
					}
				);
				console.log(res);
				setShoeSellsInPeriod(res.data[0].total);
				setDaysPeriod(res.data[0].periodo);
			} catch (err) {
				console.error("Error fetching value:", err);
			}
		};

		fetchData();
	}, []);

	const handleLogout = () => {
		Axios.get("https:localhost:3001/logout", {
			withCredentials: true,
		}).then((res) => {
			setAuth({ logged: false });
			res.data === "cleared cookie" && navigate("/login");
		});
	};

	return (
		<div className="menu-container">
			{/* <div className="dateContainer">{month + "/" + dayYear}</div> */}

			<div className="Menu">
				<NavLink to="/" className="link selected">
					PUNTO VENTA
				</NavLink>
				<NavLink to="/CashFloat" className="link notSelected">
					CAJA
				</NavLink>
				<NavLink to="/corte" className="link notSelected">
					CORTE
				</NavLink>
				<NavLink
					to="/salidaEfe"
					className="link notSelected"
					style={{ borderRight: "1px solid white" }}
				>
					SALIDA EFECTIVO
				</NavLink>
				<NavLink
					to="/soldPage"
					className="link notSelected shoeSellsInPeriod"
					style={{ borderRight: "1px solid white" }}
				>
					<h6>{daysPeriod}</h6>
					<p>
						{shoeSellsInPeriod !== null ? shoeSellsInPeriod : "..."}
					</p>
				</NavLink>
			</div>

			<div className="userlogo">
				<IoHappyOutline />
			</div>
			<div className="user">
				<h2>{auth.name}</h2>
			</div>
			<div className="cerrarSesion">
				<button onClick={handleLogout}>Salir</button>
			</div>
		</div>
	);
};

export default Menu;
