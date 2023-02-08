import classNames from "classnames";
import s from "./ErrorView.module.scss";
import { ComponentProps } from "react";

export function ErrorView({
	error,
	...props
}: ComponentProps<"span"> & { error?: string }) {
	return (
		<span
			className={classNames(s.error_text, props.className, {
				[s.error_text__show]: error,
			})}
		>
			{error}
		</span>
	);
}
