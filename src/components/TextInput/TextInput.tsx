import classNames from "classnames";
import Image from "next/image";
import React from "react";
import s from "./Input.module.scss";
import OpenEye from "../../../public/svg/OpenEye.svg";
import { TextInputProps } from "./TextInput.types";

export function TextInput({
	error,
	label,
	type = "default",
	htmlType = "text",
	...props
}: TextInputProps) {
	const [showPass, setShowPass] = React.useState(false);
	console.log(error);

	return (
		<div className={classNames(s.text_input, props.className)}>
			{label ? <label htmlFor={label}>{label}</label> : ""}
			<input
				id={label}
				className={classNames(s[type], {
					[s.text_input__error]: !!error.length,
				})}
				type={showPass ? "text" : htmlType}
				{...props}
			/>
			{htmlType === "password" ? (
				<button type="button" onClick={() => setShowPass((v) => !v)}>
					{showPass ? (
						<Image alt="" src={OpenEye} />
					) : (
						<svg
							width="18"
							height="10"
							viewBox="0 0 18 10"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M17.7178 0.791325C17.9988 0.966952 18.0843 1.33712 17.9086 1.61812C17.3818 2.46112 16.7557 3.22795 16.0441 3.89589L17.4852 5.33707C17.7196 5.57139 17.7196 5.95129 17.4853 6.1856C17.2509 6.41992 16.871 6.41992 16.6367 6.1856L15.1211 4.67003C14.1658 5.38362 13.0905 5.93471 11.9203 6.28147L12.4594 8.2934C12.5451 8.61348 12.3552 8.94248 12.0351 9.02824C11.715 9.114 11.386 8.92404 11.3003 8.60396L10.7508 6.55327C10.1847 6.6498 9.60026 6.70011 8.99984 6.70011C8.39939 6.70011 7.81488 6.64979 7.24876 6.55325L6.69937 8.60394C6.61362 8.92403 6.28462 9.11399 5.96454 9.02824C5.64445 8.94248 5.45449 8.61349 5.54025 8.29341L6.07927 6.28144C4.90904 5.93466 3.83369 5.38352 2.8783 4.66986L1.3627 6.18546C1.12838 6.41978 0.748485 6.41978 0.514171 6.18546C0.279856 5.95115 0.279856 5.57125 0.514171 5.33694L1.95541 3.89569C1.24387 3.22781 0.61786 2.46104 0.0910379 1.61812C-0.0845889 1.33712 0.000834133 0.966952 0.281836 0.791325C0.562837 0.615698 0.933008 0.701122 1.10863 0.982123C1.68393 1.90259 2.38635 2.71662 3.1942 3.39112C3.20734 3.40115 3.22017 3.41179 3.23264 3.42305C4.81064 4.72657 6.7863 5.50011 8.99984 5.50011C12.3693 5.50011 15.1875 3.70776 16.891 0.982123C17.0667 0.701121 17.4368 0.615698 17.7178 0.791325Z"
								fill="#666666"
							/>
						</svg>
					)}
				</button>
			) : null}
		</div>
	);
}
