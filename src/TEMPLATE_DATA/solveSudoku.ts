// /**
//  * Recursive function that runs algorithm until sudoku is loved,
//  * by updating and passing updated variables.
//  *
//  * On every fulfilled field it returns complete board string ready to render.
//  */
// function solveSudoku({
//   board,
//   steps,
//   currentCoords,
//   value,
// }: {
//   board: Board;
//   steps: Step[];
//   currentCoords: Coords | null;
//   value: number;
// }) {
//   console.log("solving sudoku...");

//   // if this is the first iteration, prevStep will be undefined,
//   // next iteration will start, when steps will be updated,
//   const prevStep = steps.length ? steps[steps.length - 1] : undefined;

//   if (!currentCoords) {
//     console.error("No current coords...");
//     console.log("Final steps count:", stepsCount);
//     // stop
//     return console.log("Sudoku is solved!");
//   }

//   const nextStep = generateStep(board, value, currentCoords);

//   if (nextStep) {
//     const updatedBoard: Board = board.map((row, r) =>
//       row.map((col, c) =>
//         r === currentCoords?.r && c === currentCoords.c ? nextStep.value : col
//       )
//     );
//     const updatedSteps = [...steps, nextStep];
//     const updatedCurrentCoords = findEmptyCell(updatedBoard);
//     // reset value:
//     value = 1;
//     stepsCount += 1;

//     renderBoard(updatedBoard);
//     return solveSudoku({
//       board: updatedBoard,
//       steps: updatedSteps,
//       value,
//       currentCoords: updatedCurrentCoords,
//     });
//   } else {
//     if (!prevStep) {
//       console.error("No next & no prev step...");
//       return;
//     }
//     // return to prev step and update value
//     // discard prevStep
//     const updatedBoard: Board = board.map((row, r) =>
//       row.map((col, c) =>
//         r === prevStep.coords.r && c === prevStep.coords.c ? 0 : col
//       )
//     );
//     const updatedSteps = steps.filter((s, i) => i !== steps.length - 1);
//     const updatedPotentialValue = prevStep.value + 1;

//     value = updatedPotentialValue;
//     stepsCount += 1;

//     const updatedCurrentCoords = findEmptyCell(updatedBoard);

//     renderBoard(updatedBoard);
//     return solveSudoku({
//       board: updatedBoard,
//       steps: updatedSteps,
//       value,
//       currentCoords: updatedCurrentCoords,
//     });
//   }
// }
