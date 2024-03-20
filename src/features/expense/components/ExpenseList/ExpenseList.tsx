import React from "react";
import { ExpenseItem } from "../../types/ExpenseItem";
import { CategoryJapaneseMap } from "@/constants/ExpenseCategories";
import styles from "./ExpenseList.module.css";

const formatDate = (dateString: string): string => {
	const date = new Date(dateString);
	const year = date.getFullYear();
	const month = (date.getMonth() + 1).toString().padStart(2, "0");
	const day = date.getDate().toString().padStart(2, "0");
	return `${year}/${month}/${day}`;
};

type Props = {
	expenses: ExpenseItem[];
	openUpdateModal: (expense: ExpenseItem) => void;
};

const ExpenseList: React.FC<Props> = ({ expenses, openUpdateModal }) => {
	return (
		<>
			<div className={styles.content}>
				<div className={styles.title}>
					<h2>支出一覧</h2>
				</div>
				<div>
					{expenses && expenses.length > 0 ? (
						expenses.map((expense, index) => (
							<div className={styles.item} key={index}>
								<span>{formatDate(expense.date)}</span>
								<span>{CategoryJapaneseMap[expense.category]}</span>
								<span>{expense.memo}</span>
								<span>{expense.amount.toLocaleString()}</span>
								<button onClick={() => openUpdateModal(expense)}>編集</button>
								<button>削除</button>
							</div>
						))
					) : (
						<div className={styles.item}>
							<span>支出がありません</span>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default ExpenseList;
