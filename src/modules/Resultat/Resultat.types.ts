import { AxiosResponse } from "axios";
import { HTMLAttributes } from "react";

export interface ResultatProps extends HTMLAttributes<HTMLDivElement> {
	response?: AxiosResponse | null;
	isLoading?: boolean;
}
