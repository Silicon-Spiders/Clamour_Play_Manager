import { validatePlayInfo } from "./playInfo";
import { validateCharacterInfo } from "./characterInfo";
import { validateActorInfo } from "./actorInfo";
import { validatePersonalDetails } from "./personalDetails";
import { validateContactInfo } from "./contactInfo";

export function getStepErrors(form) {
  const stepErrors = {
    playInfo: validatePlayInfo(form),
    characterInfo: validateCharacterInfo(form),
    actorInfo: validateActorInfo(form),
    personalDetails: validatePersonalDetails(form),
    contactInfo: validateContactInfo(form),
  };
  console.log({ stepErrors });
  return stepErrors;
}

export function validateApplication(form) {
  let errors = {};
  // console.log({form});
  let stepErrors = getStepErrors(form);
  Object.values(stepErrors).forEach((stepError) => {
    errors = { ...errors, ...stepError };
  });
  // console.log({ errors });
  return errors;
}
