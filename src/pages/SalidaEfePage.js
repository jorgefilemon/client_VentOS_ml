import SalidaEfe from "../Components/SalidaEfe/SalidaEfe";
import ExpenseListProvider from "../Contexts/ExpenseList";
import ExpenseProvider from "../Contexts/Expense";

const SalidaPage = () => {
	return (
		<ExpenseListProvider>
			<ExpenseProvider>
				<div className="container">
					<SalidaEfe />
				</div>
			</ExpenseProvider>
		</ExpenseListProvider>
	);
};

export default SalidaPage;
