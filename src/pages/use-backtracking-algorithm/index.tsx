import Button from "@/components/atoms/Button";
import ToDo from "@/components/molecules/ToDo";
import Header from "@/components/organisms/Header";
import { Mode } from "@/types";
import Head from "next/head";
import { useEffect, useState } from "react";

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
	]
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

const TODO_FOR_SET_MODE = `
Set mode is not implemented yet...
`;

const TODO_FOR_RUN_MODE = `
Click "solve sudoku" or "set next sudoku" button below the board.
`;

export default function UseBacktrackingAlgorithmPage() {
	const [mode, setMode] = useState<Mode>("set");
	const [todo, setTodo] = useState(TODO_FOR_SET_MODE);
	const [templateNum, setTemplateNum] = useState(0);
	const [isInit, setIsInit] = useState(false);
	const [isSolved, setIsSolved] = useState(false);

	const [stepsCount, setStepsCount] = useState(0);

	const [board, setBoard] = useState<Board>(TEMPLATE_SUDOKUS[templateNum]);

	const [steps, setSteps] = useState<Step[]>([]);
	const [value, setValue] = useState(1);

	const boardString = generateBoardString(board);
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
				console.log("Final steps count:", stepsCount);
				return;
			}

			const nextStep = generateStep(board, value, currentCoords);

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
				setValue(1);
				setStepsCount((c) => (c += 1));
			} else {
				if (!prevStep) {
					console.error("No next & no prev step...");
					setIsInit(false);
					setIsSolved(true);
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

				setBoard(updatedBoard);
				setSteps(updatedSteps);
				setValue(updatedPotentialValue);
				setStepsCount((c) => (c += 1));

				// !!! coords remain the same, even they are recalculated, because last step is discarded & cell value = 0 again !!!
			}
		}
	}, [board, currentCoords, isInit, isSolved, steps, stepsCount, value]);

	useEffect(() => {
		console.log("steps", steps);
	}, [steps]);

	return <>
		<Head>
			<title>Sudoku Solver | Backtracking Algorithm</title>
			<meta
				name="author"
				content="Vadim Gierko"
			/>
			<meta
				name="description"
				content="This app solves any given sudoku using backtracking algorithm."
			/>
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<link rel="icon" href="/favicon.ico" />
		</Head>
		<div className="layout">
			<Header
				text="This sub-app is able to solve any sudoku of any level of complexity using my original backtracking algorithm."
			/>
			<main>
				<ToDo todo={todo} />
				{/* <p dangerouslySetInnerHTML={{ __html: boardString }} /> */}

				<table>
					{
						board.map((row, r) =>
							<tr key={`row-${r}`}>
								{
									row.map((col, c) => <td key={`col-${c}`}>{col === 0 ? "" : col}</td>)
								}
							</tr>)
					}
				</table>

				{mode === "set" && (
					<div className="set-mode-buttons">
						<Button
							text="load template sudoku"
							onClick={() => {
								const template = TEMPLATE_SUDOKUS[templateNum];
								console.log("template:", template);
								const next =
									templateNum === TEMPLATE_SUDOKUS.length - 1
										? 0
										: templateNum + 1;
								setTemplateNum(next);
								setMode("run");
								setTodo(TODO_FOR_RUN_MODE);
								//================= reset state:
								setIsInit(false);
								setIsSolved(false);
								setSteps([]);
								setStepsCount(0);
								setBoard(template);
								setValue(1)
							}}
						/>
						{/* <Button
							text="save the board"
							style={{ backgroundColor: "green", color: "white" }}
							onClick={() => {
								setMode("run");
								setTodo(TODO_FOR_RUN_MODE);
							}}
						/> */}
					</div>
				)}
				{mode === "run" && (
					<div className="run-mode-buttons">
						<Button
							text="set next sudoku"
							onClick={() => {
								setMode("set");
								setBoard(TEMPLATE_SUDOKUS[templateNum]);
								setTodo(TODO_FOR_SET_MODE);
							}}
						/>
						<Button
							text="solve sudoku"
							style={{ backgroundColor: "green", color: "white" }}
							onClick={() => {
								setIsInit(true);
							}}
						/>
					</div>
				)}
			</main>

		</div>
	</>
}