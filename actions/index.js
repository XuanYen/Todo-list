import * as types from '../constants/ActionTypes';

export const addToDo = (text) => ({ type: types.ADD_TODO, text });