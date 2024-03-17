import React from "react";
import { Chart } from "react-google-charts";
import styles from "./ExpensePieChart.module.css";

const options = {
	title: "支出内訳",
};

type Props = {
	expenseData: [[string, string | number]];
};

const ExpensePieChart: React.FC<Props> = ({ expenseData }) => {
	return (
		<>
			{expenseData ? (
				<Chart
					chartType="PieChart"
					data={expenseData}
					options={options}
					width={"100%"}
					height={"400px"}
				/>
			) : (
				<div className={styles.item}>
					<span>支出がありません</span>
				</div>
			)}
		</>
	);
};

export default ExpensePieChart;
