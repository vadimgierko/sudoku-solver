export default function Button({
	text,
	style,
	onClick,
}: {
	text: string;
	style?: React.CSSProperties;
	onClick: () => void;
}) {
	return (
		<button onClick={onClick} style={style}>
			{text}
		</button>
	);
}
