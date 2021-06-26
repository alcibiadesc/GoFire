import { writable } from "svelte/store";

const user = writable({
	displayName: "",
	photoURL: "icons/user.svg",
	email: "",
	uid: "",
});

const resetUser = () => user.set(0);

export { user, resetUser };
