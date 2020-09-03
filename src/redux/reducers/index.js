import {combineReducers} from 'redux';
import {modal} from './modal';
import {tasks} from './tasks';
import {projects} from './projects'

export const rootReducer = combineReducers({
  projects, 
  modal, 
  tasks
});