import { useEffect, useState } from "react";

export default function Input({
	initValue,
	onChange,
	style,
}: {
	initValue: string;
	onChange: (value: string) => void;
	style: React.CSSProperties;
}) {
	const [value, setValue] = useState("");

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const value = e.target.value;

		const allowedValues = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

		for (let n = 0; n < allowedValues.length; n++) {
			if (value === allowedValues[n]) {
				setValue(value);
			}
		}
	}

	useEffect(() => {
		if (initValue && initValue.length && initValue !== "") {
			setValue(initValue);
		} else {
			setValue("");
		}
	}, [initValue]);

	useEffect(() => {
		if (value) {
			onChange(value);
		}
	}, [value, onChange]);

	return (
		<input
			type="text"
			maxLength={1}
			value={value}
			onChange={(e) => handleChange(e)}
			style={style}
		/>
	);
}
