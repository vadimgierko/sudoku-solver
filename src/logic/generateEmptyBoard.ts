import { Board, Cell, Row } from "@/types";

export default function generateEmptyBoard() {
	let board: Board = [];

	for (let r = 0; r < 9; r++) {
		board[r] = [];
		for (let c = 0; c < 9; c++) {
			const cell: Cell = {
				x: c,
				y: r,
				value: "",
				potentialValues: [],
				color: "",
				backgroundColor: "",
				potentialCell: true,
			};

			board[r][c] = cell;
		}
	}
	return board;
}
