import styles from "./corteCaja.module.css";

const CorteCajaPanel = ({ corte, expense, expenseTotal }) => {
	const currencyFormatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	});
	return (
		<>
			<div className={styles.corteCajaTablesFlex}>
				{/* VENTAS */}
				<div className={styles.tableContainer}>
					<h3>Ventas</h3>
					<table>
						{/* <thead>
							<tr>
								<th>Concepto</th>
								<th>Monto</th>
							</tr>
						</thead> */}
						<tbody>
							<tr>
								<td>Efectivo</td>
								<td>
									{currencyFormatter.format(corte.efectivo)}
								</td>
							</tr>
							<tr>
								<td>Tarjeta</td>
								<td>
									{currencyFormatter.format(corte.tarjeta)}
								</td>
							</tr>
							<tr>
								<td>Devolucion</td>
								<td>
									{currencyFormatter.format(
										corte.cambioCliente
									)}
								</td>
							</tr>
						</tbody>
					</table>
					<div className={styles.corteTotal}>
						{currencyFormatter.format(corte.total)}
					</div>
				</div>

				{/* GASTOS */}

				<div className={styles.expenseContainer}>
					<h3>Gastos</h3>

					<div className={styles.expenseScrollContainer}>
						<table>
							<tbody>
								{expense.map((gasto) => (
									<tr key={gasto.expense_id}>
										<td>{gasto.type}</td>
										<td>{gasto.name}</td>
										<td>
											{currencyFormatter.format(
												gasto.expenseAmount
											)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					<div className={styles.gastoTotal}>
						{currencyFormatter.format(expenseTotal)}
					</div>
				</div>
			</div>
		</>
	);
};

export default CorteCajaPanel;
