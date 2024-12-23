// import "./style.css";
import { TEMPLATE_SUDOKUS } from "./TEMPLATE_DATA";
import { Step } from "./types";
import algorithm from "./algorithm";
import { appendChildToApp, getApp, removeChildFromApp } from "./components/app";
import { createSolveButtonEl } from "./components/solveButton";
import { createBoard, rerenderBoard } from "./components/board";
import { createLoadNextTemplateButton } from "./components/loadNextTemplateButton";

//======================== BOARD ==============================//
// this enables updating only cell's textContent without getting this el by id first = optimization
let CACHED_BOARD_CELLS_ELS: (HTMLElement | null)[][] = [];

function getAndCacheBoardCellsEls() {
	// clear cache
	CACHED_BOARD_CELLS_ELS = []
	// update cache
	for (let r = 0; r < 9; r++) {
		CACHED_BOARD_CELLS_ELS.push([]);
		for (let c = 0; c < 9; c++) {
			const CELL_EL = document.getElementById(`row-${r}-col-${c}`);
			if (CELL_EL) {
				CACHED_BOARD_CELLS_ELS[r].push(CELL_EL)
			}
		}
	}
}

function updateCachedBoardCellTextContent(r: number, c: number, value: number) {
	const CELL_EL = CACHED_BOARD_CELLS_ELS[r][c];

	if (CELL_EL) {
		CELL_EL.textContent = value ? value.toString() : ""
	} else {
		console.error("no such cell... cannot update...")
	}
}

//================= INIT STATE =======================//
let isSolved = false;
let templateNum = 1;
let steps: Step[] = [];
let stepsCount = 0;
let board = TEMPLATE_SUDOKUS[templateNum];
let currentCoords = algorithm.findEmptyCell(board);
let value = 1;

/**
 * ❗ should be used after templateNum was changed manually ❗
 */
function resetStateExceptTemplateNum() {
	isSolved = false;
	steps = [];
	stepsCount = 0;
	board = TEMPLATE_SUDOKUS[templateNum];
	currentCoords = algorithm.findEmptyCell(board);
	value = 1;
}

//==================== SOLVING LOOP =========================//
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

			updateCachedBoardCellTextContent(nextStep.coords.r, nextStep.coords.c, nextStep.value);
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

			updateCachedBoardCellTextContent(prevStep.coords.r, prevStep.coords.c, 0);
		}

		// Use setTimeout to schedule the next step asynchronously
		setTimeout(solveStep);
	}

	solveStep();
}

//====================== INITIAL RUN ====================//
function initRun() {
	const APP_EL = getApp();

	if (!APP_EL) return;

	const BOARD = createBoard();
	appendChildToApp(BOARD);
	rerenderBoard(board);

	const SOLVE_BUTTON = createSolveButtonEl(() => {
		handleSolveButtonClick();
		appendChildToApp(LOAD_NEXT_TEMPLATE_BUTTON);
		removeChildFromApp(SOLVE_BUTTON);
	});

	const LOAD_NEXT_TEMPLATE_BUTTON = createLoadNextTemplateButton(() => {
		templateNum = templateNum === TEMPLATE_SUDOKUS.length - 1 ? 0 : templateNum + 1;
		resetStateExceptTemplateNum();
		rerenderBoard(board);
		getAndCacheBoardCellsEls();
		appendChildToApp(SOLVE_BUTTON);
		removeChildFromApp(LOAD_NEXT_TEMPLATE_BUTTON)
	});

	appendChildToApp(SOLVE_BUTTON);

	getAndCacheBoardCellsEls();
}

initRun();