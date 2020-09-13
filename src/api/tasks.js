import {firebaseApp} from '../firebaseConfig';
import * as firebase from 'firebase/app';
const db = firebaseApp.firestore();

export async function addTaskToDataBase(userId, projectId, projectName, taskName, taskStatus) {
  try {
    const taskRef = db.collection('tasks');
    const taskItem = await taskRef.add({
      userId, 
      projectId,
      projectName,
      name: taskName,
      status: taskStatus,
      subTasks: {
        subTasksList: []
      }
    });
    await taskRef.doc(taskItem.id).set({
      taskId: taskItem.id
    }, {merge: true}); 
    const taskItemSnap = db.collection('tasks').doc(taskItem.id);
    const taskItemDoc = await taskItemSnap.get();
    return taskItemDoc.data();
  } catch (error) {
    console.log(error);
  }
};

export async function getTasksFromDataBase(projectId) {
  try {
    const taskRef = db.collection('tasks').where('projectId', '==', projectId);
    const taskSnap = await taskRef.get();
    if (taskSnap.empty) {
      return [];
    }
    const docs = taskSnap.docs;
    const tasks = docs.map(doc => doc.data());
    return tasks;
  } catch (error) {
    console.log(error);
  }
};

export async function getTaskFromDataBase(taskId) {
  try {
    const taskRef = db.collection('tasks').doc(taskId);
    const taskDoc = await taskRef.get();
    return taskDoc.data();
  } catch (error) {
    console.log(error);
  }
};

export async function updateTaskInDataBase(taskId, fieldName, newProperty) {
  try {
    const task = await getTaskFromDataBase(taskId);
    await db.collection('tasks').doc(taskId).update({
      ...task,
      [`${fieldName}`]: newProperty
    });
  } catch (error) {
    console.log(error);
  }
}