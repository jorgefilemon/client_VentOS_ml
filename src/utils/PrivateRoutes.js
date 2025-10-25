import { Outlet, Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import Axios from "axios";

const PrivateRoutes = () => {
	const { auth, setAuth } = useContext(AuthContext);

	const [authorized, setAuthorized] = useState(null);
	useEffect(() => {
		const verify = async () => {
			try {
				const res = await Axios.get("https://localhost:3001/verify", {
					withCredentials: true, // Ensure credentials (cookies) are sent
				});

				const data = res.data;

				// Update the authentication state with the response data
				setAuth((prev) => ({
					...prev,
					logged: data.logged,
					id: data.usu_id,
					name: data.nombre,
					mercadoConnection: data.connected,
				}));

				// Update authorization status based on the response
				data.logged ? setAuthorized(true) : setAuthorized(false);
			} catch (err) {
				console.error("Error during verification:", err); // Log the error for debugging
				setAuthorized(false);
			}
		};

		verify();
	}, [setAuth]); // Ensure setAuth is included in the dependency array if it's coming from props or context

	if (authorized === null) {
		return null;
	}
	// Prevents creating back-stack entries for /login on redirects.
	return authorized ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoutes;
