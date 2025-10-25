import style from "./LoginForm.module.css";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext";
import ConnectingModal from "./ConnectingModal";
import CorteExitoso from "./CorteExitoso";

import { useRef, useEffect, useState, useContext } from "react";

const LoginForm = () => {
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const { auth, setAuth } = useContext(AuthContext);

	const navigate = useNavigate();
	const refInput = useRef();

	useEffect(() => {
		refInput.current.focus();
	}, []);

	const login = () => {
		try {
			// Check if online before attempting MercadoLibre redirection
			if (navigator.onLine) {
				window.location.href =
					"https://auth.mercadolibre.com.mx/authorization?response_type=code&client_id=3814276840650694&redirect_uri=https://localhost:3001/callback";
			} else {
				// Navigate to local home page if offline
				navigate("/");
			}
		} catch (error) {
			console.error("Error during login:", error.message);
			// Fallback to local home page in case of an error
			navigate("/");
		}
	};

	// submit // login authenticate
	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const { data } = await Axios.post(
				"https://localhost:3001/login",
				{
					userName: userName,
					password: password,
				},
				{ withCredentials: true }
			);

			if (data.message) {
				setErrorMessage(data.message);
			} else {
				setAuth((prevAuth) => ({
					...prevAuth,
					logged: data.logged,
				}));

				// setMercadoConn(true);
				login();
			}
		} catch (error) {
			console.error("Error during login:", error);
		}
	};

	return (
		<div className={style.formContainer}>
			<div className={style.logo}>
				<p>Lolita</p>
			</div>
			<div className={style.loginForm}>
				<form onSubmit={handleSubmit}>
					<input
						id="username"
						onChange={(e) => setUserName(e.target.value)}
						ref={refInput}
						type="text"
						placeholder="Usuario"
						autoComplete="off"
					/>

					<input
						id="password"
						onChange={(e) => setPassword(e.target.value)}
						type="password"
						placeholder="Contraseña"
						autoComplete="off"
					/>
					<div className={style.auth}>
						<p>{errorMessage}</p>
					</div>
					<button type="submit">Ingresar</button>
				</form>
			</div>
			{auth.mercadoConn && <ConnectingModal />}
			{auth.corteExitoso && <CorteExitoso />}
		</div>
	);
};

export default LoginForm;
