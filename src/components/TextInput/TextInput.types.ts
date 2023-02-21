import { ComponentProps } from "react";

export interface TextInputProps extends ComponentProps<"input"> {
	error?: any;
	type?: "default" | "small" | "large";
	htmlType?: "text" | "url" | "email" | "password" | "search" | "tel";
	label?: string;
}
