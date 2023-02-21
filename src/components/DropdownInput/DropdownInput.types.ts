import { ComponentProps } from "react";

export interface DropdownInputProps extends ComponentProps<"input"> {
	options: string[];
	select: string;
	setSelect: (value: string) => void;
	error?: any;
	userInput?: boolean;
	label?: string;
	type?: "default" | "small" | "large";
}
