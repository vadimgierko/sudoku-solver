export function createSolveButtonEl(handleSolveButtonClick: () => void) {
	const SOLVE_BUTTON_EL = document.createElement("button");
	SOLVE_BUTTON_EL.id = "solve-button";
	SOLVE_BUTTON_EL.textContent = "solve";
	SOLVE_BUTTON_EL.addEventListener("click", handleSolveButtonClick);

	return SOLVE_BUTTON_EL;
}