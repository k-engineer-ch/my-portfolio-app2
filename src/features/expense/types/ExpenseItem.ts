/**
 * 支出登録項目の型
 */
export interface ExpenseItem {
	date: string;
	amount: number;
	category: string;
	memo: string;
}

/**
 * 円グラフ用の型
 */
export interface ExpensePieChartData {
	amount: number;
	category: string;
}
