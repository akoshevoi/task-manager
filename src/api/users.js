import {firebaseApp} from '../firebaseConfig';
const db = firebaseApp.firestore();

export const saveUserById = (id, data) => {
  const doc = db.collection('users').doc(id);
  doc.set(data);
}

export const getUserData = async (id) => {
  const user = await db.collection('users').doc(id);
  return user;
}

export async function getDocument(db, userEmail, userID, projectsArray, project) {
  // [START get_document]
  const projectRef = db.collection('projects').doc(userEmail);
  const doc = await projectRef.get();
  if (!doc.exists) {
     projectRef.set({
          userId: userID,
          projectsList: [
            ...projectsArray,
            {
              name: project,
              tasks: {
                taskList: []
              }
            }
          ]
        })
  } else {
    projectRef.update({
          projectsList: [
            ...projectsArray,
            {
              name: project,
              tasks: {
                taskList: []
              }
            }
          ]
        });
  }
  // [END get_document]
}

export async function getDocument1(db, userEmail, projectsArray) {
  // [START get_document]
  const projectRef = db.collection('projects').doc(userEmail);
  const doc = await projectRef.get();
  const data = doc.data();
  //const searchingProject = data.projectsList.find(item => item.name === project.name);
  //let tasks = searchingProject.tasks.taskList;
  projectRef.update({
    projectsList: [
      ...projectsArray,
      //project 
    ]
  })
  
  // [END get_document]
}