import Router from "next/router";
import React from "react";

export default function RedirectPage({ code }: { code: string }) {
	Router.replace(`https://clck.ru/${code}`);

	return <>Redirecting...</>;
}

export async function getServerSideProps(context: any) {
	if (context.query.code) {
		const { res } = context;

		res.writeHead(301, { Location: `https://clck.ru/${context.query.code}` });
		res.end();
	}

	return {
		props: {
			code: context.query.code,
		},
	};
}
