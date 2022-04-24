import findNumber from "./findNumber";

export default function solveSudoku(board) {
	const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
	let solvedSudoku = [...board];
	// check the frequency of appearance of each number & sort numbers in ascending order:
	//
	//iterate through sorted numbers & search for each number
	for (let n = 0; n < numbers.length; n++) {
		solvedSudoku = findNumber(numbers[n], solvedSudoku);
	}
	// check if all cells have values, if not - run algorithm again
	for (let r = 0; r < 9; r++) {
		for (let c = 0; c < 9; c++) {
			if (!solvedSudoku[r][c].value) {
				console.log(
					"There are still values missing... Run the algorithm again!"
				);
				solveSudoku(solvedSudoku);
				// this is tricky...
				// if you'll make an mistake in inputed sudoku
				// or input the sudoku that is impossible to solve
				// this will cause an infinite loop...
				// possible solution: save all missing values & pass it
				// then if sudoku will not be solved again in next loop
				// compare saved missing values =>
				// if they are the same => do not continue the loop ;-)
			}
		}
	}
	// iterate until there will be no numbers to discover
	console.log("Sudoku is solved!");
	return solvedSudoku;
}
