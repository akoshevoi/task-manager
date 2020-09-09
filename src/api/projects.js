import {firebaseApp} from '../firebaseConfig';
const db = firebaseApp.firestore();

async function checkProjectNameOnRepeating (userId, project) {
  try {
    const projectRef = db.collection('projects').where('userId', '==', userId);
    const projectSnap = await projectRef.get();
    const docs = projectSnap.docs;
    const projects = docs.map(projectItem => projectItem.data());
    const repeatingProjectsName = projects.find(projectItem => projectItem.name === project);
    return repeatingProjectsName 
    ? false
    : true;
  } catch (error) {
    console.log(error)
  }
};

async function checkTaskNameOnRepeating (userId, projectName, taskName) {
  try {
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
  } catch (error) {
    console.log(error);
  }
};

export async function addProjectsToDB (userId, projectName) {
  /*
  const conditionAddingProjectToDB = await checkProjectNameOnRepeating(userId, projectName);
  if (!conditionAddingProjectToDB) {
    return;
  }
  */
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


export async function addTaskToDB (userId, projectName, taskName, statusTask) {
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
};

export async function changeStatusTaskInDB (userId, projectName, task, status) {
  try {
    const projectsArray = await getProjectsFromDB(userId);
    const project = projectsArray.find(projectItem => projectItem.name === projectName);
    const docRef = db.collection('projects').doc(project.projectId);
    const gettedDoc = await docRef.get();
    const taskList = gettedDoc.data().tasks.taskList;
    const searchingTask = taskList.find(taskItem => taskItem.name === task.name);
    const newTask = {...searchingTask, status};
    const newTaskList = [
      ...taskList,
      newTask
    ];
    //console.log(newTaskList);
    await docRef.update({
      ...project,
      'tasks.taskList': [...taskList]
    })
  } catch (error) {
    console.log(error);
  }
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

export async function getProjectFromDB (projectName) {
  try {
    
  } catch(error) {
    console.log(error)
  }
}

export async function addDescriptionToDB (userId, projectName, taskName, description) {
  try {
    const projectsArray = await getProjectsFromDB(userId);
    const project = projectsArray.find(projectItem => projectItem.name === projectName);
    const docRef = db.collection('projects').doc(project.projectId);
    const gettingDoc = await docRef.get();
    const gettingData = gettingDoc.data();
    const searchingTask = gettingData.tasks.taskList.find(taskItem => taskItem.name === taskName);
    await docRef.update({
      ...project,
      'tasks.taskList': [
        {
          ...searchingTask,
          description
        }
      ]
    })
  } catch (error) {
    console.log(error);
  }
};

export async function getTaskArrayFromDB (userId, projectName) {
  try {
    const projectsArray = await getProjectsFromDB(userId);
    const project = projectsArray.find(projectItem => projectItem.name === projectName);
    const tasksArray = project.tasks.taskList;
    return tasksArray;
  } catch (error) {
    console.log(error);
  }
};

export async function getTaskFromDB (userId, projectName, task) {
  try {
    const tasksArray = await getTaskArrayFromDB(userId, projectName);
    const searchingTask = tasksArray.find(taskItem => taskItem.name === task.name);
    return searchingTask;
  } catch (error) {
    console.log(error);
  }
};