import { Cell } from "@/types";

export default function Square({
	sq,
	style,
}: {
	sq: Cell;
	style: React.CSSProperties;
}) {
	if (!sq) return null;
	return (
		<td
			style={{ ...style, color: sq.color, backgroundColor: sq.backgroundColor }}
		>
			{sq.value}
		</td>
	);
}
