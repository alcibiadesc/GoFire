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

const auth = getAuth();
const provider = new GoogleAuthProvider();
const signIn = () => signInWithRedirect(auth, provider);

const actionSignOut = () => signOut(auth);

onAuthStateChanged(auth, (userData) => {
	if (userData) {
		const { displayName, photoURL, email, uid } = userData;

		console.log("you are logged");
		user.set({ displayName, photoURL, email, uid });

		// ...
	} else {
		console.log("you are not logged");
		resetUser();
	}
});

export { actionSignOut, signIn, auth };
