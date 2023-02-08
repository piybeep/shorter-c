import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { Source_Code_Pro } from "@next/font/google";

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
			<Component {...pageProps} />
			<style jsx global>{`
				* {
					font-family: ${rootFont.style.fontFamily};
				}
			`}</style>
		</>
	);
}
