import { combineReducers, applyMiddleware, createStore, compose } from 'redux';
import todos from './todos.js';

const reducer = combineReducers({
    todos: todos
})

/*const myMiddleware=store=>next=>action=>{
    if(action.type=='ADD_TODO' && action.payload=='ngu'){
        action.payload='***';
    }
    return next(action);
}*/
const asyncMiddleware=store=>next=>action=>{
    if(typeof action=='function'){
        action(next)
    }
}

export default function configStore(){
    const middlewareEnhancer = applyMiddleware(asyncMiddleware)
    const composedEnhancers = compose(middlewareEnhancer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
    const store = createStore(reducer, undefined, composedEnhancers)
    return store;
};