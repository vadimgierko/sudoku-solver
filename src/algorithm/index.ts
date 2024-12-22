import { Board, Coords, Step } from "../types";

function findEmptyCell(board: Board) {
	let coords: Coords | null = null;

	// loop over cells until find empty:
	for (let r = 0; r < 9; r++) {
		for (let c = 0; c < 9; c++) {
			// console.log(r, c, board[r][c]);
			if (!board[r][c]) {
				coords = { r, c };
				console.log("Empty cell found:", coords);
				return coords;
			}
		}
	}

	return coords;
}

function findCellValue(board: Board, cords: Coords, potentialValue = 1) {
	if (potentialValue > 9) return null;

	// check if the value is unique in a row, col & 3*3 box:
	const isUniqueInTheRow = !board[cords.r].includes(potentialValue);

	//================ isUniqueInTheCol =======================
	let isUniqueInTheCol = true;
	for (let r = 0; r < 9; r++) {
		if (board[r][cords.c] === potentialValue) {
			isUniqueInTheCol = false;
			break;
		}
	}

	//================ isUniqueInTheBox =======================
	// 0-2; 3-5; 6-8
	const boxRs = cords.r < 3 ? [0, 1, 2] : cords.r < 6 ? [3, 4, 5] : [6, 7, 8];
	const boxCs = cords.c < 3 ? [0, 1, 2] : cords.c < 6 ? [3, 4, 5] : [6, 7, 8];
	let box: number[] = [];
	for (let r = 0; r < 3; r++) {
		for (let c = 0; c < 3; c++) {
			box = [...box, board[boxRs[r]][boxCs[c]]];
		}
	}
	const isUniqueInTheBox = !box.includes(potentialValue);
	//===================================================

	if (isUniqueInTheRow && isUniqueInTheCol && isUniqueInTheBox) {
		console.log("Found potential value for", cords, potentialValue);
		return potentialValue;
	} else {
		// increase potentialValue & check:
		return findCellValue(board, cords, potentialValue + 1);
	}
}

/**
 * If coords were passed, generate solution (step) for these cords,
 * if no coords => generate solution (step) for nearest empty cell,
 * return step or undefined
 */
function generateStep(board: Board, potentialValue: number, coords?: Coords) {
	const cellCords = coords || findEmptyCell(board);

	if (!cellCords) {
		console.log("There is no cell coords to work with...");
		return undefined;
	}

	const cellValue = findCellValue(board, cellCords, potentialValue);

	if (!cellValue) {
		console.log("No cell value found... Dead end...");
		// go to the prev step & ++ the value
		// return generateStep(board, potentialValue++, coords)
		return;
	}

	const step: Step = { coords: cellCords, value: cellValue };
	return step;
}

const algorithm = {
	findEmptyCell,
	findCellValue,
	generateStep,
};

export default algorithm;
