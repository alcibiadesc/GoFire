// eslint-disable-next-line no-unused-vars
import { firebaseApp } from "./firebase.js";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { user, resetUser } from "./../stores/user.js";
import { getData, setData } from "./firebase-firestore.js";
import { resetData, data } from "./../stores/data.js";
import { currency } from "./../i18n/currency.js";
import { landing } from "./../stores/landing";
import { goal, resetGoal } from "./../stores/goal.js";

console.log("Initializing Firebase Auth");
const auth = getAuth();
const provider = new GoogleAuthProvider();

const signIn = () => {
  console.log("Attempting to sign in with popup");
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log("Sign in successful:", result.user);
    })
    .catch((error) => {
      console.error("Error during signInWithPopup:", error);
    });
};

const actionSignOut = () => {
  console.log("Attempting to sign out");
  signOut(auth)
    .then(() => {
      console.log("Sign out successful");
    })
    .catch((error) => {
      console.error("Error during signOut:", error);
    });
};

const reset = () => {
  console.log("Resetting user, data, and goal");
  resetUser();
  resetData();
  resetGoal();
};

const profile = (userData) => {
  console.log("Setting user profile with data:", userData);
  user.set(userData);
};

const get = (uid) => {
  console.log("Getting data for user:", uid);
  getData("goal", uid)
    .then((value) => {
      if (value) {
        console.log("Goal data retrieved:", value.goal);
        goal.set(value.goal);
      } else {
        console.log("No goal data found for user:", uid);
      }
    })
    .catch((error) => {
      console.error("Error retrieving goal data:", error);
    });

  getData("data", uid)
    .then((array) => {
      if (array) {
        console.log("Data retrieved:", array.data);
        data.set(array.data);
      } else {
        console.log("No data found for user:", uid);
      }
    })
    .catch((error) => {
      console.error("Error retrieving data:", error);
    });

  getData("currency", uid)
    .then((value) => {
      if (value) {
        console.log("Currency data retrieved:", value.currency);
        currency.set(value.currency);
      } else {
        console.log("No currency data found for user:", uid);
      }
    })
    .catch((error) => {
      console.error("Error retrieving currency data:", error);
    });
};

const set = (uid) => {
  console.log("Setting data for user:", uid);
  goal.subscribe((value) => {
    console.log("Updating goal data:", value);
    setData("goal", uid, value).catch((error) => {
      console.error("Error updating goal data:", error);
    });
  });

  data.subscribe((value) => {
    if (value.length > 0) {
      console.log("Updating data:", value);
      setData("data", uid, value).catch((error) => {
        console.error("Error updating data:", error);
      });
    }
  });

  setTimeout(() => {
    currency.subscribe((value) => {
      console.log("Updating currency data:", value);
      setData("currency", uid, value).catch((error) => {
        console.error("Error updating currency data:", error);
      });
    });
  }, 2000);
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("👌 you are logged 👌", user);
    profile(user);
    get(user.uid);
    set(user.uid);
    landing.set(false);
  } else {
    console.log("👋 you are not logged 👋");
    landing.set(true);
    reset();
  }
});

export { actionSignOut, signIn, auth };
