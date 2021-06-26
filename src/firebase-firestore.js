import { firebaseApp } from "./firebase";
import { getFirestore, doc, getDoc } from "firebase/firestore";

let uid = "2126EkhBIUhNqjs7pT9NM2tSMBf2";
const db = getFirestore();

import { collection, query, where, getDocs } from "firebase/firestore";

const getData = async (collectionName) => {
	const q = query(collection(db, collectionName));

	const querySnapshot = await getDocs(q);
	querySnapshot.forEach((doc) => {
		// doc.data() is never undefined for query doc snapshots
		console.log(doc.id, " => ", doc.data());
		console.log("datos obtenidos");
	});
};
export { db, getData };
