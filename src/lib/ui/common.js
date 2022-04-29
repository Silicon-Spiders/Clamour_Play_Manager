// File that consists of objects/array that ui references
export const applicationTabs = [
  "Play Info",
  "Character Info",
  "Actor Info",
  "Personal Details",
  "Contact Info",
];
export const toneOptions = {
  Drama: "D",
  Comedy: "C",
  "Serio-Comic": "SC",
};
export const retreatFormatPreferenceOptions = {
  I: "In-Person Only",
  V: "Virtual Only",
  E: "Either",
};
export let applicationForm = {
  // system info
  dateOfEntry: null,
  retreatYear: null,
  // play info tab
  file: [],
  title: "",
  tone: "",
  synopsis: "",
  play_future: "",
  // character info tab
  character_men: 0,
  character_women: 0,
  character_neutral: 0,
  character_explanation: "",
  // actor info tab
  actors_men: 0,
  actors_women: 0,
  actors_neutral: 0,
  actor_explain: "",
  // personal details tab
  fname: "",
  mname: "",
  lname: "",
  prof_intro: "",
  person_intro: "",
  // contact info tab
  country: "United States",
  address1: "",
  address2: "",
  city: "",
  state: "",
  zip: "",
  province: "",
  postal_code: "",
  phone: "",
  email: "",
  meet_pref: "",
  path: "",
  person_web: "",
  npx_profile: "",
  work_web: "",
};
