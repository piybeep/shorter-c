import React from "react";
import axios, { AxiosError, AxiosResponse } from "axios";

export function useShortLink() {
	const [data, setData] = React.useState<AxiosResponse<{
		token: string;
	}> | null>(null);
	const [error, setError] = React.useState<AxiosError<{
		message: string;
	}> | null>(null);
	const [isLoading, setIsLoading] = React.useState(false);

	const send = (url: string) => {
		setData(null);
		setIsLoading(true);
		axios
			.post("http://localhost:3085/api/tokens", { url })
			// .get(`https://clck.ru/--?url=${link}`)
			.then((response) => setData(response))
			.catch((error) => setError(error))
			.finally(() => setIsLoading(false));
	};

	return { data, error, isLoading, send };
}
