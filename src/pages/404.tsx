import { useRouter } from "next/router";
import React from "react";

export default function NotFoundRedirect() {
	const router = useRouter();
	React.useEffect(() => {
		router.replace("/");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return <p>Page not found. Redirecting...</p>;
}
