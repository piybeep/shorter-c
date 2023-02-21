import classNames from "classnames";
import s from "./Input.module.scss";
import { TextInputProps } from "./TextInput.types";

export function TextInput({
	error,
	label,
	type = "default",
	htmlType = "text",
	...props
}: TextInputProps) {
	return (
		<div className={classNames(s.text_input, props.className)}>
			{label ? <label htmlFor={label}>{label}</label> : ""}
			<input
				id={label}
				className={classNames(s[type], {
					[s.text_input__error]: error,
				})}
				type={htmlType}
				{...props}
			/>
		</div>
	);
}
