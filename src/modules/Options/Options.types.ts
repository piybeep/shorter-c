export interface OptionsProps {
	buttons: (
		| {
				label: string;
				type: "text" | "dropdown";
				default: string;
				options: string[];
				userInput?: boolean;
				placeholder?: undefined;
		  }
		| {
				label: string;
				type: "text" | "dropdown";
				placeholder: string;
				default?: undefined;
				options?: undefined;
				userInput?: undefined;
		  }
	)[];
}
