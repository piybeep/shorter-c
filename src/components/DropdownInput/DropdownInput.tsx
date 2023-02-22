import classNames from "classnames";
import s from "./DropdownInput.module.scss";
import { DropdownInputProps } from "./DropdownInput.types";
import React from "react";
import Image from "next/image";
import ArrowUp from "../../../public/svg/ArrowUp.svg";
import ArrowDown from "../../../public/svg/ArrowDown.svg";

export function DropdownInput({
	type = "default",
	error,
	options,
	select,
	setSelect,
	userInput,
	label,
	...props
}: DropdownInputProps) {
	const [selected, setSelected] = React.useState(select);
	const [expanded, setExpanded] = React.useState(false);

	function expand() {
		setExpanded(true);
	}

	function close() {
		setExpanded(false);
	}

	function onSelect(event: any, value?: string) {
		const _value = value ?? event.target.textContent;
		setSelect(_value);
		close();
		setSelected(_value);
	}

	return (
		<div
			tabIndex={0}
			onBlur={close}
			onFocus={expand}
			className={classNames(s.dropdown, props.className)}
		>
			{label ? <label htmlFor={label}>{label}</label> : ""}
			{userInput ? (
				<input
					id={label}
					className={classNames(s.dropdown_input, s[type], {
						[s.dropdown_input__error]: error,
					})}
					{...props}
					placeholder={options[0]}
					value={isNaN(Number(selected)) ? "" : selected}
					onChange={(e) => {
						onSelect(
							null,
							String(
								isNaN(Number(e.target.value))
									? selected
									: e.target.value
							)
						);
					}}
					autoComplete="none"
				/>
			) : (
				<span
					onClick={expand}
					id={label}
					className={classNames(s.dropdown_input, s[type], {
						[s.dropdown_input__error]: error,
					})}
					{...props}
				>
					{selected}
				</span>
			)}
			<button type="button" disabled>
				<svg
					className={classNames(s.arrow_icon, {
						[s.arrow_icon__active]: expanded,
					})}
					width="10"
					height="7"
					viewBox="0 0 10 7"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M1.33325 1.5L5.33325 5.5L9.33325 1.5"
						stroke="#909090"
						strokeWidth="1.3"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</button>
			<ul
				className={classNames({
					[s.show_options]: expanded,
					[s.hide_options]: !expanded,
				})}
			>
				{options.map((opt) => {
					return (
						<li key={opt} onClick={onSelect}>
							{opt}
						</li>
					);
				})}
			</ul>
		</div>
	);
}
