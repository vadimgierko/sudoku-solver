export default function Button({ text, onClick = (f) => f }) {
	return <button onClick={onClick}>{text}</button>;
}
