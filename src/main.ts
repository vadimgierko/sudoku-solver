// import "./style.css";
import { TEMPLATE_SUDOKUS } from "./TEMPLATE_DATA";
import { Board, Coords, Step } from "./types";
import algorithm from "./algorithm";

const BOARD_EL = document.getElementById("app");

const SOLVE_BUTTON = document.createElement("button"); //document.getElementById("solve-button");
SOLVE_BUTTON.id = "solve-button";
SOLVE_BUTTON.textContent = "solve";

function generateInitBoardHTMLString(board: Board): string {
	let rowsHTMLString = "";
	// populate rowsHTMLString
	board.forEach((row, r) => {
		let colsHTMLString = "";
		row.forEach(
			(col, c) =>
				(colsHTMLString +=
					`<td id=${"row-" + r + "-col-" + c}>` + (col ? col : "") + "</td>")
		);
		rowsHTMLString += `<tr id=${"row-" + r}>` + colsHTMLString + "</tr>";
	});

	const boardHTMLString = `
	<table>
		<tbody>
			${rowsHTMLString}
		</tbody>
	</table>
	`;

	return boardHTMLString;
}

function updateBoardCell(r: number, c: number, value: number) {
	const CELL_EL = document.getElementById(`row-${r}-col-${c}`);

	if (!CELL_EL) return console.error("No such cell... r, c:", r, c);

	CELL_EL.textContent = value.toString();
}

function renderInitBoard(board: Board) {
	if (!BOARD_EL) return console.error("No BOARD_EL");

	BOARD_EL.innerHTML = generateInitBoardHTMLString(board);

	BOARD_EL.appendChild(SOLVE_BUTTON);
}

//================= INIT STATE =======================//

// let mode: "set" | "run" = "set";
let isSolved = false;
let templateNum = 0;
let steps: Step[] = [];
let stepsCount = 0;
let board = TEMPLATE_SUDOKUS[templateNum];
let currentCoords: Coords | null = algorithm.findEmptyCell(board);
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

		const nextStep = algorithm.generateStep(board, value, currentCoords);

		if (nextStep) {
			board = board.map((row, r) =>
				row.map((col, c) =>
					r === currentCoords?.r && c === currentCoords.c ? nextStep.value : col
				)
			);
			steps = [...steps, nextStep];
			currentCoords = algorithm.findEmptyCell(board);
			value = 1; // Reset value
			stepsCount += 1;

			updateBoardCell(nextStep.coords.r, nextStep.coords.c, nextStep.value);
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
			steps.pop();
			//steps = steps.filter((s, i) => i !== steps.length - 1);
			value = prevStep.value + 1;
			stepsCount += 1;

			currentCoords = algorithm.findEmptyCell(board);

			updateBoardCell(prevStep.coords.r, prevStep.coords.c, 0);
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

// initial run:
renderInitBoard(board); // after we will fulfill particular fields only
addListenerToSolveButton();
