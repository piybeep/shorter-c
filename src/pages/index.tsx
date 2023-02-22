import React from "react";
import { Toaster } from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";

import { useShortLink } from "@/hooks";
import { TextInput, Button, ErrorView } from "@/components";
import Resultat from "@/modules/Resultat";
import { FooterModule } from "@/modules/Footer";
import { HeaderModule } from "@/modules/Header";
import { Options, OptionsProps } from "@/modules/Options";

export default function Home() {
	const { send, data, isLoading, error } = useShortLink();
	const [errorMessage, setErrorMessage] = React.useState("");
	const [userInput, setUserInput] = React.useState("");
	const recaptchaRef = React.createRef<any>();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (userInput.trim() == "") {
			return setErrorMessage("Вы не ввели ссылку");
		}
		send(userInput);
		recaptchaRef.current.execute();
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

	const onReCAPTCHAChange = (captchaCode: any) => {
		if (!captchaCode) {
			setErrorMessage("Вы не решили капчу");
			return;
		}
		send(userInput);
		recaptchaRef?.current.reset();
	};
	const optionButtons: OptionsProps["buttons"] = [
		{
			label: "Время жизни",
			type: "dropdown",
			default: "Не ограничено",
			options: [
				"Не ограничено",
				"5 минут",
				"Час",
				"День",
				"Месяц",
				"Полгода",
				"Год",
			],
		},
		{
			label: "Переходы",
			type: "dropdown",
			default: "Не ограничено",
			userInput: true,
			options: [
				"Не ограничено",
				"1",
				"5",
				"20",
				"50",
				"100",
				"500",
				"1000",
			],
		},
		{
			label: "Ссылка с паролем",
			type: "text",
			placeholder: "Введите пароль",
		},
	];

	return (
		<>
			<HeaderModule />
			<main>
				<form className="user_input" onSubmit={handleSubmit}>
					<ReCAPTCHA
						theme="dark"
						ref={recaptchaRef}
						size="invisible"
						sitekey={
							process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string
						}
						onChange={onReCAPTCHAChange}
					/>
					<div className="form_row">
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
						<Button
							type="submit"
							value="Сократить"
							disabled={isLoading}
						/>
					</div>
					{/* <div className="form_row form_options">
						<Options buttons={optionButtons} />
					</div> */}
				</form>
				<ErrorView error={errorMessage} />
				<Resultat isLoading={isLoading} response={data} />
			</main>
			<FooterModule />
			<Toaster
				position="bottom-center"
				toastOptions={{
					style: { color: "#ececec", background: "#323237" },
				}}
			/>
		</>
	);
}
