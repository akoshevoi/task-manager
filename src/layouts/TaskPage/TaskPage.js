import React from 'react';
import Header from '../Header';
import TaskBoard from '../../containers/TaskBoard';

const TaskPage = () => (
  <div className='app'>
    <Header />
    <TaskBoard />
  </div>
);

export default TaskPage;