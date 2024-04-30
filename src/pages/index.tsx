import Head from "next/head";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

// import app logic here:
import generateEmptyBoard from "@/logic/generateEmptyBoard";
// import algorithm logic here:
import solveSudoku from "@/algorithm/solveSudoku";
// import components here:
import Header from "@/components/organisms/Header";
import Footer from "@/components/organisms/Footer";
import ToDo from "@/components/molecules/ToDo";
import Board from "@/components/organisms/Board";
import Button from "@/components/atoms/Button";

// import template sudoku:
import { TEMPLATE_SUDOKU_0 } from "@/template-sudoku/0";
import { TEMPLATE_SUDOKU_1 } from "@/template-sudoku/1";
import { TEMPLATE_SUDOKU_2 } from "@/template-sudoku/2";
import { Board as IBoard, Mode } from "@/types";

const EMPTY_BOARD = generateEmptyBoard();

const TEMPLATE_SUDOKUS: IBoard[] = [
	TEMPLATE_SUDOKU_0,
	TEMPLATE_SUDOKU_1,
	TEMPLATE_SUDOKU_2,
];

const TODO_FOR_SET_MODE = `
Populate the board with the numbers from sudoku you want to solve by inputing them into the cells.
You can input only one number in one cell. Allowed numbers are: 1, 2, 3, 4, 5, 6, 7, 8, 9.
When you finish, click the "save board" button below the board.
`;

const TODO_FOR_RUN_MODE = `
Click "solve sudoku" or "set next sudoku" button below the board.
`;

export default function Home() {
	const [mode, setMode] = useState<Mode>("set");
	const [board, setBoard] = useState<IBoard>(EMPTY_BOARD);
	const [todo, setTodo] = useState(TODO_FOR_SET_MODE);
	const [templateNum, setTemplateNum] = useState(0);

	if (!board) return null;

	return (
		<>
			<Head>
				<title>Sudoku Solver by Vadim Gierko</title>
				<meta
					name="description"
					content="This app solves an easy sudoku. Input known numbers into the board or load the template sudoku & press Solve Sudoku."
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div className="layout">
				<Header />
				<main>
					<ToDo todo={todo} />
					<Board board={board} mode={mode} setBoard={setBoard} />
					{mode === "set" && (
						<div className="set-mode-buttons">
							<Button
								text="load template sudoku"
								onClick={() => {
									const template = TEMPLATE_SUDOKUS[templateNum];
									console.log("template:", template);
									setBoard(template);
									const next =
										templateNum === TEMPLATE_SUDOKUS.length - 1
											? 0
											: templateNum + 1;
									setTemplateNum(next);
									setMode("run");
									setTodo(TODO_FOR_RUN_MODE);
								}}
							/>
							<Button
								text="save the board"
								style={{ backgroundColor: "green", color: "white" }}
								onClick={() => {
									setMode("run");
									setTodo(TODO_FOR_RUN_MODE);
								}}
							/>
						</div>
					)}
					{mode === "run" && (
						<div className="run-mode-buttons">
							<Button
								text="set next sudoku"
								onClick={() => {
									setMode("set");
									setBoard(EMPTY_BOARD);
									setTodo(TODO_FOR_SET_MODE);
								}}
							/>
							<Button
								text="solve sudoku"
								style={{ backgroundColor: "green", color: "white" }}
								onClick={() => {
									const solvedSudoku = solveSudoku(board, []);
									setBoard(solvedSudoku);
								}}
							/>
						</div>
					)}
				</main>
				<Footer />
			</div>
		</>
	);
}
