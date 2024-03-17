import React from "react";
import { ExpenseItem } from "../../types/ExpenseItem";
import styles from "./ExpenseRegister.module.css";

interface Props {
	expense: ExpenseItem;
	setInputValue: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
	setAmount: (event: React.ChangeEvent<HTMLInputElement>) => void;
	registerExpense: () => void;
}

const ExpenseRegister: React.FC<Props> = ({
	expense,
	setInputValue,
	setAmount,
	registerExpense,
}) => {
	return (
		<>
			<div className={styles.content}>
				<div className={styles.title}>
					<h2>支出を登録</h2>
				</div>
				<div className={styles.expenseInput}>
					<div>
						<span>日付</span>
						<input
							type="date"
							name="date"
							value={expense.date}
							onChange={setInputValue}
						/>
					</div>
					<div>
						<span>金額</span>
						<input
							type="text"
							name="amount"
							value={expense.amount}
							onChange={setAmount}
						/>
					</div>
					<div>
						<span>カテゴリー</span>
						<select name="category" value={expense.category} onChange={setInputValue}>
							<option value="food">食費</option>
							<option value="transportation">交通費</option>
							<option value="entertainment">娯楽</option>
							<option value="utilities">公共料金</option>
							<option value="others">その他</option>
						</select>
					</div>
					<div>
						<span>メモ</span>
						<input
							type="text"
							name="memo"
							value={expense.memo}
							onChange={setInputValue}
						/>
					</div>
					<div className={styles.button}>
						<button onClick={registerExpense}>登録する</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default ExpenseRegister;
