import { firebaseApp } from "./firebase.js";
import {
	GoogleAuthProvider,
	getAuth,
	signInWithRedirect,
	getRedirectResult,
	signOut,
} from "firebase/auth";
import { user, userReset } from "./stores/user.js";

const reset = () => {
	userReset();
};

const provider = new GoogleAuthProvider();

const auth = getAuth();

const signIn = () => signInWithRedirect(auth, provider);

const getToken = (userStore) =>
	getRedirectResult(auth)
		.then((result) => {
			// This gives you a Google Access Token. You can use it to access Google APIs.
			const credential = GoogleAuthProvider.credentialFromResult(result);
			const token = credential.accessToken;

			// The signed-in user info.
			const user = result.user;

			// send data to the store
			let userData = {
				name: user.displayName,
				img: user.photoURL,
				uid: user.uid,
				email: user.email,
			};
			userStore.set(userData);
		})
		.catch((error) => {
			// Handle Errors here.
			const errorCode = error.code;
			const errorMessage = error.message;
			// The email of the user's account used.
			const email = error.email;
			// The AuthCredential type that was used.
			const credential = GoogleAuthProvider.credentialFromError(error);
			// ...
		});

const actionSignOut = () =>
	signOut(auth)
		.then(() => {
			// Sign-out successful.
			console.log("Sign-out successful");
			reset();
			location.reload();
		})
		.catch((error) => {
			// An error happened.
		});
export { actionSignOut, signIn, getToken };
