import { combineReducers, applyMiddleware, createStore } from 'redux';
import todos from './todos.js';

const reducer = combineReducers({
    todos: todos
})

const myMiddleware=store=>next=>action=>{
    if(action.type=='ADD_TODO' && action.payload=='ngu'){
        action.payload='***';
    }
    return next(action);
}
const asyncMiddleware=store=>next=>action=>{
    if(typeof action=='function'){
        action(next)
    }
}

export default function configStore(){
    return createStore(reducer,applyMiddleware(asyncMiddleware, myMiddleware));
};