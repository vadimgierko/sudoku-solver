export default function generateBoxes() {
	// box = square area of sudoku with a thicker border
	// box = 9 cells (3 rows with 3 cells in each row)
	// there are 9 boxes in sudoku (3 rows of boxes with 3 boxes in each row)
	let boxes = [];
	for (let n = 0; n < 3; n++) {
		for (let m = 0; m < 3; m++) {
			let box = [];
			for (let r = 0; r < 3; r++) {
				for (let c = 0; c < 3; c++) {
					box.push({
						x: m * 3 + c,
						y: n * 3 + r,
					});
				}
			}
			boxes.push(box);
		}
	}
	return boxes;
}
