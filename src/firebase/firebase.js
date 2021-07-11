import {initializeApp} from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyDWiDgqYUOUq1tsA8C5zY3eJR170KRa3qA',
  authDomain: 'finanzas-cfeb0.firebaseapp.com',
  projectId: 'finanzas-cfeb0',
  storageBucket: 'finanzas-cfeb0.appspot.com',
  messagingSenderId: '245107666949',
  appId: '1:245107666949:web:f8bac696fa6a205541ac6c',
  measurementId: 'G-LR1WRTGGG2',
};

const firebaseApp = initializeApp(firebaseConfig);

export {firebaseApp};
