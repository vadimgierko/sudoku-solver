import { useEffect, useState } from "react";

export default function Input({ initValue, onChange = (f) => f }) {
	const [value, setValue] = useState("");

	useEffect(() => {
		if (initValue && initValue.length && initValue !== "") {
			setValue(initValue);
		} else {
			setValue("");
		}
	}, [initValue]);

	useEffect(() => {
		if (value) {
			//=================== check if allowed !!!
			onChange(value);
		}
	}, [value, onChange]);

	return (
		<input
			type="text"
			maxLength="1"
			value={value}
			onChange={(e) => setValue(e.target.value)}
		/>
	);
}
