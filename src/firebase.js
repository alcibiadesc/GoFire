import { initializeApp } from "firebase/app";
import { user, reset } from "./stores/data";
import { getFirestore } from "firebase/firestore";

import {
	GoogleAuthProvider,
	getAuth,
	signInWithRedirect,
	getRedirectResult,
	signOut,
} from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyDWiDgqYUOUq1tsA8C5zY3eJR170KRa3qA",
	authDomain: "finanzas-cfeb0.firebaseapp.com",
	projectId: "finanzas-cfeb0",
	storageBucket: "finanzas-cfeb0.appspot.com",
	messagingSenderId: "245107666949",
	appId: "1:245107666949:web:f8bac696fa6a205541ac6c",
	measurementId: "G-LR1WRTGGG2",
};

const firebaseApp = initializeApp(firebaseConfig);

// AUTH
const provider = new GoogleAuthProvider();

const auth = getAuth();

const signIn = () => signInWithRedirect(auth, provider);

let userStore = user;

const getToken = () =>
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

const db = getFirestore();
export { actionSignOut, signIn, getToken, db };
