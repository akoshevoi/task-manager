import {firebaseApp} from '../firebaseConfig';

export const createUserWithEmailAndPassword = (email, password) => {
  return firebaseApp
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(async ({user}) => user);
};

export const signInWithEmailAndPassword = (email, password) => {
  return firebaseApp  
    .auth()
    .signInWithEmailAndPassword(email, password);
};

export const signOut = () => {
  return firebaseApp
    .auth()
    .signOut();
};

export const authListener = () => {
  return firebaseApp
    .auth()
    .onAuthStateChanged(user => user);
};
