"use client";

import * as Expense from "@/features/expense/components/Index";
import styles from "./page.module.css";

export default function CashFlow() {
	return (
		<>
			<div className={styles.container}>
				<div className={styles.section}>
					<div className={styles.header}>
						<button>前月</button>
						<span>2024/03/01～2024/03/31</span>
						<button>次月</button>
					</div>
					<div className={styles.content}>
						<span className={styles.subTitle}>支出</span>
						<div className={styles.chart}>支出の円グラフ</div>
					</div>
				</div>
				<div className={styles.section}>
					<div className={styles.header}>
						<button>前月</button>
						<span>2023/09/01～2024/03/31</span>
						<button>次月</button>
					</div>
					<div className={styles.content}>
						<span className={styles.subTitle}>月次推移</span>
						<div className={styles.chart}>
							過去6か月間の支出推移棒グラフ
							<Expense.ExpenseStackedPercentageColumnChart />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
