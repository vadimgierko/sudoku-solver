import { Board } from "@/types";

export default function generateEmptyBoard() {
	let board: Board = [];

	for (let r = 0; r < 9; r++) {
		board[r] = [];
		for (let c = 0; c < 9; c++) {
			board[r][c] = {
				x: c,
				y: r,
				value: null,
				potentialValues: [],
				color: "",
				backgroundColor: "",
				potentialCell: true,
			};
		}
	}
	return board;
}
