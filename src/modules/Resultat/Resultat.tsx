import toast from "react-hot-toast";
import s from "./Resultat.module.scss";

import { API_URL } from "@/constants";
import { ResultatProps } from "./Resultat.types";
import classNames from "classnames";
import React from "react";

export function ResultatModule({
	response,
	isLoading,
	...props
}: ResultatProps) {
	const [link, setLink] = React.useState("");
	const data = response?.data;

	React.useEffect(() => {
		if (data?.token)
			setLink(
				`${API_URL}/l/${data.token.split("/")[data.token.split("/").length - 1]}`
			);
	}, [data]);

	if (isLoading) return <p>Готовим короткую ссылку...</p>;

	if (!data) return <></>;

	return (
		<div {...props} className={classNames(s.user_output, props.className)}>
			<p>Ваша ссылка готова! Нажмите на неё, чтобы скопировать</p>
			<span
				onClick={() => {
					navigator.clipboard
						.writeText(link)
						.then(() => toast.success("Копирование прошло успешно"))
						.catch((err) => {
							toast.error("Копирование не удалось");
							console.error(err);
						});
				}}
			>
				<samp>{link}</samp>
				<svg
					width="14"
					height="14"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 512 512"
				>
					<path d="M502.6 70.63l-61.25-61.25C435.4 3.371 427.2 0 418.7 0H255.1c-35.35 0-64 28.66-64 64l.0195 256C192 355.4 220.7 384 256 384h192c35.2 0 64-28.8 64-64V93.25C512 84.77 508.6 76.63 502.6 70.63zM464 320c0 8.836-7.164 16-16 16H255.1c-8.838 0-16-7.164-16-16L239.1 64.13c0-8.836 7.164-16 16-16h128L384 96c0 17.67 14.33 32 32 32h47.1V320zM272 448c0 8.836-7.164 16-16 16H63.1c-8.838 0-16-7.164-16-16L47.98 192.1c0-8.836 7.164-16 16-16H160V128H63.99c-35.35 0-64 28.65-64 64l.0098 256C.002 483.3 28.66 512 64 512h192c35.2 0 64-28.8 64-64v-32h-47.1L272 448z" />
				</svg>
			</span>
		</div>
	);
}
