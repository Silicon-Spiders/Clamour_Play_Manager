import { validateForm, validateNum, validateText } from "./utils";

const requiredText = validateText(true);
const validationMap = {
  actors_men: { fn: validateNum, alias: "Men Actor count" },
  actors_women: { fn: validateNum, alias: "Women Actor count" },
  actors_neutral: { fn: validateNum, alias: "Neutral gender Actor count" },
  actor_explain: { fn: requiredText, alias: "Actor Count Explanation" },
};
export let validateActorInfo = (form) => {
  return validateForm(form, validationMap);
};
