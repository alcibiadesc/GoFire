import { firebaseApp } from "./firebase.js";
import {
	GoogleAuthProvider,
	getAuth,
	signInWithRedirect,
	getRedirectResult,
	signOut,
	onAuthStateChanged,
} from "firebase/auth";
import { user, resetUser } from "./stores/user.js";
import { getData } from "./firebase-firestore.js";
import { resetData } from "./stores/data.js";

import { goal, resetGoal } from "./stores/goal.js";

const auth = getAuth();
const provider = new GoogleAuthProvider();
const signIn = () => signInWithRedirect(auth, provider);

const actionSignOut = () => signOut(auth);

const reset = () => {
	resetUser();
	resetData();
	resetGoal();
};

const profile = (userData) => {
	user.set(userData);
};

const get = () => {
	getData("goal").then((value) => goal.set(value.goal));
};

onAuthStateChanged(auth, (user) => {
	if (user) {
		console.log("you are logged");
		profile(user);
		get();
	} else {
		console.log("you are not logged");
		reset();
	}
});

export { actionSignOut, signIn, auth };
