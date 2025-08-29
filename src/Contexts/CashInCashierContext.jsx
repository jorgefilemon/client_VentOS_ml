import { createContext, useContext, useState, useEffect } from "react";

const CashInCashierContext = createContext();

export const CashInCashierProvider = ({ children }) => {
	const [cashInCashier, setCashInCashier] = useState({
		cashAdded: "",
		pullCash: "",
	});

	console.log("cashInCashier", cashInCashier);

	useEffect(() => {
		// Auto-fetch on mount (like after refresh)

		const fetchCash = async () => {
			try {
				// Fetch for cashFloat
				const resFloat = await fetch(
					"https://localhost:3001/cashFloat/cashFloat",
					{
						method: "GET",
						credentials: "include",
					}
				);
				if (!resFloat.ok)
					throw new Error(`cashFloat error! ${resFloat.status}`);
				const dataFloat = await resFloat.json();

				// Fetch for addPull
				const resPull = await fetch(
					"https://localhost:3001/cashFloat/pullCash",
					{
						method: "GET",
						credentials: "include",
					}
				);
				if (!resPull.ok)
					throw new Error(`addPull error! ${resPull.status}`);
				const dataPull = await resPull.json();

				setCashInCashier({
					cashAdded: dataFloat.totalCash,
					pullCash: dataPull.totalCash,
				});
			} catch (err) {
				console.error("Error fetching value:", err);
			}
		};

		fetchCash();
	}, []);

	return (
		<CashInCashierContext.Provider
			value={{ cashInCashier, setCashInCashier }}
		>
			{children}
		</CashInCashierContext.Provider>
	);
};

export const useCashInCashier = () => useContext(CashInCashierContext);
