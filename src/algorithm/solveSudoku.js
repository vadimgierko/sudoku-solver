import findNumber from "./findNumber";

export default function solveSudoku(board) {
	let solvedSudoku = [...board];
	// check the frequency of appearance of each number & sort numbers in ascending order:
	const numbers = ["2"];
	// iterate through sorted numbers & search for each number
	for (let n = 0; n < numbers.length; n++) {
		solvedSudoku = findNumber(numbers[n], solvedSudoku);
	}
	// iterate until there will be no numbers to discover
	return solvedSudoku;
}
