import { AllowedValue } from "@/types";
import { useState } from "react";

export default function Input({
	initValue,
	onChange,
	style,
}: {
	initValue: AllowedValue | null;
	onChange: (value: AllowedValue) => void;
	style: React.CSSProperties;
}) {
	const [value, setValue] = useState<AllowedValue | null>(initValue);

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const value = e.target.value as AllowedValue;

		const allowedValues: AllowedValue[] = [
			"1",
			"2",
			"3",
			"4",
			"5",
			"6",
			"7",
			"8",
			"9",
		];

		for (let n = 0; n < allowedValues.length; n++) {
			if (value === allowedValues[n]) {
				setValue(value);
				onChange(value);
			}
		}
	}

	return (
		<input
			type="text"
			maxLength={1}
			value={value || ""}
			onChange={(e) => handleChange(e)}
			style={style}
		/>
	);
}
