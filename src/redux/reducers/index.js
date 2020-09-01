import {combineReducers} from 'redux';
import {modalIsOpen} from './modal';
import {tasks} from './tasks';

export const rootReducer = combineReducers({modalIsOpen, tasks});