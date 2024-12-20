import "./style.css";
import typescriptLogo from "./typescript.svg";
import viteLogo from "/vite.svg";
import { setupCounter } from "./counter.ts";

const TEMPLATE_SUDOKUS: Board[] = [
	[
		[9, 0, 0, 0, 0, 0, 2, 5, 0],
		[0, 0, 4, 0, 0, 7, 0, 9, 0],
		[5, 2, 0, 0, 4, 0, 6, 0, 0],
		[0, 6, 2, 0, 5, 9, 0, 3, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 4, 0, 8, 3, 0, 1, 2, 0],
		[0, 0, 6, 0, 8, 0, 0, 7, 9],
		[0, 7, 0, 6, 0, 0, 3, 0, 0],
		[0, 9, 5, 0, 0, 0, 0, 0, 1],
	],
	[
		[0, 0, 6, 0, 4, 0, 2, 0, 0],
		[0, 7, 0, 0, 0, 0, 0, 1, 0],
		[9, 5, 0, 8, 0, 1, 0, 3, 4],
		[8, 6, 0, 0, 0, 0, 0, 9, 7],
		[0, 0, 0, 1, 0, 3, 0, 0, 0],
		[5, 2, 0, 0, 0, 0, 0, 4, 3],
		[3, 8, 0, 9, 0, 5, 0, 6, 2],
		[0, 4, 0, 0, 0, 0, 0, 5, 0],
		[0, 0, 5, 0, 2, 0, 7, 0, 0],
	],
	[
		[0, 8, 0, 5, 0, 1, 0, 3, 0],
		[0, 0, 6, 0, 0, 0, 7, 0, 0],
		[0, 5, 0, 0, 4, 0, 0, 9, 0],
		[0, 1, 3, 9, 0, 6, 4, 7, 0],
		[0, 0, 4, 0, 0, 0, 6, 0, 0],
		[0, 2, 7, 4, 0, 3, 8, 5, 0],
		[0, 7, 0, 0, 5, 0, 0, 4, 0],
		[0, 0, 8, 0, 0, 0, 5, 0, 0],
		[0, 3, 0, 2, 0, 8, 0, 6, 0],
	],
];

//==================== TYPES =====================//

type Board = number[][];
type Coords = {
	r: number;
	c: number;
};
type Step = { coords: Coords; value: number };

//================= STATE =======================//

let mode: "set" | "run" = "set";
let templateNum = 0;
let isInit = false;
let isSolved = false;

let stepsCount = 0;
let board = TEMPLATE_SUDOKUS[templateNum];
let steps: Step[] = [];
let value = 1;
let boardString = generateBoardString(board);
let currentCoords = findEmptyCell(board);

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
	let cords: Coords | null = null;

	// loop over cells until find empty:
	for (let r = 0; r < 9; r++) {
		for (let c = 0; c < 9; c++) {
			// console.log(r, c, board[r][c]);
			if (!board[r][c]) {
				cords = { r, c };
				console.log("Empty cell found:", cords);
				return cords;
			}
		}
	}

	return cords;
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
	const boardString = generateBoardString(board);
	return (document.querySelector<HTMLDivElement>("#app")!.innerHTML =
		boardString);
}

renderBoard(board);

//====================================================

const solveButton = document.getElementById("solve-button");

function solveSudoku() {
	console.log("solving sudoku...");

	if (isSolved) return console.log("sudoku is solved!");

	// if this is the first iteration, prevStep will be undefined,
	// next iteration will start, when steps will be updated,
	const prevStep = steps.length ? steps[steps.length - 1] : undefined;

	if (!currentCoords) {
		console.error("No current coords...");
		isInit = false;
		isSolved = true;
		console.log("Final steps count:", stepsCount);
		return;
	}

	const nextStep = generateStep(board, value, currentCoords);

	if (nextStep) {
		const updatedBoard: Board = board.map((row, r) =>
			row.map((col, c) =>
				r === currentCoords?.r && c === currentCoords.c ? nextStep.value : col
			)
		);
		board = updatedBoard;
		steps = [...steps, nextStep];
		value = 1;
		stepsCount = stepsCount + 1;

		renderBoard(board);
		solveSudoku();
	} else {
		if (!prevStep) {
			console.error("No next & no prev step...");
			isInit = false;
			isSolved = true;
			return;
		}
		// return to prev step and update value
		// discard prevStep
		const updatedBoard: Board = board.map((row, r) =>
			row.map((col, c) =>
				r === prevStep.coords.r && c === prevStep.coords.c ? 0 : col
			)
		);
		const updatedSteps = steps.filter((s, i) => i !== steps.length - 1);
		const updatedPotentialValue = prevStep.value + 1;

		board = updatedBoard;
		steps = updatedSteps;
		value = updatedPotentialValue;
		stepsCount = stepsCount + 1;

		currentCoords = findEmptyCell(board);

		renderBoard(board);
		solveSudoku();

		// !!! coords remain the same, even they are recalculated,
		// because last step is discarded & cell value = 0 again !!!
	}
}

solveButton?.addEventListener("click", () => solveSudoku());

// document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
//   <div>
//     <a href="https://vite.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://www.typescriptlang.org/" target="_blank">
//       <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
//     </a>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite and TypeScript logos to learn more
//     </p>
//   </div>
// `;

// setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);
