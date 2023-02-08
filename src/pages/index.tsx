import React from "react";
import Head from "next/head";
import classNames from "classnames";
import { useShortLink } from "@/hooks";
import TextInput from "@/components/TextInput";
import Button from "@/components/Button";
import toast, { Toaster } from "react-hot-toast";
import { API_URL } from "@/constants";

export default function Home() {
	const { send, data, isLoading, error } = useShortLink();
	const [errorMessage, setErrorMessage] = React.useState("");
	const [userInput, setUserInput] = React.useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (userInput.trim() == "") {
			return setErrorMessage("Вы не ввели ссылку");
		}

		send(userInput);
	};

	React.useEffect(() => {
		if (error) {
			if (error?.response?.data?.message) {
				setErrorMessage(error?.response?.data?.message);
			} else {
				setErrorMessage(error?.message);
			}
		}
	}, [error]);

	return (
		<>
			<Head>
				<title>Сокращение ссылок</title>
				<meta name="description" content="Link Shortening by danyatochkaru" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.svg" />
			</Head>
			<header>Сокращение ссылок</header>
			<main>
				<Toaster
					position="bottom-center"
					toastOptions={{
						style: { color: "#ececec", background: "#323237" },
					}}
				/>
				<form className="user_input" onSubmit={handleSubmit}>
					<TextInput
						error={errorMessage}
						onChange={(data) => {
							setUserInput(data.target.value);
							setErrorMessage("");
						}}
						onBlur={() => setErrorMessage("")}
						value={userInput}
						placeholder="Вставьте вашу ссылку сюда"
					/>
					<Button type="submit" value="Сократить" disabled={isLoading} />
				</form>
				<span
					className={classNames("error_text", {
						error_text__show: errorMessage,
					})}
				>
					{errorMessage}
				</span>
				<div className="user_output">
					{data ? (
						<>
							<p>Ваша ссылка готова! Нажмите на неё, чтобы скопировать</p>
							<span
								onClick={() => {
									navigator.clipboard
										.writeText(
											`${API_URL}/l/${
												data.data.split("/")[data.data.split("/").length - 1]
											}`,
										)
										.then(() => toast.success("Копирование прошло успешно"))
										.catch((err) => {
											toast.error("Копирование не удалось");
											console.error(err);
										});
								}}
							>
								<samp>
									{API_URL}/l/
									{data.data.split("/")[data.data.split("/").length - 1]}
								</samp>
								<svg
									width="14"
									height="14"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 512 512"
								>
									<path d="M502.6 70.63l-61.25-61.25C435.4 3.371 427.2 0 418.7 0H255.1c-35.35 0-64 28.66-64 64l.0195 256C192 355.4 220.7 384 256 384h192c35.2 0 64-28.8 64-64V93.25C512 84.77 508.6 76.63 502.6 70.63zM464 320c0 8.836-7.164 16-16 16H255.1c-8.838 0-16-7.164-16-16L239.1 64.13c0-8.836 7.164-16 16-16h128L384 96c0 17.67 14.33 32 32 32h47.1V320zM272 448c0 8.836-7.164 16-16 16H63.1c-8.838 0-16-7.164-16-16L47.98 192.1c0-8.836 7.164-16 16-16H160V128H63.99c-35.35 0-64 28.65-64 64l.0098 256C.002 483.3 28.66 512 64 512h192c35.2 0 64-28.8 64-64v-32h-47.1L272 448z" />
								</svg>
							</span>
						</>
					) : (
						""
					)}
				</div>
			</main>
			<footer>2023 danyatochkaru</footer>
		</>
	);
}
