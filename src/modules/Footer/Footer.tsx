import classNames from "classnames";
import Link from "next/link";
import { ComponentProps } from "react";
import s from "./Footer.module.scss";

export function FooterModule(props: ComponentProps<"footer">) {
	return (
		<footer {...props} className={classNames(s.footer, props.className)}>
			©{" "}
			<Link href={"https://piybeep.com"} target="_blank">
				piybeep.com
			</Link>
			, 2023
		</footer>
	);
}
