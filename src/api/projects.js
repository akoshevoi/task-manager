import {firebaseApp} from '../firebaseConfig';
import * as firebase from 'firebase/app';
const db = firebaseApp.firestore();

export async function addProjectToDataBase(userId, projectName) {
  try {
    const projectRef = db.collection('projects');
    const projectItem = await projectRef.add({
      userId, 
      name: projectName,
      tasks: {
        taskList: []
      }
    });
    await projectRef.doc(projectItem.id).set({
      projectId: projectItem.id
    }, {merge: true}); 
  } catch (error) {
    console.log(error);
  }
};

export async function addTaskToDataBase(projectId, task) {
  const projectRef = db.collection('projects').doc(projectId);
  await projectRef.update({
    'tasks.taskList': firebase.firestore.FieldValue.arrayUnion(task)
  })
};

export async function getProjectsFromDataBase(userId) {
  try {
    const projectRef = db.collection('projects').where('userId', '==', userId);
    const projectSnap = await projectRef.get();
    if (projectSnap.empty) {
      return [];
    }
    const docs = projectSnap.docs;
    const projects = docs.map(doc => doc.data());
    return projects;
  } catch (error) {
    console.log(error);
  }
};

export async function getProjectFromDataBase (projectId) {
  try {
    const projectRef = db.collection('projects').doc(projectId);
    const projectDoc = await projectRef.get();
    return projectDoc.data();
  } catch (error) {
    console.log(error);
  }
};

export async function updateTaskArrayInDataBase(projectId, newTaskArray) {
  try {
    const project = await getProjectFromDataBase (projectId);
    await db.collection('projects').doc(projectId).update({
      ...project,
      'tasks.taskList': newTaskArray
    })
  } catch (error) {
    console.log(error);
  }
}