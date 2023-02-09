import { FooterModule } from "@/modules/Footer";
import axios from "axios";
import Link from "next/link";
import Router from "next/router";
import React from "react";

export default function RedirectPage({ code }: { code: string }) {
	const [error, setError] = React.useState("");
	React.useEffect(() => {
		axios
			.get(`https://shrt.piybeep.com/api/tokens/${code}`)
			.then((response) => {
				Router.replace(
					response.data?.url.startsWith("http")
						? response.data?.url
						: `http://${response.data?.url}`
				);
			})
			.catch((err) => {
				if (err?.response?.status == 404) {
					setError("Данная ссылка никуда не ведёт");
				} else {
					console.error(err);
					setError(
						"Произошла ошибка. Повторите попытку или обратитесь к администатору. Приносим свои извинения!"
					);
				}
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (error) {
		return (
			<>
				<main>
					{error}
					<Link style={{ textDecoration: "underline" }} href={"/"}>
						Перейти на главную
					</Link>
				</main>
				<FooterModule />
			</>
		);
	}

	return <p>Redirecting...</p>;
}

export async function getServerSideProps(context: any) {
	const { res } = context;
	if (context.query.code) {
		try {
			const response = await axios.get(
				`https://shrt.piybeep.com/api/tokens/${context.query.code}`
			);
			if (response.data?.url) {
				res.writeHead(302, {
					Location: response.data?.url.startsWith("http")
						? response.data?.url
						: `http://${response.data?.url}`,
				});
				res.end();
			}
		} catch (error) {
			return {
				props: {
					code: context.query.code,
				},
			};
		}
	} else {
		res.writeHead(302, {
			Location: "/",
		});
		res.end();
	}

	return {
		props: {
			code: context.query.code,
		},
	};
}
