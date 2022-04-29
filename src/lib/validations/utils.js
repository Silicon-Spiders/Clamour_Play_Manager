export function validateForm(form, validationMap) {
  let errors = {};
  // console.log({ form });
  Object.entries(form).forEach(([key, value]) => {
    const validation = validationMap[key];
    if (!validation) return;
    const { fn, alias } = validation;
    const errMsg = fn(alias, value);
    if (errMsg) errors[key] = errMsg;
  });
  // console.log({errors});
  return errors;
}

export function validateText(isRequired) {
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

export function validateNum(alias, value) {
  let errMsg = undefined;
  // console.log({ alias, value });
  const num = Number.parseInt(value);
  if (Number.isNaN(num)) return (errMsg = `${alias} is required`);
}

export function validatePDF(alias, [file]) {
  let errMsg = undefined;
  // console.log({ file });
  if (!file) {
    errMsg = `${alias} is required!`;
    return errMsg;
  } // No File
  const sizeMB = file.size / 1000000;
  const maxMB = 5;
  if (sizeMB > maxMB) errMsg = `${alias} cannot be more than ${maxMB}MB`;
  if (file.type !== "application/pdf") errMsg = `${alias} must be in PDF file format!`;
  return errMsg;
}

export function validateSelect(optionsArr) {
  return function (alias, value) {
    let errMsg = undefined;
    if (!optionsArr.includes(value)) errMsg = `${alias} is required!`;
    return errMsg;
  };
}

export function validateZipCode(alias, value) {
  let errMsg = undefined;
  console.log({ value });
  const zipCodeRegex = /^\d{5}$/;
  if (!zipCodeRegex.test(value)) errMsg = `Invalid ${alias}`;
  return errMsg;
}
