import React, { createContext, useState } from "react";

export const ExpenseListContext = createContext();

const ExpenseListProvider = ({ children }) => {
	const [expenseList, setExpenseList] = useState([]);

	return (
		<ExpenseListContext.Provider value={{ expenseList, setExpenseList }}>
			{children}
		</ExpenseListContext.Provider>
	);
};

export default ExpenseListProvider;
