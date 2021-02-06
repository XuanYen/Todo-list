import axios from 'axios';

const ADD_TODO = 'ADD_TODO';
const EDIT_TODO= 'EDIT_TODO';
const SET_TODOS = 'SET_TODOS';
const DELETE_TODO= 'DELETE_TODO';
const initialState = {
    items: []
}
//export const addTodo = (text) => ({ type: ADD_TODO, payload: text });
export const addTodo=(text)=>async dispatch=>{
    const res=await axios.post('https://jsonplaceholder.typicode.com/todos',{
        userId: 1,
        title: text,
        completed: false,
    });
    if(res.status===201){
        dispatch({ type: ADD_TODO, payload: res.data});
    }
}
export const editTodo=({payload})=>async dispatch=>{
    const res=await axios.put(`https://jsonplaceholder.typicode.com/todos/${payload.data.id}`,payload.data)
    if(res.status===200){
        dispatch({ type: EDIT_TODO, payload: res.data});
        payload.onSuccess()
    }
}

export const deleteTodo=({payload})=>async dispatch=>{
    const res=await axios.delete(`https://jsonplaceholder.typicode.com/todos/${payload.data.id}`)
    if(res.status===200){
        dispatch({ type: DELETE_TODO, payload: payload.data});
    }
}
export const setTodos=(items)=>({
    type: SET_TODOS,
    payload: items
})

export const fetchTodos=()=>async(dispatch)=>{
    const res= await axios.get('https://jsonplaceholder.typicode.com/todos');
    if(res.status===200){
        dispatch(setTodos(res.data));
    }
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
        case EDIT_TODO: {
            return{
                ...state,
                items: state.items.map(item=>{
                    if(item.id===action.payload.id){
                        return action.payload
                    } else return item;
                })
            }
        }
        case DELETE_TODO: {
            return{
                ...state,
                items: state.items.filter(item=>item.id!==action.payload)
            }
        }
        default:
            return state;
    }
}
export default reducer;