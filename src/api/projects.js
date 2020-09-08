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
};

const checkTaskNameOnRepeating = async (userId, projectName, taskName, statusTask) => {
  const projectRef = db.collection('projects').where('userId', '==', userId);
  const projectSnap = await projectRef.get();
  const docs = projectSnap.docs;
  const projects = docs.map(projectItem => projectItem.data());
  const project = projects.find(project => project.name === projectName);
  const taskArray = project.tasks.taskList;
  const repeatingTaskName = taskArray.find(taskItem => taskItem.name === taskName);
  return repeatingTaskName 
  ? false
  : true;
}

export const addProjectsToDB = async (userId, project) => {
  const conditionAddingProjectToDB = await checkProjectNameOnRepeating(userId, project);
  if (conditionAddingProjectToDB && project.length > 0) {
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

export const getTasksfromDB = async (userId, projectName) => {
  const projectsArray = await getProjectsFromDB(userId);
  const project = projectsArray.find(projectItem => projectItem.name === projectName);
  return project.tasks.taskList;
}

export const getTaskfromDB = async (userId, projectName, task) => {
  const projectsArray = await getProjectsFromDB(userId);
  const project = projectsArray.find(projectItem => projectItem.name === projectName);
  const searchingTask = project.tasks.taskList.find(projectItem => projectItem.name === task.name);
  return searchingTask;
}

export const addTaskToDB = async (userId, projectName, taskName, statusTask) => {
  const conditionAddingTaskToDB = await checkTaskNameOnRepeating(userId, projectName, taskName, statusTask);

  if (conditionAddingTaskToDB && taskName.length > 0)  {
    const projectsArray = await getProjectsFromDB(userId);
    const project = projectsArray.find(projectItem => projectItem.name === projectName);
    const docRef = db.collection('projects').doc(project.projectId);
    await docRef.update({
      ...project,
      'tasks.taskList': [
        ...project.tasks.taskList,
        {
          name: taskName,
          status: statusTask,
          description: '',
          subtasks: []
        }
      ]
    })
  }
}

export const changeStatusTaskInDB = async (userId, projectName, task, status) => {
  const projectsArray = await getProjectsFromDB(userId);
  const project = projectsArray.find(projectItem => projectItem.name === projectName);
  const docRef = db.collection('projects').doc(project.projectId);
  const gettedDoc = await docRef.get();
  const taskList = gettedDoc.data().tasks.taskList;
  const findingTask = taskList.find(taskItem => taskItem.name === task.name);
  const changingTask = findingTask.status = status;
  
  /*
  await docRef.update({
    ...project,
    'tasks.taskList': firebase.firestore.FieldValue.arrayUnion({...task, status})
  })
  */
  /*
  await docRef.update({
    ...project,
    'tasks.taskList': [
      ...project.tasks.taskList,
      {...task, status}
    ]
  })
  */
  /*
  await docRef.update({
    ...project,
    'tasks.taskList': [
      ...project.tasks.taskList,
      firebase.firestore.FieldValue.arrayRemove(task),
      firebase.firestore.FieldValue.arrayUnion({...task, status})
    ]
  })
  */
  await docRef.update({
    ...project,
    'tasks.taskList': [...taskList]
  })
}

export const addDescriptionToDB = async (userId, projectName, taskName, description) => {
  const projectsArray = await getProjectsFromDB(userId);
  const project = projectsArray.find(projectItem => projectItem.name === projectName);
  const docRef = db.collection('projects').doc(project.projectId);
  const gettingDoc = await docRef.get();
  const gettingData = gettingDoc.data();
  const searchingTask = gettingData.tasks.taskList.find(taskItem => taskItem.name === taskName);
  console.log(searchingTask);
  await docRef.update({
    ...project,
    'tasks.taskList': [
      //...project.tasks.taskList,
      {
        ...searchingTask,
        description
      }
    ]
  })
}