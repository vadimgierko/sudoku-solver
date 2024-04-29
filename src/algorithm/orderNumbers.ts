import { Board, Cell } from "@/types";

export default function orderNumbers(board: Board) {
	const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
	// find all known values:
	let knownValues: Cell["value"][] = [];
	board.forEach((row) =>
		row.forEach((cell) => {
			if (cell.value) {
				knownValues.push(cell.value);
			}
		})
	);
	// create an array with objects for every number (1-9)
	// to store a number of appereances of every number
	let numbersAndTheirNum: { number: string; num: number }[] = [];
	numbers.forEach((number) =>
		numbersAndTheirNum.push({
			number: number,
			num: 0,
		})
	);
	// count a number of appereances of every known number in sudoku
	// and assign it to apropriate numbers objects in numbersAndTheirNum
	knownValues.forEach((value) =>
		numbersAndTheirNum.forEach((numObject, n) => {
			if (value === numObject.number) {
				numbersAndTheirNum[n] = {
					...numbersAndTheirNum[n],
					num: numbersAndTheirNum[n].num + 1,
				};
			}
		})
	);
	// order numbers in order of appearance
	// (this will minimize the number of algorithm loops)
	// ommit numbers which appears 9 times,
	// because it means, that all of those numbers are discovered
	let orderedNumbers: string[] = [];
	for (let i = 8; i >= 0; i--) {
		numbersAndTheirNum.forEach((number) => {
			if (number.num === i) {
				orderedNumbers.push(number.number);
			}
		});
	}
	return orderedNumbers;
}
