// Validation for Character Info
import { countries, statesCities } from "$lib/utils/location-data";
import { validateForm, validateSelect, validateText, validateZipCode } from "./utils";
const statesCitiesOptions = Object.keys(statesCities);

const requiredText = validateText(true);
const validationMap = {
  country: { fn: validateSelect(countries), alias: "Country" },
  address1: { fn: requiredText, alias: "Address" },
  address2: { fn: validateText(false), alias: "Address Line 2" },
  city: { fn: requiredText, alias: "City" },
  state: { fn: validateSelect(statesCitiesOptions), alias: "State" },
  zip: { fn: validateZipCode, alias: "Zip Code" },
  meet_pref: { fn: validateSelect(), alias: "Zip Code" },
  work_web: { fn: validateText(false), alias: "Work Website" },
  person_web: { fn: validateText(false), alias: "Personal Website" },
  npx_profile: { fn: validateText(false), alias: "NPX Profile" },
};
export let validateContactInfo = (form) => {
  console.log({ form });
  return validateForm(form, validationMap);
};
