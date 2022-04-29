import { validateForm, validateText } from "./utils";

const requiredText = validateText(true);
const validationMap = {
  fname: { fn: requiredText, alias: "First Name" },
  mname: { fn: requiredText, alias: "Middle Name" },
  lname: { fn: requiredText, alias: "Last Name" },
  prof_intro: { fn: requiredText, alias: "Professional Intro" },
  person_intro: { fn: requiredText, alias: "Personal Intro" },
};
export let validatePersonalDetails = (form) => {
  return validateForm(form, validationMap);
};
