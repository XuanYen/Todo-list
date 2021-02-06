import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import $ from 'jquery'; 
import {addTodo, setTodos, fetchTodos, editTodo, deleteTodo} from '../reducers/todos';


function TodoApp(props){
    const {fetchTodos}=props;
    const [text, setText]=useState('');
    const [textEdit, setTextEdit]=useState({});
    /*useEffect(()=>{
        axios.get('https://jsonplaceholder.typicode.com/todos').then(res=>{
            props.setTodos(res.data)
        })
    },[props.setTodos])*/
    const showEditModal=(task)=>{
        $('#task').val(task.title);
        window.$('#editModal').modal('show');
        setTextEdit(task);
    }
    const saveTask=()=>{
        let todo={...textEdit, title: $('#task').val()}
        props.editTodo({
            payload:{
                data: todo,
                onSuccess: ()=>handleEditSuccess()
            }
        });
    }
    const handleEditSuccess=()=>{
        window.$('#editModal').modal('hide');
    }
    const deleteTask=(id)=>{
        props.deleteTodo({
            payload:{
                data: id
            }
        })
    }
    useEffect(()=>{fetchTodos()},[fetchTodos])
    return(
        <div>
            <input type='text' value={text} onChange={e=>setText(e.target.value)} />
            <button onClick={()=>{
                props.addTodo(text);
                setText('');
            }}>Add</button>
            <table>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Task</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {props.todos.map(todo=>(
                        <tr key={todo.id} className='mb-5'>
                            <td>{todo.id}</td>
                            <td>{todo.title}</td>
                            <td>
                                <button className='btn btn-primary' onClick={()=>showEditModal(todo)}>Edit</button>
                                <button className='btn btn-danger' onClick={()=>deleteTask(todo.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="modal fade" id="editModal" tabIndex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="editModalLabel">Edit form</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <input type="text" className="form-control" id="task" placeholder="Enter task" /> 
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" >Close</button>
                        <button type="button" className="btn btn-primary" onClick={()=>saveTask()}>Save changes</button>
                    </div>
                    </div>
                </div>
            </div>    
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
    editTodo: (todo)=>dispatch(editTodo(todo)),
    deleteTodo: (id)=>dispatch(deleteTodo(id)),
    /*fetchTodos: ()=>{
        axios.get('https://jsonplaceholder.typicode.com/todos').then(res=>{
            dispatch(setTodos(res.data))
        })
    }*/
    fetchTodos: ()=>dispatch(fetchTodos())
})
export default connect(mapStateToProps, mapActionsToProps)(TodoApp);