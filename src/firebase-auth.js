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
import { getData, setData } from "./firebase-firestore.js";
import { resetData, data } from "./stores/data.js";

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

const get = (uid) => {
	getData("goal", uid).then((value) => (value ? goal.set(value.goal) : ""));
	getData("data", uid).then((array) => (array ? data.set(array.data) : ""));
};

onAuthStateChanged(auth, (user) => {
	if (user) {
		console.log("you are logged");
		profile(user);
		get(user.uid);
		goal.subscribe((value) => setData("goal", user.uid, value));
		data.subscribe((value) => setData("data", user.uid, value));
	} else {
		console.log("you are not logged");
		reset();
	}
});

export { actionSignOut, signIn, auth };
