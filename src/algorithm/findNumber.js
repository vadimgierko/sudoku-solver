import generateBoxes from "../logic/generateBoxes";

export default function findNumber(number, board) {
	let updatedBoard = [...board];
	// eliminate rows:
	for (let r = 0; r < 9; r++) {
		for (let c = 0; c < 9; c++) {
			if (board[r][c].value === number) {
				// block row:
				for (let i = 0; i < 9; i++) {
					board[r][i].backgroundColor = "orange";
					board[r][i].potentialCell = false;
				}
			}
		}
	}
	// eliminate cols:
	for (let r = 0; r < 9; r++) {
		for (let c = 0; c < 9; c++) {
			if (board[r][c].value === number) {
				// block row:
				for (let i = 0; i < 9; i++) {
					board[i][c].backgroundColor = "orange";
					board[i][c].potentialCell = false;
				}
			}
		}
	}
	// eliminate boxes:
	const boxes = generateBoxes();
	for (let r = 0; r < 9; r++) {
		for (let c = 0; c < 9; c++) {
			if (board[r][c].value === number) {
				// block box:
				const x = c;
				const y = r;
				for (let i = 0; i < 9; i++) {
					const box = boxes[i];
					for (let j = 0; j < 9; j++) {
						if (box[j].x === x && box[j].y === y) {
							for (let n = 0; n < 9; n++) {
								board[box[n].y][box[n].x].backgroundColor = "orange";
								board[box[n].y][box[n].x].potentialCell = false;
							}
						}
					}
				}
			}
		}
	}
	// eliminate existed numbers:
	for (let r = 0; r < 9; r++) {
		for (let c = 0; c < 9; c++) {
			if (board[r][c].value) {
				board[r][c].backgroundColor = "orange";
				board[r][c].potentialCell = false;
			}
		}
	}
	// show potential cells:
	for (let r = 0; r < 9; r++) {
		for (let c = 0; c < 9; c++) {
			if (board[r][c].potentialCell) {
				board[r][c].backgroundColor = "green";
			}
		}
	}
	return updatedBoard;
}
