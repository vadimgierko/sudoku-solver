import { useEffect, useState } from "react";
import Square from "../atoms/Square";
import Input from "../atoms/Input";

export default function Board({ board, mode, setBoard }) {
	// check if board object was passed through props
	// useEffect(() => {
	//   if (board) {
	//     console.log("Board:", board);
	//   } else {
	//     console.log("No board was passed to the <Board />...");
	//   }
	// }, [board]);

	function handleInputChange(value, r, c) {
		const allowedValues = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
		for (let n = 0; n < allowedValues.length; n++) {
			if (value === allowedValues[n]) {
				const updatedBoard = [...board];
				updatedBoard[r] = [...updatedBoard[r]];
				updatedBoard[r][c] = {
					...updatedBoard[r][c],
					value: value,
				};
				setBoard(updatedBoard);
			}
		}
	}

	if (!board)
		return (
			<p className="board" style={{ color: "red" }}>
				There is no board generated... Wait a moment!
			</p>
		);

	if (mode && mode === "set")
		return (
			<div className="board">
				{board.map((row, r) => (
					<div key={"row-" + r}>
						{row.map((col, c) => (
							<Input
								key={"col-" + c}
								value={col.value}
								onChange={(value) => handleInputChange(value, r, c)}
							/>
						))}
					</div>
				))}
			</div>
		);

	return (
		<table className="board">
			<tbody>
				{board.map((row, r) => (
					<tr key={"row-" + r}>
						{row.map((col, c) => (
							<Square key={"col-" + c} sq={col} />
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
}
