import { writable } from "svelte/store";

// global stores
export let pageTitle = writable("...");

// "View Plays" stores
export let plays = writable([]);

// manage evaluator stores
export let sideProfile = writable(null);
