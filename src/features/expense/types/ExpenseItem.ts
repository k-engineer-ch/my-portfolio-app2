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

export interface ExpenseData {
	id: number;
	date: string; // ISO 8601形式の文字列
	amount: string; // 文字列である金額
	category: string;
	memo: string;
	created_at: string; // ISO 8601形式の文字列
}
