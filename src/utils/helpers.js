export const searchElementInArray = (array, element, key) => {
  return array.find(item => item[key] === element);
}

export const checkRepeatingProjectName = (projectsArray, projectTitle) => 
  !!projectsArray.find(project => project.name === projectTitle)
