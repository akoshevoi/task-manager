import {firebaseApp} from '../firebaseConfig';
import * as firebase from 'firebase/app';
const db = firebaseApp.firestore();

export async function addProjectsToDB (userId, projectName) {
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
};

export async function addTaskToDB (projectId, taskName, statusTask) {
  const projectRef = await db.collection('projects').doc(projectId);

  projectRef.update({
    'tasks.taskList': firebase.firestore.FieldValue.arrayUnion({
      name: taskName,
      status: statusTask,
      description: '',
      subtasks: []
    })
  })
};

export async function getProjectsFromDB (userId) {
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

export async function getProjectFromDB (projectId) {
  try {
    const projectRef = db.collection('projects').doc(projectId);
    const projectDoc = await projectRef.get();
    return projectDoc.data();
  } catch (error) {
    console.log(error);
  }
};

export async function changeStatusTaskInDB (projectId, taskName, taskStatus) {
  try {
    const project = await getProjectFromDB (projectId);
    const newTaskArray = project.tasks.taskList.map(task => {
      if (task.name === taskName) {
        return {...task, status: taskStatus}
      }
      return task
    });
    await db.collection('projects').doc(projectId).update({
      ...project,
      'tasks.taskList': newTaskArray
    })
    return true;
  } catch (error) {
    console.log(error);
  }
}

export async function addDescriptionToDB (projectId, taskName, description) {
  try {
    const project = await getProjectFromDB (projectId);
    const newTaskArray = project.tasks.taskList.map(task => {
      if (task.name === taskName) {
        return {...task, description}
      }
      return task;
    });
    await db.collection('projects').doc(projectId).update({
      ...project, 
      'tasks.taskList': newTaskArray
    })
  } catch (error) {
    console.log(error);
  }
}


export async function addSubTaskToDB (projectId, taskName, subTask) {
  try {
    const project = await getProjectFromDB (projectId);
    const newTaskArray = project.tasks.taskList.map(task => {
      if (task.name === taskName) {
        task.subtasks.push(subTask);
      }
      return task;
    });
    await db.collection('projects').doc(projectId).update({
      ...project, 
      'tasks.taskList': newTaskArray
    })
  } catch (error) {
    console.log(error);
  }
}

export async function changeStatusSubTaskInDB (projectId, taskName, subTaskName, checkedStatus) {
  try {
    const project = await getProjectFromDB (projectId);
    const newTaskArray = project.tasks.taskList.map(task => {
      if (task.name === taskName) {
        task.subtasks.find(subTask => {
          if (subTask.name === subTaskName) {
            return {...subTask, done: checkedStatus}
          }
          return subTask;
        })
      }
      return task;
    });
    await db.collection('projects').doc(projectId).update({
      ...project, 
      'tasks.taskList': newTaskArray
    })
  } catch (error) {

  }
}