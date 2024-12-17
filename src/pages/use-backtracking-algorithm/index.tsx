import { useEffect, useState } from "react";

const TEMPLATE_BOARD: Board = [
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

type Board = number[][];
type Coords = {
	r: number;
	c: number;
};
type Step = { coords: Coords; value: number };

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
function generateStep(
	board: Board,
	// prevStep?: Step,
	potentialValue: number = 1,
	coords?: Coords
) {
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

export default function UseBacktrackingAlgorithmPage() {
	const [isInit, setIsInit] = useState(true);
	const [isSolved, setIsSolved] = useState(false);

	const [board, setBoard] = useState<Board>(TEMPLATE_BOARD);

	const [steps, setSteps] = useState<Step[]>([]);

	// const board: Board = steps.length
	// 	? TEMPLATE_BOARD.map((row, r) =>
	// 			row.map((col, c) => {
	// 				// Find the step that matches the current coordinates
	// 				const step = steps.find((s) => s.coords.c === c && s.coords.r === r);
	// 				return step ? step.value : TEMPLATE_BOARD[r][c];
	// 			})
	// 	  )
	// 	: TEMPLATE_BOARD;

	const boardString = generateBoardString(board);
	//const [currentCoords, setCurrentCoords] = useState(findEmptyCell(board));
	const currentCoords = findEmptyCell(board);

	useEffect(() => {
		if (!isInit) return;

		if (!isSolved) {
			// if this is the first iteration, prevStep will be undefined,
			// next iteration will start, when steps will be updated,
			const prevStep = steps.length ? steps[steps.length - 1] : undefined;

			if (!currentCoords) {
				console.error("No current coords...");
				setIsInit(false);
				setIsSolved(true);
				return;
			}

			const nextStep = generateStep(board, undefined, currentCoords);

			if (nextStep) {
				const updatedBoard: Board = board.map((row, r) =>
					row.map((col, c) =>
						r === currentCoords.r && c === currentCoords.c
							? nextStep.value
							: col
					)
				);
				setBoard(updatedBoard);
				setSteps((s) => [...s, nextStep]);
			} else {
				if (!prevStep) {
					console.error("No next & no prev step...");
					setIsInit(false);
					setIsSolved(true);
					return;
				}
				// return to prev step and update value
				// const lastStepUpdatedValue = findCellValue(
				// 	board,
				// 	{ r: prevStep.coords.r, c: prevStep.coords.c },
				// 	prevStep.value + 1
				// )

				// if (!lastStepUpdatedValue) {
				// 	console.error("Cannot update last step value...");
				// 	setIsInit(false)
				// 	setIsSolved(true)
				// 	return
				// }
				// discard prevStep
				const updatedBoard: Board = board.map((row, r) =>
					row.map((col, c) =>
						r === prevStep.coords.r && c === prevStep.coords.c ? 0 : c
					)
				);

				// const updatedSteps: Step[] = steps.map((s, i) =>
				// 	i === steps.length - 1 ? { ...s, value: findCellValue(updatedBoard, {r: prevStep.coords.r, c: prevStep.coords.c}, prevStep.value + 1) } : s
				// );

				// setSteps(updatedSteps);
			}
		}
	}, [board, currentCoords, isInit, isSolved, steps]);

	useEffect(() => {
		console.log("steps", steps);
	}, [steps]);

	return <p dangerouslySetInnerHTML={{ __html: boardString }} />;
}
