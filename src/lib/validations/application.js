const requiredText = validateText(true);
const validationMap = {
  file: { fn: validatePDF, alias: "File" },
  title: { fn: requiredText, alias: "Title" },
  synopsis: { fn: requiredText, alias: "Synopsis" },
  play_future: { fn: requiredText, alias: "Next Steps in Development" },
  actors_men: { fn: validateNum, alias: "Male Actor count" },
};
export function validateApplication(form) {
  let errors = {};
  console.log({ form });
  Object.entries(form).forEach(([key, value]) => {
    const { fn = undefined, alias = undefined } = validationMap[key];
    if (!fn) return;
    const errMsg = fn(alias, value);
    if (errMsg) errors[key] = errMsg;
  });
  console.log(errors);
  return errors;
}
function validateText(isRequired) {
  return function (alias, value) {
    let errMsg = undefined;
    if (value.length == 0) {
      if (isRequired) errMsg = `${alias} is required!`;
    }
    // No max limit ?? :/
    // console.log({ errMsg });
    return errMsg;
  };
}
function validateNum(alias, value) {
  let errMsg = undefined;
  console.log({ alias, value });
  const num = Number.parseInt(value);
  if (Number.isNaN(num)) return (errMsg = `${alias} is required`);
}
function validatePDF(alias, [file]) {
  let errMsg = undefined;
  if (!file) return (errMsg = `${alias} is required!`); // No File
  const sizeMB = file.size / 1000000;
  const maxMB = 5;
  if (sizeMB > maxMB) errMsg = `${alias} cannot be more than ${maxMB}MB`;
  if (file.type !== "application/pdf") errMsg = `${alias} must be in PDF file format!`;
  return errMsg;
}
