import { useEffect, useState } from "react";
import { ExpenseItem, ExpensePieChartData } from "../types/ExpenseItem";
import { CategoryJapaneseMap } from "@/constants/ExpenseCategories";

export const useExpense = () => {
	const today = new Date().toISOString().split("T")[0];
	/**
	 * 入力中の支出データを保持
	 */
	const [expense, setExpense] = useState<ExpenseItem>({
		date: today,
		amount: 0,
		category: "food",
		memo: "",
	});

	/**
	 * 支出データを保持
	 */
	const [expenses, setExpenses] = useState<ExpenseItem[]>([]);

	/**
	 * 円グラフに表示する支出データを保持
	 */
	const [expenseData, setExpenseData] = useState<[[string, string | number]]>([
		["Category", "Expense Rate"],
	]);

	/**
	 * ローカルストレージに登録されている支出データを取得
	 */
	const getExpensesDateForLocalStrage = () => {
		const storedExpenses = localStorage.getItem("expenses");
		if (storedExpenses) {
			setExpenses(JSON.parse(storedExpenses));

			const parsedExpenses: ExpensePieChartData[] = JSON.parse(storedExpenses);
			const categoryMap = new Map<string, number>();

			parsedExpenses.forEach((expense: ExpensePieChartData) => {
				const category = expense.category;
				const amount = expense.amount;
				if (categoryMap.has(category)) {
					categoryMap.set(
						CategoryJapaneseMap[category],
						categoryMap.get(category)! + amount
					);
				} else {
					categoryMap.set(CategoryJapaneseMap[category], amount);
				}
			});

			const newData: [[string, string | number]] = [["Category", "Expense Rate"]];
			categoryMap.forEach((value, key) => {
				newData.push([key, value]);
			});
			setExpenseData(newData);
		}
	};

	/**
	 * 入力値を設定
	 * @param event
	 */
	const setInputValue = (
		event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	): void => {
		const { name, value } = event.target;

		console.log(`name:${name},value:${value}`);
		setExpense((prevExpense) => ({
			...prevExpense,
			[name]: value,
		}));
	};

	/**
	 * 入力した金額の数値チェックし、設定
	 * @param event
	 */
	const setAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
		const amount = parseFloat(event.target.value);
		setExpense((prevExpense) => ({
			...prevExpense,
			amount: isNaN(amount) ? 0 : amount,
		}));
	};

	/**
	 * ローカルストレージに支出を保存
	 */
	const registerExpense = () => {
		if (typeof localStorage !== "undefined") {
			const existingExpenses = localStorage.getItem("expenses");
			if (existingExpenses) {
				const parsedExpenses: ExpenseItem[] = JSON.parse(existingExpenses);
				const updatedExpenses = [...parsedExpenses, expense];
				localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
			} else {
				localStorage.setItem("expenses", JSON.stringify([expense]));
			}
		} else {
			console.error("Local storage is not supported.");
		}

		setExpense({
			date: today,
			amount: 0,
			category: "food",
			memo: "",
		});

		getExpensesDateForLocalStrage();
	};

	useEffect(() => {
		getExpensesDateForLocalStrage();

		// コンポーネントがマウントされたときの処理
		console.log("Component mounted");

		// cleanup 関数
		return () => {
			console.log("Component unmounted");
		};
	}, []);

	return {
		expense,
		expenses,
		expenseData,
		setInputValue,
		setAmount,
		registerExpense,
		getExpensesDateForLocalStrage,
	};
};
