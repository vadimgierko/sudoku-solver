import { useEffect, useState } from "react";

const TEMPLATE_BOARD = [
	[9, 0, 0, 0, 0, 0, 2, 5, 0],
	[0, 0, 4, 0, 0, 7, 0, 9, 0],
	[5, 2, 0, 0, 4, 0, 6, 0, 0],
	[0, 6, 2, 0, 5, 9, 0, 3, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 4, 0, 8, 3, 0, 1, 2, 0],
	[0, 0, 6, 0, 8, 0, 0, 7, 9],
	[0, 7, 0, 6, 0, 0, 3, 0, 0],
	[0, 9, 5, 0, 0, 0, 0, 0, 1],
];

function generateBoardString(board: number[][]) {
	let boardString = "";
	for (let r = 0; r < 9; r++) {
		let rowParagraph = "";
		for (let c = 0; c < 9; c++) {
			rowParagraph = rowParagraph + board[r][c] + "  ";
		}
		boardString = boardString + "<br>" + rowParagraph;
	}
	return boardString;
}

function findEmptyCell(board: number[][]) {
	let cords: { r: number; c: number } | null = null;

	// loop over cells until find empty:
	for (let r = 0; r < 9; r++) {
		for (let c = 0; c < 9; c++) {
			// console.log(r, c, board[r][c]);
			if (!board[r][c]) {
				cords = { r, c };
				return cords;
			}
		}
	}

	return cords;
}

function findEmptyCellValue(
	board: number[][],
	cords: { r: number; c: number }
) {
	let value = 1;

	// check if the value is unique in a row, col & 3*3 box:
	const isUniqueInTheRow = !board[cords.r].includes(value);

	let isUniqueInTheCol = true;
	for (let r = 0; r < 9; r++) {
		if (board[r][cords.c]) {
			isUniqueInTheCol = false;
			return null;
		}
	}

	// const isUniqueInTheBox
	if (isUniqueInTheRow && isUniqueInTheRow) {
		return value;
	} else {
		return null;
	}
}

export default function UseBacktrackingAlgorithmPage() {
	const [isInit, setIsInit] = useState(true);
	const [isSolved, setIsSolved] = useState(false);
	const [board, setBoard] = useState<number[][]>(TEMPLATE_BOARD);
	const boardString = generateBoardString(board);
	const [steps, setSteps] = useState<{ r: number; c: number; value: number }[]>(
		[]
	);

	useEffect(() => {
		if (!isInit) return;

		if (!isSolved) {
			// 1. find nearest empty cell:
			const emptyCellCords = findEmptyCell(board);

			if (!emptyCellCords) {
				console.log("There is no empty cells anymore");
				// TODO: check if sudoku is solved
				setIsInit(false);
				setIsSolved(true);
				return;
			}

			// 2. fulfill the cell with the value:
			const emptyCellValue = findEmptyCellValue(board, emptyCellCords);

			if (emptyCellValue)
				setSteps((steps) => [
					...steps,
					{ ...emptyCellCords, value: emptyCellValue },
				]);
		}
	}, [board, isInit, isSolved]);

	return <p dangerouslySetInnerHTML={{ __html: boardString }} />;
}
