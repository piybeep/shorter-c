import React from "react";
import axios, { AxiosError, AxiosResponse } from "axios";

export function useShortLink() {
	const [data, setData] = React.useState<AxiosResponse<{
		short_link: string;
	}> | null>(null);
	const [error, setError] = React.useState<AxiosError<{
		message: string;
	}> | null>(null);
	const [isLoading, setIsLoading] = React.useState(false);

	const send = (link: string) => {
		setIsLoading(true);
		axios
			.post("", { link })
			.then((response) => setData(response))
			.catch((error) => setError(error))
			.finally(() => setIsLoading(false));
	};

	return { data, error, isLoading, send };
}
