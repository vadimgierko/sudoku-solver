import "./App.css";
import { useEffect, useState } from "react";
// import components here:
import Header from "./components/organisms/Header";
import Footer from "./components/organisms/Footer";
import ToDo from "./components/molecules/ToDo";
import Board from "./components/organisms/Board";
import Button from "./components/atoms/Button";
// import app logic here:
import generateEmptyBoard from "./logic/generateEmptyBoard";
// import algorithm logic here:
import solveSudoku from "./algorithm/solveSudoku";
// import template sudoku:
import { TEMPLATE_SUDOKU_0 } from "./template-sudoku/0";
import { TEMPLATE_SUDOKU_1 } from "./template-sudoku/1";
import { TEMPLATE_SUDOKU_2 } from "./template-sudoku/2";

const TEMPLATE_SUDOKUS = [
	TEMPLATE_SUDOKU_0,
	TEMPLATE_SUDOKU_1,
	TEMPLATE_SUDOKU_2,
];

export default function App() {
	const [mode, setMode] = useState("set"); // change to "set" after tests
	const [board, setBoard] = useState();
	const [todo, setTodo] = useState();
	const [templateNum, setTemplateNum] = useState(0);

	// init mode:
	useEffect(() => {
		if (mode === "set") {
			const todo = `
      Populate the board with known numbers by inputing them into the cells.
      You can input only one number in one cell. Allowed numbers are: 1, 2, 3, 4, 5, 6, 7, 8, 9.
      When you finish, click the button below the board.
      `;
			setTodo(todo);
		} else {
			setTodo();
			console.log("run mode board:", JSON.stringify(board));
		}
	}, [mode, board]);

	// generate board:
	useEffect(() => {
		if (!board || (board && !board.length)) {
			// generate empty board:
			const board = generateEmptyBoard();
			setBoard(board);
			console.log("empty board was generated:", board);
		}
	}, [board]);

	return (
		<div className="App">
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
							}}
						/>
						<Button
							text="save the board"
							style={{ backgroundColor: "green", color: "white" }}
							onClick={() => {
								setMode("run");
							}}
						/>
					</div>
				)}
				{mode === "run" && (
					<div className="run-mode-buttons">
						<Button
							text="solve sudoku"
							style={{ backgroundColor: "green", color: "white" }}
							onClick={() => {
								const solvedSudoku = solveSudoku(board);
								setBoard(solvedSudoku);
							}}
						/>
						<Button
							text="set next sudoku"
							onClick={() => {
								setMode("set");
							}}
						/>
					</div>
				)}
			</main>
			<Footer />
		</div>
	);
}
