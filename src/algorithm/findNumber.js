import generateBoxes from "../logic/generateBoxes";

// eliminate existing numbers, rows, cols & boxes => find potential cells
// if there is a single potential cell in a box, put the number there
// if the number was put, repeat the whole cycle,
// until there will be no single potential cells in boxes,
// then return the fulfilled board & search for a next number

export default function findNumber(number, board) {
	let updatedBoard = [...board];
	// reset board:
	updatedBoard.forEach((row) => {
		row.forEach((cell) => (cell.potentialCell = true));
	});
	// initiate potential cells array
	let potentialCells = [];
	// eliminate existing numbers:
	updatedBoard.forEach((row) => {
		row.forEach((cell) => {
			if (cell.value) cell.potentialCell = false;
		});
	});
	// eliminate rows & cols:
	updatedBoard.forEach((row) =>
		row.forEach((cell, c) => {
			if (cell.value === number) {
				// block row:
				row.forEach((cell) => (cell.potentialCell = false));
				// block col:
				updatedBoard.forEach((ROW) =>
					ROW.forEach((CELL, C) => {
						if (c === C) CELL.potentialCell = false;
					})
				);
			}
		})
	);
	// eliminate boxes:
	const boxes = generateBoxes();
	// updatedBoard.forEach(row => row.forEach(cell => {
	// 	if (cell.value === number) {
	// 		// block box:
	// 		boxes.forEach((box, b) => box.forEach(boxCell => {
	// 			if (boxCell.x === cell.x && boxCell.y === cell.y) {
	// 				boxes.forEach((BOX, B) => BOX.forEach(BOXCELL => {
	// 					if (b === B) BOXCELL.potentialCell = false
	// 				}))
	// 			}
	// 		}))
	// 	}
	// }))
	for (let r = 0; r < 9; r++) {
		for (let c = 0; c < 9; c++) {
			if (updatedBoard[r][c].value === number) {
				// block box:
				const x = c;
				const y = r;
				for (let i = 0; i < 9; i++) {
					const box = boxes[i];
					for (let j = 0; j < 9; j++) {
						if (box[j].x === x && box[j].y === y) {
							for (let n = 0; n < 9; n++) {
								//updatedBoard[box[n].y][box[n].x].backgroundColor = "orange";
								updatedBoard[box[n].y][box[n].x].potentialCell = false;
							}
						}
					}
				}
			}
		}
	}
	// show & save potential cells:
	updatedBoard.forEach((row) => {
		row.forEach((cell) => {
			if (cell.potentialCell) {
				potentialCells.push({ x: cell.x, y: cell.y });
			}
		});
	});
	// if there are potentialCells, check if there are singlePotentialCells in them:
	if (potentialCells.length) {
		//console.log("potential cells for number", number, ":", potentialCells);
		// check every box & find if there is only one potential cell
		for (let i = 0; i < 9; i++) {
			let potentialCellsInBox = [];

			const box = boxes[i];
			// box cells:
			for (let j = 0; j < 9; j++) {
				for (let n = 0; n < potentialCells.length; n++) {
					const cell = box[j];
					const potentialCell = potentialCells[n];
					// checking every cell in the box:
					if (cell.x === potentialCell.x && cell.y === potentialCell.y) {
						potentialCellsInBox.push(potentialCell);
					}
				}
			}
			//console.log("potential cells in box:", i, potentialCellsInBox);
			if (potentialCellsInBox.length === 1) {
				// if there is only one potential cell in a box,
				// console.log(
				// 	"There is only one potential cell for a box:",
				// 	i,
				// 	potentialCellsInBox[0]
				// );
				// put the number there
				const foundNumberCoords = potentialCellsInBox[0];
				updatedBoard[foundNumberCoords.y][foundNumberCoords.x].value = number;
				updatedBoard[foundNumberCoords.y][foundNumberCoords.x].color = "red";
				updatedBoard = findNumber(number, updatedBoard);
			}
		}
	} else {
		// if there are no potentialCells:
		//console.log("There are no potential cells for number", number);
	}
	return updatedBoard;
}
