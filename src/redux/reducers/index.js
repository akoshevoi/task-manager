import {combineReducers} from 'redux';
import {modal} from './modal';
import {tasks} from './tasks';

export const rootReducer = combineReducers({modal, tasks});