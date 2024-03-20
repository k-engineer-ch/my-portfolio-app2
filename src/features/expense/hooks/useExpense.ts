import { useEffect, useState } from "react";
import { ExpenseItem, ExpensePieChartData, ExpenseData } from "../types/ExpenseItem";
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

	const [updateExpense, setUpdateExpense] = useState<ExpenseItem>({
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

	const setUpdateValue = (value: ExpenseItem) => {
		setUpdateExpense({
			...updateExpense,
			date: value.date,
			amount: value.amount,
			category: value.category,
			memo: value.memo,
		});
	};

	/**
	 * ローカルストレージに支出を保存
	 */
	const registerExpense = () => {
		// if (typeof localStorage !== "undefined") {
		// 	const existingExpenses = localStorage.getItem("expenses");
		// 	if (existingExpenses) {
		// 		const parsedExpenses: ExpenseItem[] = JSON.parse(existingExpenses);
		// 		const updatedExpenses = [...parsedExpenses, expense];
		// 		localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
		// 	} else {
		// 		localStorage.setItem("expenses", JSON.stringify([expense]));
		// 	}
		// } else {
		// 	console.error("Local storage is not supported.");
		// }
		fetch("http://localhost:8080/v1/addExpense", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				date: expense.date,
				amount: expense.amount.toString(),
				category: expense.category,
				memo: expense.memo,
			}),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json();
			})
			.then((data) => {
				console.log(data);

				setExpense({
					date: today,
					amount: 0,
					category: "food",
					memo: "",
				});

				getAllExpenses();
			})
			.catch((error) => {
				console.error("There was a problem with the fetch operation:", error);
			});
	};

	const url = "http://localhost:8080/v1/";
	const getAllExpenses = async () => {
		await fetch(url + "getAllExpenses")
			.then((response) => response.json())
			.then((json) => {
				const formattedData = json.data.map((item: ExpenseItem) => ({
					date: new Date(item.date).toISOString().split("T")[0], // 日付の整形
					amount: parseInt(item.amount.toString()),
					category: item.category,
					memo: item.memo,
					// amount: parseFloat(item.amount.toString()).toLocaleString("ja-JP", {
					// 	style: "currency",
					// 	currency: "JPY",
					// }), // 金額のフォーマット
				}));

				const sortedData = formattedData.sort(
					(a: { date: string | number | Date }, b: { date: string | number | Date }) => {
						// aとbの日付を比較して新しい順に並び替える
						return new Date(b.date).getTime() - new Date(a.date).getTime();
					}
				);

				setExpenses(sortedData);

				const categoryMap = new Map<string, number>();
				formattedData.forEach((expense: ExpensePieChartData) => {
					const category = expense.category;
					const amount = expense.amount;
					if (categoryMap.has(category)) {
						categoryMap.set(category, categoryMap.get(category)! + amount);
					} else {
						categoryMap.set(category, amount);
					}
				});

				const newData: [[string, string | number]] = [["Category", "Expense Rate"]];
				categoryMap.forEach((value, key) => {
					newData.push([CategoryJapaneseMap[key], value]);
				});
				setExpenseData(newData);
			})
			.catch((error) => console.error("Error:", error));
	};

	useEffect(() => {
		// getExpensesDateForLocalStrage();
		getAllExpenses();

		// // コンポーネントがマウントされたときの処理
		// console.log("Component mounted");

		// // cleanup 関数
		// return () => {
		// 	console.log("Component unmounted");
		// };
	}, []);

	return {
		expense,
		updateExpense,
		expenses,
		expenseData,
		setInputValue,
		setAmount,
		setUpdateValue,
		registerExpense,
		getExpensesDateForLocalStrage,
		getAllExpenses,
	};
};
