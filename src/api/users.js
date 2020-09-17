import {firebaseApp} from '../firebaseConfig';
const db = firebaseApp.firestore();

export const saveUserById = async (id, data) => {
  const doc = db.collection('users').doc(id);
  await doc.set(data);
}

export const getAuthUserData = async (id) => {
  const user = await db.collection('users').doc(id).get();
  return user;
}