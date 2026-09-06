import { Outlet, Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import Axios from "axios";

const PrivateRoutes = () => {
	const { auth, setAuth } = useContext(AuthContext);

	const [authorized, setAuthorized] = useState(null);

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();

		const verify = async () => {
			try {
				const res = await Axios.get("https://localhost:3001/verify", {
					withCredentials: true,
					signal: controller.signal,
				});

				if (!isMounted) {
					return;
				}

				const data = res.data;

				setAuth((prev) => ({
					...prev,
					logged: data.logged,
					id: data.usu_id,
					name: data.nombre,
					mercadoConnection: data.connected,
				}));

				setAuthorized(Boolean(data.logged));
			} catch (err) {
				if (!isMounted || Axios.isCancel(err) || err.name === "CanceledError") {
					return;
				}

				console.error("Error during verification:", err);

				if (auth.logged) {
					setAuthorized(true);
					setAuth((prev) => ({
						...prev,
						mercadoConnection: false,
					}));
					return;
				}

				setAuthorized(false);
			}
		};

		verify();

		return () => {
			isMounted = false;
			controller.abort();
		};
	}, [auth.logged, setAuth]);

	if (authorized === null) {
		return null;
	}

	return authorized ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoutes;
