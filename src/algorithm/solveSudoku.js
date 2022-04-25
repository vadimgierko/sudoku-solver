import findNumber from "./findNumber";
import orderNumbers from "./orderNumbers";

export default function solveSudoku(board, emptyCellsFromPrevIteration) {
	let solvedSudoku = [...board];
	// order numbers in order of appearance
	// (this will minimize the number of algorithm loops)
	const orderedNumbers = orderNumbers(board);
	// iterate through sorted numbers & search for each number
	orderedNumbers.forEach(
		(number) => (solvedSudoku = findNumber(number, solvedSudoku))
	);
	console.log(
		"Algorithm has iterated through all ordered numbers:",
		orderedNumbers
	);
	// check if all cells have values assigned,
	// push cells without values into an array
	let cellsWithoutValue = [];
	solvedSudoku.forEach((row) => {
		row.forEach((cell) => {
			!cell.value && cellsWithoutValue.push({ x: cell.x, y: cell.y });
		});
	});

	// check, if there are values missing
	if (cellsWithoutValue.length) {
		// if true, check if those values are equal to passed missing values from previous iteration:
		// if true, stop the algorithm - there will be no more discovered numbers - sudoku cannot be solved
		// if not, run algorithm again
		if (
			emptyCellsFromPrevIteration &&
			emptyCellsFromPrevIteration.length === cellsWithoutValue.length
		) {
			// if the length of emptyCellsFromPrevIteration & cellsWithoutValue are equal
			// that means that they are the same
			// there will be no more discovered numbers - sudoku cannot be solved
			// stop algorithm
			const message =
				"Empty cells passed from prev iteration are the same as empty values from this iteration... That means that this sudoku is too hard too solve for this algorithm or maybe there is a mistake in the board...";
			console.log(message);
			alert(message);
		} else {
			// empty cells from previous iteration are different from empty cells in this iteration,
			// so run algorithm again, until all the values will be discovered
			console.log("There are still numbers to discover. Run algorithm again!");
			solvedSudoku = solveSudoku(solvedSudoku, cellsWithoutValue);
		}
	} else {
		console.log("All the numbers were discovered. Sudoku is solved!");
	}
	return solvedSudoku;
}
