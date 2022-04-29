// Validation for Character Info
import { validateForm, validateNum, validateText } from "./utils";
const requiredText = validateText(true);
const validationMap = {
  character_men: { fn: validateNum, alias: "Number of Male Characters" },
  character_women: { fn: validateNum, alias: "Number of Female Characters" },
  character_neutral: { fn: validateNum, alias: "Number of Gender neutral Characters" },
  character_explanation: { fn: requiredText, alias: "Character explanation" },
};
export let validateCharacterInfo = (form) => {
  return validateForm(form, validationMap);
};
