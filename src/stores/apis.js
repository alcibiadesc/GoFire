import { writable } from "svelte/store";

const apis = writable({});

const resetApis = () => apis.set({});

export { apis, resetApis };
