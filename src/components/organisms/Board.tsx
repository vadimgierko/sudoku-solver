import Square from "../atoms/Square";
import Input from "../atoms/Input";
import { AllowedValue, Board as IBoard, Mode } from "@/types";

export default function Board({
	board,
	mode,
	setBoard,
}: {
	board: IBoard;
	mode: Mode;
	setBoard: React.Dispatch<React.SetStateAction<IBoard>>;
}) {
	// generate borders for boxes:
	function generateStyle(r: number, c: number) {
		const borderStyle = "3px solid black";
		let style = {};
		// borderTop for:
		if (r === 0 || r === 3 || r === 6) {
			style = {
				...style,
				borderTop: borderStyle,
			};
		}
		// borderBottom for:
		if (r === 8) {
			style = {
				...style,
				borderBottom: borderStyle,
			};
		}
		// borderLeft for:
		if (c === 0 || c === 3 || c === 6) {
			style = {
				...style,
				borderLeft: borderStyle,
			};
		}
		// borderRight for:
		if (c === 8) {
			style = {
				...style,
				borderRight: borderStyle,
			};
		}
		return style;
	}

	function handleInputChange(value: AllowedValue, r: number, c: number) {
		const updatedBoard = [...board];
		updatedBoard[r] = [...updatedBoard[r]];
		updatedBoard[r][c] = {
			...updatedBoard[r][c],
			value: value,
			color: "black",
			potentialValues: [],
			backgroundColor: "",
			potentialCell: true,
		};
		setBoard(updatedBoard);
	}

	if (!board)
		return (
			<p className="board" style={{ color: "red" }}>
				There is no board generated... Wait a moment!
			</p>
		);

	if (mode === "set")
		return (
			<div className="board">
				{board.map((row, r) => (
					<div key={"row-" + r}>
						{row.map((col, c) => {
							const generatedStyle = generateStyle(r, c);
							return (
								<Input
									key={"col-" + c}
									initValue={col.value}
									onChange={(value) => handleInputChange(value, r, c)}
									style={generatedStyle}
								/>
							);
						})}
					</div>
				))}
			</div>
		);

	return (
		<table className="board">
			<tbody>
				{board.map((row, r) => (
					<tr key={"row-" + r}>
						{row.map((col, c) => {
							const generatedStyle = generateStyle(r, c);
							return (
								<Square key={"col-" + c} sq={col} style={generatedStyle} />
							);
						})}
					</tr>
				))}
			</tbody>
		</table>
	);
}
