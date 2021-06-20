import { initializeApp } from "firebase/app";
import { user } from "./stores/data";

import {
	GoogleAuthProvider,
	getAuth,
	signInWithRedirect,
	getRedirectResult,
} from "firebase/auth";

import "firebase/analytics";
import "firebase/auth";

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
const provider = new GoogleAuthProvider();

const auth = getAuth();

export const signIn = () => signInWithRedirect(auth, provider);

let userStore = user;

export const getToken = () =>
	getRedirectResult(auth)
		.then((result) => {
			// This gives you a Google Access Token. You can use it to access Google APIs.
			const credential = GoogleAuthProvider.credentialFromResult(result);
			const token = credential.accessToken;

			// The signed-in user info.
			const user = result.user;
			console.log(user);
			console.log(user.displayName);

			let userData = {
				name: user.displayName.split(" ")[0],
				img: user.photoURL,
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
