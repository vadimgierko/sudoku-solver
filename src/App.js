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
import generateBoxes from "./logic/generateBoxes";
// import algorithm logic here:
import solveSudoku from "./algorithm/solveSudoku";
// import template sudoku:
import { TEMPLATE_SUDOKU } from "./templateSudokus";

export default function App() {
	const [mode, setMode] = useState("run"); // change to "set" after tests
	const [board, setBoard] = useState();
	const [todo, setTodo] = useState();

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
			//console.log("run mode board:", JSON.stringify(board));
		}
	}, [mode, board]);

	// generate (& populate) board:
	useEffect(() => {
		if (!board || (board && !board.length)) {
			// generate empty board:
			const board = generateEmptyBoard();
			// generate board from the template:
			//const board = TEMPLATE_SUDOKU;
			setBoard(board);
			console.log("board was generated:", board);
		} else {
			// delete this after tests !!!
			setBoard(TEMPLATE_SUDOKU);
		}
	}, [board]);

	return (
		<div className="App">
			<Header />
			<main>
				<ToDo todo={todo} />
				<Board board={board} mode={mode} setBoard={setBoard} />
				{mode === "set" && (
					<Button
						text="save the board & run solving algorithm"
						onClick={() => {
							setMode("run");
						}}
					/>
				)}
				{mode === "run" && (
					<Button
						text="run algorithm"
						onClick={() => {
							//console.log("run!");
							const solvedSudoku = solveSudoku(board);
							setBoard(solvedSudoku);
						}}
					/>
				)}
			</main>
			<Footer />
		</div>
	);
}
