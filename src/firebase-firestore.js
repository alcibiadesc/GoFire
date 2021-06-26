import { firebaseApp } from "./firebase";
import {
	getFirestore,
	doc,
	getDoc,
	setDoc,
	collection,
} from "firebase/firestore";

const db = getFirestore();

const getData = async (collectName, uid) => {
	const docRef = doc(db, collectName, uid);
	const docSnap = await getDoc(docRef);

	let result = "";
	if (docSnap.exists()) {
		result = docSnap.data();
		console.log(result);
	} else {
		console.log("No such document!");
	}

	return result;
};

const setData = async (collectName, uid, value) => {
	const docRef = collection(db, collectName);
	if (value && value.length > 0) {
		await setDoc(doc(docRef, uid), { [collectName]: value });
	}
};

export { getData, setData };
