// CashFloatAgregar.js
import styles from "./addPullCashTable.module.css";

const AddPullCashTable = ({ cashFloat, denominationMap, mode }) => {
	return (
		<>
			<div className={styles.cashFloat_table_container}>
				{cashFloat.length > 0 && (
					<table>
						<thead>
							<tr>
								<th
									className={
										mode === "guardar" ? styles.guardar : ""
									}
								>
									Valor
								</th>
								{cashFloat.map((cash) => (
									<th
										key={cash.cashMov_id}
										className={
											mode === "guardar"
												? styles.guardar
												: ""
										}
									>
										{cash.fecha.slice(11, 16)}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{denominationMap.map(({ label, key }) => (
								<tr key={key}>
									<td
										className={
											mode === "guardar"
												? styles.guardar
												: ""
										}
									>
										{label}
									</td>
									{cashFloat.map((cash, colIndex) => (
										<td
											className={
												mode === "guardar"
													? styles.guardar
													: ""
											}
											key={`${key}-${colIndex}`}
										>
											{Number(cash[key]) === 0
												? ""
												: cash[key]}
										</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>
		</>
	);
};

export default AddPullCashTable;
