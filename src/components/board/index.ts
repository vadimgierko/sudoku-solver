import { Board } from "../../types";

export function createBoard() {
    const TABLE_EL = document.createElement("table");
    TABLE_EL.id = "sudoku-board";

    return TABLE_EL
}

export function getBoardEl() {
    return document.getElementById("sudoku-board");
}

export function rerenderBoard(board: Board) {
    const TABLE_EL = getBoardEl();

    if (!TABLE_EL) return console.error("No TABLE_EL... Cannot rerenderBoard...");

    let rowsHTMLString = "";
    // populate rowsHTMLString
    board.forEach((row, r) => {
        let colsHTMLString = "";
        row.forEach(
            (col, c) =>
            (colsHTMLString +=
                `<td id=${"row-" + r + "-col-" + c}>` + (col ? col : "") + "</td>")
        );
        rowsHTMLString += `<tr id=${"row-" + r}>` + colsHTMLString + "</tr>";
    });

    TABLE_EL.innerHTML = `
        <tbody>
		    ${rowsHTMLString}
	    </tbody>
    `;
}