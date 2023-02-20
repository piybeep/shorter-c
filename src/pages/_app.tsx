import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { Inter } from "@next/font/google";
import Head from "next/head";
import Script from "next/script";

const rootFont = Inter({
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
				<meta name="description" content="Сервис сокращения ссылок" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			{/* <!-- Google tag (gtag.js) --> */}
			<Script
				src="https://www.googletagmanager.com/gtag/js?id=G-8C357W52ZD"
				strategy="afterInteractive"
			/>

			<Script id="google-analytics" strategy="afterInteractive">
				{`window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-8C357W52ZD');`}
			</Script>

			<Component {...pageProps} />

			<style jsx global>{`
				* {
					font-family: ${rootFont.style.fontFamily};
				}
			`}</style>
		</>
	);
}
