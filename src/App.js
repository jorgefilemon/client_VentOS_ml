import {
	BrowserRouter as Router,
	Routes,
	Route,
	Outlet,
} from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SalidaPage from "./pages/SalidaEfePage";
import SoldPage from "./pages/SoldPage";
import Corte from "./pages/Corte";
import CashFloat from "./pages/CashFloat";

import PrivateRoutes from "./utils/PrivateRoutes";
import { AuthContext } from "../src/Contexts/AuthContext";
import Menu from "./Components/Menu/Menu";
import { CashInCashierProvider } from "../src/Contexts/CashInCashierContext";

function App() {
	const [auth, setAuth] = useState({
		logged: null,
		user: "",
		id: "",
		corteExitoso: false,
		mercadoConn: false,
	});

	// console.log(auth);

	return (
		<Router>
			<AuthContext.Provider value={{ auth, setAuth }}>
				<CashInCashierProvider>
					<Routes>
						<Route path="/login" element={<Login />} />

						<Route path="*" element={<Login />} />
						<Route element={<PrivateRoutes />}>
							<Route
								element={
									<>
										<Menu />
										<Outlet />
									</>
								}
							>
								<Route path="/" element={<Home />} exact />
								<Route
									path="/cashFloat"
									element={<CashFloat />}
								/>
								<Route path="/corte" element={<Corte />} />
								<Route
									path="/salidaEfe"
									element={<SalidaPage />}
								/>
								<Route
									path="/soldPage"
									element={<SoldPage />}
								/>
							</Route>
						</Route>
					</Routes>
				</CashInCashierProvider>
			</AuthContext.Provider>
		</Router>
	);
}

export default App;
