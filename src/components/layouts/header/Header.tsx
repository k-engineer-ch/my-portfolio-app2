import Link from "next/link";
import React from "react";
import styles from "./header.module.css";

const Header = () => {
	return (
		<>
			<header className={styles.header}>
				<div className={styles.upperPart}>
					<div className={styles.title}>My 家計簿</div>
				</div>
				<div className={styles.lowerPart}>
					<nav className={styles.nav}>
						<ul>
							<li>
								<Link href="/Home">ホーム</Link>
							</li>
							<li>
								<Link href="/">家計簿</Link>
							</li>
							<li>
								<Link href="/">レポート</Link>
							</li>
							<li>
								<Link href="/">設定</Link>
							</li>
						</ul>
					</nav>
				</div>
			</header>
		</>
	);
};

export default Header;
