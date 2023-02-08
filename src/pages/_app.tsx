import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { Source_Code_Pro } from "@next/font/google";
import Head from "next/head";

const rootFont = Source_Code_Pro({
	weight: ["400"],
	subsets: ["cyrillic", "latin"],
	fallback: ["sans-serif"],
	adjustFontFallback: false,
	preload: true,
});

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Сокращение ссылок</title>
				<meta
					name="description"
					content="Link Shortening by danyatochkaru"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Component {...pageProps} />
			<style jsx global>{`
				* {
					font-family: ${rootFont.style.fontFamily};
				}
			`}</style>
		</>
	);
}
