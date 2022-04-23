export default function Button({ text, style, onClick = (f) => f }) {
	return (
		<button onClick={onClick} style={style}>
			{text}
		</button>
	);
}
