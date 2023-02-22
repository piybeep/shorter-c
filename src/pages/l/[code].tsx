import { FooterModule } from "@/modules/Footer";
import axios from "axios";
import Link from "next/link";
import Router from "next/router";
import React from "react";

export default function RedirectPage({
	originalUrl,
	hashedPassword,
	error,
}: {
	originalUrl: string;
	hashedPassword?: string;
	error?: any;
}) {
	/* if (hashedPassword) {
		const userPassword = prompt(
			"Переход по данной ссылке возможен только по паролю",
			""
		);

		if (!userPassword) {
			error = "Вы не ввели пароль";
		}
	} */

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
			if (response.data?.originalUrl) {
				res.writeHead(302, {
					Location: response.data?.originalUrl.startsWith("http")
						? response.data?.originalUrl
						: `http://${response.data?.originalUrl}`,
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
			originalUrl: context.query.originalUrl,
			hashedPassword: context.query.hashedPassword,
			error: null,
		},
	};
}
