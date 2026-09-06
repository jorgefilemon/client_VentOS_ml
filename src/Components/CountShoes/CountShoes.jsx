import { useState, useEffect } from "react";
import Axios from "axios";
import styles from "./countShoes.module.css";

const CountShoes = () => {
	const [shoeSells, setShoeSells] = useState(null);
	const [months, setMonths] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await Axios.get(
					"https://localhost:3001/shoeSellsInTwoMonths",
					{
						withCredentials: true,
					}
				);
				setShoeSells(res.data);

				// Extract the months from the first row of data
				if (res.data.length > 0) {
					const monthKeys = Object.keys(res.data[0])
						.filter((key) => key !== "period")
						.sort((a, b) => b - a); // Sort months in descending order
					setMonths(monthKeys);
				}
			} catch (err) {
				console.error("Error fetching value:", err);
			}
		};

		fetchData();
	}, []);

	if (!shoeSells) {
		return <div className={styles.cargandoMensaje}>Cargando...</div>;
	}

	// Flatten the data to create a single array of rows
	const flattenedData = [];
	months.forEach((month) => {
		shoeSells.forEach((row) => {
			flattenedData.push({
				month: month,
				period: row.period,
				quantity: row[month],
			});
		});
	});

	// Slice the array to get only the first 3 rows
	const limitedData = flattenedData.slice(0, 5);

	return (
		<div className={styles.countShoesTableContainer}>
			<table>
				<thead>
					<tr>
						<th>mes</th>
						<th>periodo</th>
						<th>vendidos</th>
					</tr>
				</thead>
				<tbody>
					{limitedData.map((row, index) => (
						<tr key={index}>
							<td>{row.month}</td>
							<td>{row.period}</td>
							<td>{row.quantity}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default CountShoes;
