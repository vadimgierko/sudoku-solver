import "./style.css";
import { TEMPLATE_SUDOKUS } from "./TEMPLATE_DATA";
import { Board, Coords, Step } from "./types";

const BOARD_EL = document.getElementById("app");

//================ ALGO LOGIC ====================//

function generateBoardString(board: Board) {
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

function renderBoard(board: Board) {
	// const boardString = generateBoardString(board);

	if (!BOARD_EL) return console.error("No BOARD_EL");

	BOARD_EL.innerHTML = `
	<table>
		<tbody>
			${board.map(
				(row, r) =>
					"<tr>" +
					row.map((col, c) => "<td>" + (col ? col : "") + "</td>") +
					"</tr>"
			)}
		</tbody>
	</table>
	`;
}

//====================================================

const SOLVE_BUTTON = document.getElementById("solve-button");

//================= INIT STATE =======================//

let mode: "set" | "run" = "set";
let isSolved = false;
let templateNum = 1;
let steps: Step[] = [];
let stepsCount = 0;
let board = TEMPLATE_SUDOKUS[templateNum];
let currentCoords: Coords | null = findEmptyCell(board);
let value = 1;

//=============== END OF INIT STATE ===================//

//================= SOLVING LOOP ======================//
function handleSolveButtonClick() {
	/**
	 * step = one fulfilled field
	 */
	function solveStep() {
		if (isSolved) return;

		const prevStep = steps.length ? steps[steps.length - 1] : undefined;

		if (!currentCoords) {
			console.error("No current coords...");
			console.log("Final steps count:", stepsCount);
			isSolved = true;
			return;
		}

		const nextStep = generateStep(board, value, currentCoords);

		if (nextStep) {
			board = board.map((row, r) =>
				row.map((col, c) =>
					r === currentCoords?.r && c === currentCoords.c ? nextStep.value : col
				)
			);
			steps = [...steps, nextStep];
			currentCoords = findEmptyCell(board);
			value = 1; // Reset value
			stepsCount += 1;

			renderBoard(board);
		} else {
			if (!prevStep) {
				console.error("No next & no prev step...");
				isSolved = true;
				return;
			}
			board = board.map((row, r) =>
				row.map((col, c) =>
					r === prevStep.coords.r && c === prevStep.coords.c ? 0 : col
				)
			);
			steps = steps.filter((s, i) => i !== steps.length - 1);
			value = prevStep.value + 1;
			stepsCount += 1;

			currentCoords = findEmptyCell(board);

			renderBoard(board);
		}

		// Use setTimeout to schedule the next step asynchronously
		setTimeout(solveStep, 0);
	}

	solveStep();
}

function addListenerToSolveButton() {
	if (!SOLVE_BUTTON) {
		return console.error("There is no SOLVE_BUTTON...");
	}

	SOLVE_BUTTON.addEventListener("click", handleSolveButtonClick);
}

// function removeEventListenerFromSolveButton() {
// 	if (!SOLVE_BUTTON) {
// 		return console.error("There is no SOLVE_BUTTON...");
// 	}

// 	SOLVE_BUTTON.removeEventListener("click", handleSolveButtonClick);
// }

// initial run:
renderBoard(board);
addListenerToSolveButton();
