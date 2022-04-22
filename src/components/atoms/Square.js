export default function Square({ sq, style }) {
	if (!sq) return null;
	return (
		<td
			style={{ ...style, color: sq.color, backgroundColor: sq.backgroundColor }}
		>
			{sq.value}
		</td>
	);
}
