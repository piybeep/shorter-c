import classNames from "classnames";
import { ComponentProps } from "react";
import s from "./Input.module.scss";

export function TextInput({
	error,
	...props
}: ComponentProps<"input"> & { error?: any }) {
	return (
		<input
			className={classNames(s.text_input, props.className, {
				[s.text_input__error]: error,
			})}
			type="text"
			{...props}
		/>
	);
}
