export default function generateBoxes() {
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
	console.log("boxes coords:", boxes);
	return boxes;
}
