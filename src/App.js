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
	const [mode, setMode] = useState("set");
	const [board, setBoard] = useState();
	const [todo, setTodo] = useState();
	const [templateNum, setTemplateNum] = useState(0);

	// init mode:
	useEffect(() => {
		let todo = ``;
		if (mode === "set") {
			todo = `
				Populate the board with the numbers from sudoku you want to solve by inputing them into the cells.
				You can input only one number in one cell. Allowed numbers are: 1, 2, 3, 4, 5, 6, 7, 8, 9.
				When you finish, click the "save board" button below the board.
			`;
			const board = generateEmptyBoard();
			console.log("Empty board was generated.");
			setBoard(board);
		} else {
			todo = `
				Click "solve sudoku" or "set next sudoku" button below the board.
			`;
			//console.log("run mode board:", JSON.stringify(board));
		}
		setTodo(todo);
	}, [mode]);

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
							text="set next sudoku"
							onClick={() => {
								setMode("set");
							}}
						/>
						<Button
							text="solve sudoku"
							style={{ backgroundColor: "green", color: "white" }}
							onClick={() => {
								const solvedSudoku = solveSudoku(board);
								setBoard(solvedSudoku);
							}}
						/>
					</div>
				)}
			</main>
			<Footer />
		</div>
	);
}
