"use client";

import * as Expense from "@/features/expense/components/Index";
import styles from "./page.module.css";
import { useExpense } from "@/features/expense/hooks/useExpense";
import { useState } from "react";
import { ExpenseItem } from "@/features/expense/types/ExpenseItem";

export default function Home() {
	const {
		expense,
		updateExpense,
		expenses,
		expenseData,
		setInputValue,
		setAmount,
		setUpdateValue,
		registerExpense,
	} = useExpense();

	const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

	const openUpdateModal = (updateExpense: ExpenseItem) => {
		console.log(expense);
		setUpdateValue(expense);
		setIsUpdateModalOpen(true);
	};

	const closeUpdateModal = () => {
		setIsUpdateModalOpen(false);
	};

	return (
		<>
			<div className={styles.container}>
				<div className={styles.contents}>
					<div className={styles.expensePieChart}>
						<Expense.ExpensePieChart expenseData={expenseData} />
					</div>
					<div className={styles.expenseRegister}>
						<Expense.ExpenseRegister
							expense={expense}
							setInputValue={setInputValue}
							setAmount={setAmount}
							registerExpense={registerExpense}
						/>
					</div>
				</div>
				<div className={styles.content}>
					<Expense.ExpenseList expenses={expenses} openUpdateModal={openUpdateModal} />
				</div>
			</div>

			<Expense.ExpenseUpdate
				isOpen={isUpdateModalOpen}
				closeModal={closeUpdateModal}
				expense={updateExpense} // この値は適切な値に置き換えてください
				setInputValue={setInputValue}
				setAmount={setAmount}
				registerExpense={registerExpense}
			/>
		</>
	);
}
