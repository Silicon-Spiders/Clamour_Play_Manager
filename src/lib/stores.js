import { writable } from "svelte/store";

// global stores
export let pageTitle = writable("...");

// "View Plays" stores
export let plays = writable([]);

export let evaluators = writable([]);

// manage evaluator stores
export let sideProfile = writable(null);

export let activeTab = writable("Play Info");
