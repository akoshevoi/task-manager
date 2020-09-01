import React from 'react';
import Paper from '@material-ui/core/Paper';

const CardName = ({task}) => {
  return (
  
      <div className='card-name'>
  <Paper>
        {task.name}
        </Paper>
      </div> 
    
  );
};

export default CardName;