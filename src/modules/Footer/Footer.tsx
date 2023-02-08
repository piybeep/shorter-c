import classNames from "classnames";
import { ComponentProps } from "react";
import s from "./Footer.module.scss";

export function FooterModule(props: ComponentProps<"footer">) {
	return (
		<footer {...props} className={classNames(s.footer, props.className)}>
			© piybeep, 2023
		</footer>
	);
}
