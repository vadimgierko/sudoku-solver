import generateBoxes from "../logic/generateBoxes";

// eliminate existing numbers, rows, cols & boxes => find potential cells
// if there is a single potential cell in a box, put the number there
// if the number was put, repeat the whole cycle,
// until there will be no single potential cells in boxes,
// then return the fulfilled board & search for a next number

export default function findNumber(number, board) {
	console.log("number passed to findNumber function:", number);
	console.log("board passed to findNumber function:", board);
	const boxes = generateBoxes();
	let updatedBoard = [...board];
	// reset board:
	for (let r = 0; r < 9; r++) {
		for (let c = 0; c < 9; c++) {
			updatedBoard[r][c].potentialCell = true;
			updatedBoard[r][c].backgroundColor = "";
		}
	}
	let potentialCells = [];
	// eliminate existing numbers:
	for (let r = 0; r < 9; r++) {
		for (let c = 0; c < 9; c++) {
			if (updatedBoard[r][c].value) {
				//updatedBoard[r][c].backgroundColor = "orange";
				updatedBoard[r][c].potentialCell = false;
			}
		}
	}
	// eliminate rows:
	for (let r = 0; r < 9; r++) {
		for (let c = 0; c < 9; c++) {
			if (updatedBoard[r][c].value === number) {
				// block row:
				for (let i = 0; i < 9; i++) {
					//updatedBoard[r][i].backgroundColor = "orange";
					updatedBoard[r][i].potentialCell = false;
				}
			}
		}
	}
	// eliminate cols:
	for (let r = 0; r < 9; r++) {
		for (let c = 0; c < 9; c++) {
			if (updatedBoard[r][c].value === number) {
				// block row:
				for (let i = 0; i < 9; i++) {
					//updatedBoard[i][c].backgroundColor = "orange";
					updatedBoard[i][c].potentialCell = false;
				}
			}
		}
	}
	// eliminate boxes:
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
	for (let r = 0; r < 9; r++) {
		for (let c = 0; c < 9; c++) {
			if (updatedBoard[r][c].potentialCell) {
				//updatedBoard[r][c].backgroundColor = "green";
				potentialCells.push({ x: c, y: r });
			}
		}
	}
	// if there are potentialCells, check if there are singlePotentialCells in them:
	if (potentialCells.length) {
		console.log("potential cells for number", number, ":", potentialCells);
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
			console.log("potential cells in box:", i, potentialCellsInBox);
			if (potentialCellsInBox.length === 1) {
				// if there is only one potential cell in a box,
				console.log(
					"There is only one potential cell for a box:",
					i,
					potentialCellsInBox[0]
				);
				// put the number there
				const foundNumberCoords = potentialCellsInBox[0];
				updatedBoard[foundNumberCoords.y][foundNumberCoords.x].value = number;
				updatedBoard[foundNumberCoords.y][foundNumberCoords.x].color = "red";
				updatedBoard = findNumber(number, updatedBoard);
			}
		}
	} else {
		// if there are no potentialCells:
		console.log("There are no potential cells for number", number);
	}
	return updatedBoard;
}
