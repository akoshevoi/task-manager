import {firebaseApp} from '../firebaseConfig';
import * as firebase from 'firebase/app';

const db = firebaseApp.firestore();

const checkProjectNameOnRepeating = async (userId, project) => {
  const projectRef = db.collection('projects').where('userId', '==', userId);
  const projectSnap = await projectRef.get();
  const docs = projectSnap.docs;
  const projects = docs.map(projectItem => projectItem.data());
  const repeatingProjectsName = projects.find(projectItem => projectItem.name === project);
  return repeatingProjectsName 
  ? false
  : true;
}


export const addProjectsToDB = async (userId, project) => {
  const conditionAddingProjectToDB = await checkProjectNameOnRepeating(userId, project);
  if (conditionAddingProjectToDB) {
    const projectRef = db.collection('projects');
    const projectItem = await projectRef.add({
      userId, 
      name: project,
      tasks: {
        taskList: []
      }
    });
    projectRef.doc(projectItem.id).set({
      projectId: projectItem.id
    }, {merge: true}); 
  }

  // const projectRef = db.collection('projects').doc(userId);
  // const doc = await projectRef.get();
  // if (!doc.exists) {
  //   projectRef.set({
  //     userId,
  //     projectsList: [
  //       {
  //         name: project,
  //         tasks: {
  //           taskList: []
  //         }
  //       }
  //     ]
      
  //   })
  // } else {
  //   projectRef.update({
  //     projectsList: firebase.firestore.FieldValue.arrayUnion({
  //       name: project,
  //       tasks: {
  //         taskList: []
  //       }
  //     }),
  //   })
  // }
}

export const addProjectsArrayToDB = async (db, userEmail, projectsArray) => {
  const projectRef = db.collection('projects').doc(userEmail);
  projectRef.update({
    projectsList: [
      ...projectsArray
    ]
  })
}

export const getProjectsFromDB = async userId => {
  const projectRef = db.collection('projects').where('userId', '==', userId);
  const projectSnap = await projectRef.get();
  if (projectSnap.empty) {
    return [];
  }
  const docs = projectSnap.docs;
  const projects = docs.map(doc => doc.data());
  return projects;
}

export const foo = async (userId, projectName, taskName) => {
  const projectsArray = await getProjectsFromDB(userId);
  const project = projectsArray.find(projectItem => projectItem.name === projectName);
  console.log(project);
  const docRef = db.collection('projects').doc(project.projectId);
  console.log(docRef);
  await docRef.update({
    'tasks.taskList:':{
    name: taskName,
    description: '',
    subtasks: []
    }
  })
  
  /*
  return project.tasks.taskList.update({
    name: taskName,
    description: '',
    subtasks: []
  })
  */
}