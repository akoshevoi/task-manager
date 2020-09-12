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
  } catch (error) {
    console.log(error);
  }
};