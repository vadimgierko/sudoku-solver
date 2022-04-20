export default function Square({ sq }) {
	if (!sq) return null;
	return <td>{sq.value}</td>;
}
