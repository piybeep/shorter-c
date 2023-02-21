import { TextInput } from "@/components";
import { DropdownInput } from "@/components/DropdownInput";
import React from "react";
import { OptionsProps } from "./Options.types";

export function Options({ buttons }: OptionsProps) {
	const [dropdownList, setDropdownList] = React.useState<{
		[label: string]: string;
	}>(
		buttons
			.filter((b) => b.type === "dropdown")
			.reduce(
				(prev, curr) => ({
					...prev,
					[curr.label]: curr.default as string,
				}),
				{}
			)
	);

	return (
		<>
			{buttons.map((btn) => {
				switch (btn.type) {
					case "dropdown": {
						return (
							<DropdownInput
								key={btn.label}
								label={btn.label}
								options={btn.options!}
								select={dropdownList[btn.label]}
								userInput={btn.userInput}
								setSelect={(value) =>
									setDropdownList((list) => ({
										...list,
										[btn.label]: value,
									}))
								}
								type="small"
							/>
						);
					}
					case "text": {
						return (
							<TextInput
								key={btn.label}
								label={btn.label}
								htmlType="password"
								placeholder={btn.placeholder}
								type="small"
								autoComplete="off"
							/>
						);
					}
					default: {
						return <></>;
					}
				}
			})}
		</>
	);
}
