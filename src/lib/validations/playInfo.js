import { toneOptions } from "$lib/ui/common";
import { validateForm, validatePDF, validateSelect, validateText } from "$lib/validations/utils";
const requiredText = validateText(true);
const validationMap = {
  file: { fn: validatePDF, alias: "File" },
  title: { fn: requiredText, alias: "Title" },
  tone: { fn: validateSelect(Object.values(toneOptions)), alias: "Tone" },
  synopsis: { fn: requiredText, alias: "Synopsis" },
  play_future: { fn: requiredText, alias: "Next Steps in Development" },
};
export let validatePlayInfo = (form) => {
  // console.log({ form });
  return validateForm(form, validationMap);
};
