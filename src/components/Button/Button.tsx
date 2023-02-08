import classNames from "classnames";
import { ComponentProps } from "react";
import s from "./Button.module.scss";

export function Button({ value, ...props }: ComponentProps<"button">) {
	return (
		<button className={classNames(s.btn, props.className)} {...props}>
			{value}
		</button>
	);
}
