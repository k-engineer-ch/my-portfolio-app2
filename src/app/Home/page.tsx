"use client";

import * as Expense from "@/features/expense/components/Index";
import styles from "./page.module.css";
import { useExpense } from "@/features/expense/hooks/useExpense";

export default function Home() {
	const { expense, expenses, expenseData, setInputValue, setAmount, registerExpense } =
		useExpense();

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
					<Expense.ExpenseList expenses={expenses} />
				</div>
			</div>
		</>
	);
}
