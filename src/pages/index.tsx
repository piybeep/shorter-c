import React from "react";
import { Toaster } from "react-hot-toast";

import { useShortLink } from "@/hooks";
import { TextInput, Button, ErrorView } from "@/components";
import Resultat from "@/modules/Resultat";
import { FooterModule } from "@/modules/Footer";
import { HeaderModule } from "@/modules/Header";

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
			<HeaderModule />
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
					<Button
						type="submit"
						value="Сократить"
						disabled={isLoading}
					/>
				</form>
				<ErrorView error={errorMessage} />
				<Resultat isLoading={isLoading} response={data} />
			</main>
			<FooterModule />
		</>
	);
}
