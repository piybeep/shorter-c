import classNames from "classnames";
import { ComponentProps } from "react";
import s from "./Header.module.scss";

export function HeaderModule(props: ComponentProps<"header">) {
	return (
		<header {...props} className={classNames(s.header, props.className)}>
			Сервис для сокращения ссылок
		</header>
	);
}
