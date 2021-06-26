import { firebaseApp } from "./firebase";
import { getFirestore, getDocs, collection } from "firebase/firestore";

const db = getFirestore();

const getData = async (collectName) => {
	const querySnapshot = await getDocs(collection(db, "goal"));
	let result;
	querySnapshot.forEach((doc) => {
		// doc.data() is never undefined for query doc snapshots
		result = doc.data();
	});
	return result;
};
export { getData };
