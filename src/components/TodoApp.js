import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {addTodo, setTodos, fetchTodos} from '../reducers/todos';


function TodoApp(props){
    const [text, setText]=useState('');
    /*useEffect(()=>{
        axios.get('https://jsonplaceholder.typicode.com/todos').then(res=>{
            props.setTodos(res.data)
        })
    },[props.setTodos])*/

    useEffect(()=>{props.fetchTodos()},[props.fetchTodos])
    return(
        <div>
            <input type='text' value={text} onChange={e=>setText(e.target.value)} />
            <button onClick={()=>{
                props.addTodo(text);
                setText('');
            }}>Add</button>
            <ul>
                {props.todos.map(todo=><li key={todo.id}>{todo.title}</li>)}
            </ul>
        </div>
    )
}
const mapStateToProps=(state)=>{
    return{
        todos: state.todos.items
    }
}
const mapActionsToProps=dispatch=>({
    addTodo: (text)=>dispatch(addTodo(text)),
    setTodos: (items)=>dispatch(setTodos(items)),
    /*fetchTodos: ()=>{
        axios.get('https://jsonplaceholder.typicode.com/todos').then(res=>{
            dispatch(setTodos(res.data))
        })
    }*/
    fetchTodos: ()=>dispatch(fetchTodos())
})
export default connect(mapStateToProps, mapActionsToProps)(TodoApp);