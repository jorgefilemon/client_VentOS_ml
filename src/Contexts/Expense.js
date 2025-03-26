import React, { createContext, useState } from "react";

export const ExpenseContext = createContext();

const ExpenseProvider = ({ children }) => {
	const [expense, setExpense] = useState({
		type: "",
		expenseName: "",
		cantidad: 0,
	});

	return (
		<ExpenseContext.Provider value={{ expense, setExpense }}>
			{children}
		</ExpenseContext.Provider>
	);
};

export default ExpenseProvider;
