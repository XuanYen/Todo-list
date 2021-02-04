import axios from 'axios';

const ADD_TODO = 'ADD_TODO';
const SET_TODOS = 'SET_TODOS';
const initialState = {
    items: []
}
export const addTodo = (text) => ({ type: ADD_TODO, payload: text });
export const setTodos=(items)=>({
    type: SET_TODOS,
    payload: items
})

export const fetchTodos=()=>async(dispatch)=>{
    const res= await axios.get('https://jsonplaceholder.typicode.com/todos');
    dispatch(setTodos(res.data));
}
const reducer=(state = initialState, action)=>{
    switch (action.type) {
        case ADD_TODO:
            return {
                ...state,
                items: [...state.items, action.payload]
            }
        case SET_TODOS:
            return{
                ...state,
                items: action.payload
            }
        default:
            return state;
    }
}
export default reducer;