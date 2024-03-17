import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "My 家計簿 | 家計簿",
	description: "家計簿アプリ",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <main>{children}</main>;
}
