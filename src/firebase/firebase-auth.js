// eslint-disable-next-line no-unused-vars
import {firebaseApp} from './firebase.js';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {user, resetUser} from './../stores/user.js';
import {getData, setData} from './firebase-firestore.js';
import {resetData, data} from './../stores/data.js';
import {currencyStore} from './../i18n/i18n.js';

import {goal, resetGoal} from './../stores/goal.js';

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
  getData('goal', uid).then((value) => (value ? goal.set(value.goal) : ''));
  getData('data', uid).then((array) => (array ? data.set(array.data) : ''));
  getData('currency', uid).then(
      (value) => {
        currencyStore.set(value.currency); console.log({get: value});
      },
  );
};

const set = (uid) => {
  goal.subscribe((value) => setData('goal', uid, value));
  data.subscribe((value) =>
      value.length > 0 ? setData('data', uid, value) : '',
  );
  setTimeout(() => {
    currencyStore.subscribe((value) => {
      setData('currency', uid, value); console.log({set: value});
    });
  }, 2000);
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log('👌 you are logged 👌');
    profile(user);
    get(user.uid);
    set(user.uid);
  } else {
    console.log('👋 you are not logged 👋');
    reset();
  }
});

export {actionSignOut, signIn, auth};
