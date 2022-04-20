import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
// import components here:
import Header from "./components/organisms/Header";
import ToDo from "./components/molecules/ToDo";
import Board from "./components/organisms/Board";
import Button from "./components/atoms/Button";
// import app logic here:
import generateEmptyBoard from "./logic/generateEmptyBoard";

export default function App() {
	const [mode, setMode] = useState("set");
	const [board, setBoard] = useState();
	const [todo, setTodo] = useState();
	const [btnText, setBtnText] = useState();

	// generate board:
	useEffect(() => {
		if (!board || (board && !board.length)) {
			const board = generateEmptyBoard();
			setBoard(board);
			console.log("board was generated:", board);
		}
	}, [board]);

	// init mode:
	useEffect(() => {
		if (mode === "set") {
			const todo = `
      Populate the board with known numbers by inputing them into the cells.
      You can input only one number in one cell. Allowed numbers are: 1, 2, 3, 4, 5, 6, 7, 8, 9.
      When you finish, click the button below the board.
      `;
			setTodo(todo);
			const btnText = "Save the board & run solving algorithm";
			setBtnText(btnText);
		} else {
			setTodo();
			setBtnText();
		}
	}, [mode]);

	return (
		<div className="App">
			<Header />
			<main>
				<ToDo todo={todo} />
				<Board board={board} mode={mode} setBoard={setBoard} />
				{btnText && (
					<Button
						text={btnText}
						onClick={() => {
							setMode("run");
						}}
					/>
				)}
			</main>
		</div>
	);
}
