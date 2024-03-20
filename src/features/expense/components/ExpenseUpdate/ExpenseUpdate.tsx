"use client";

import React, { useState } from "react";
import styles from "./ExpenseUpdate.module.css";

interface ExpenseItem {
	date: string;
	amount: number | string;
	category: string;
	memo: string;
}

interface ExpenseUpdateProps {
	isOpen: boolean;
	closeModal: () => void;
	expense: ExpenseItem;
	setInputValue: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
	setAmount: (event: React.ChangeEvent<HTMLInputElement>) => void;
	registerExpense: () => void;
}

const ExpenseUpdate: React.FC<ExpenseUpdateProps> = ({
	isOpen,
	closeModal,
	expense,
	setInputValue,
	setAmount,
	registerExpense,
}) => {
	const [localExpense, setLocalExpense] = useState<ExpenseItem>({ ...expense });

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = event.target;
		setLocalExpense((prevExpense) => ({
			...prevExpense,
			[name]: value,
		}));
	};

	const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setLocalExpense((prevExpense) => ({
			...prevExpense,
			amount: value === "" ? "" : parseFloat(value),
		}));
	};

	const handleSubmit = () => {
		// registerExpense();
		closeModal();
	};

	return (
		isOpen && (
			<div className={styles.modal}>
				<div className={styles.modalContent}>
					<span className={styles.close} onClick={closeModal}>
						&times;
					</span>
					<div className={styles.content}>
						<div className={styles.title}>
							<h2>支出を修正</h2>
						</div>
						<div className={styles.expenseInput}>
							<div>
								<span>日付</span>
								<input
									type="date"
									name="date"
									value={localExpense.date}
									onChange={handleInputChange}
								/>
							</div>
							<div>
								<span>金額</span>
								<input
									type="text"
									name="amount"
									value={localExpense.amount}
									onChange={handleAmountChange}
								/>
							</div>
							<div>
								<span>カテゴリー</span>
								<select
									name="category"
									value={localExpense.category}
									onChange={handleInputChange}
								>
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
									value={localExpense.memo}
									onChange={handleInputChange}
								/>
							</div>
							<div className={styles.button}>
								<button onClick={handleSubmit}>修正する</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	);
};

export default ExpenseUpdate;
