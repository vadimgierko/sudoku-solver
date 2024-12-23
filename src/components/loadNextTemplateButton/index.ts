export function createLoadNextTemplateButton(handleLoadNextTemplateButtonClick: () => void) {
	const LOAD_NEXT_TEMPLATE_BUTTON_EL = document.createElement("button");
	LOAD_NEXT_TEMPLATE_BUTTON_EL.id = "load-next-template-button";
	LOAD_NEXT_TEMPLATE_BUTTON_EL.textContent = "load next template";
	LOAD_NEXT_TEMPLATE_BUTTON_EL.addEventListener("click", handleLoadNextTemplateButtonClick);

	return LOAD_NEXT_TEMPLATE_BUTTON_EL;
}