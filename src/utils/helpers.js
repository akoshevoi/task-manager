/*
const searchingProject = (state, payload) => {
  return state.find(project => project.name === payload.project);
};

const searchingTask = (state, payload) => {
  const findingProject = searchingProject(state, payload);
  return findingProject.tasks.taskList.find(task => {
    return task.name === payload.task.name;
  });
};

const searchingSubTask = (state, payload) => {
  const findingTask = searchingTask(state, payload);
  return findingTask.subTasks.find(subTask => {
    return subTask.name === payload.nameSubtask;
  });
};

export const addTaskToProject = (state, payload) => {
  return state.projectList.map(p => {
    if (p.name === payload.project.name){
      p.taskList.push(payload.task);
      return {...p }
    }
    return p;
  })
};

export const changingStatusTask = (state, payload) => {
  const findingTask = searchingTask(state, payload);
  findingTask.status = payload.status;
  return state;
};

export const addSubtaskToTask = (state, payload) => {
  const findingTask = searchingTask(state, payload);
  const repeatingSubtask = findingTask.subTasks.find(task => {
    return task.name === payload.subTask.name;
  });

  if (!repeatingSubtask) {
    findingTask.subTasks = [
    ...findingTask.subTasks,
    payload.subTask
    ]
  }

  return state;
};

export const changingStatusSubTask = (state, payload) => {
  const findingSubTask = searchingSubTask(state, payload);
  findingSubTask.done = payload.status;
  return state;
};

export const addDescriptionToTask = (state, payload) => {
  const findingTask = searchingTask(state, payload);
  findingTask.description = payload.description;
  return state;
}
*/

/*
 * Utils 
*/

export const searchElementInArray = (array, element, key) => {
  return array.find(item => item[key] === element);
}

export const checkRepeatingProjectName = (projectsArray, projectTitle) => 
  !!projectsArray.find(project => project.name === projectTitle)
