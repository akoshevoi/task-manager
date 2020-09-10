import React from 'react';
import Paper from '@material-ui/core/Paper';

const ProjectCard = ({handleClick, project}) => {
  return (
    <div 
      className='project-card' 
      onClick={handleClick}
    >   
      <Paper>
        <div className='project-card__inner'>
        <h4 className='project-card__name'>{project.name}</h4>
        </div>
      </Paper>
    </div>
  );
};

export default ProjectCard;