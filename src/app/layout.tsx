import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layouts/header/Header";
import Footer from "@/components/layouts/footer/Footer";

export const metadata: Metadata = {
	title: "My 家計簿",
	description: "家計簿アプリ",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ja">
			<body>
				<Header />
				{children}
				<Footer />
			</body>
		</html>
	);
}
