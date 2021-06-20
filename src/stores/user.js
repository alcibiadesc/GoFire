import { writable } from "svelte/store";

let uid = "";
const STORE_PREFIX_USER = "user_";
const userProfile = localStorage.getItem(`${STORE_PREFIX_USER}items`);
const user = writable(
	JSON.parse(userProfile) || {
		name: "",
		img: "icons/user.svg",
		uid: "",
		email: "",
	}
);

user.subscribe((value) => {
	if (userProfile !== value) {
		localStorage.setItem(`${STORE_PREFIX_USER}items`, JSON.stringify(value));
		uid = value.uid;
	}
});

const userReset = () => user.set({ name: "Crack", img: "icons/user.svg" });

export { user, userReset, uid };
