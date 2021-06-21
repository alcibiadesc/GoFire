import { getFirestore } from "firebase/firestore";
import { firebaseApp } from "./firebase";

const db = getFirestore();

export { db };
