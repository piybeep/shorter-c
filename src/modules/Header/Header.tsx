import classNames from "classnames";
import { ComponentProps } from "react";
import Image from "next/image";

import s from "./Header.module.scss";

import Logo from "../../../public/svg/Logo.svg";

export function HeaderModule(props: ComponentProps<"header">) {
	return (
		<header {...props} className={classNames(s.header, props.className)}>
			<Image src={Logo} alt="" />
			piybeep. Сокращение ссылок
		</header>
	);
}
