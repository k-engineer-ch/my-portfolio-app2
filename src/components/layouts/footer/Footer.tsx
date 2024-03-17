import React from "react";
import styles from "./footer.module.css";

const Footer = () => {
	return (
		<>
			<div className={styles.footer}>
				<p>Copyright &copy; 2024 My 家計簿. All rights reserved.</p>
				<p>
					Created by{" "}
					<a href="#" target="_blank">
						K-ch
					</a>
				</p>
			</div>
		</>
	);
};

export default Footer;
