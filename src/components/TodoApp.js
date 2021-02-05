import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {addTodo, setTodos, fetchTodos} from '../reducers/todos';


function TodoApp(props){
    const [text, setText]=useState('');
    const [isEdit, setIsEdit]=useState(false);
    /*useEffect(()=>{
        axios.get('https://jsonplaceholder.typicode.com/todos').then(res=>{
            props.setTodos(res.data)
        })
    },[props.setTodos])*/
    const editTask=(id)=>{
        console.log(id)
    }
    useEffect(()=>{props.fetchTodos()},[props.fetchTodos])
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
                                <button className='btn btn-primary' data-toggle="modal" data-target="#editModal">Edit</button>
                                <button className='btn btn-danger'>Delete</button>
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
                        ...
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                    </div>
                </div>
                </div>

<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
  Launch demo modal
</button>


<div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        ...
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save changes</button>
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
    /*fetchTodos: ()=>{
        axios.get('https://jsonplaceholder.typicode.com/todos').then(res=>{
            dispatch(setTodos(res.data))
        })
    }*/
    fetchTodos: ()=>dispatch(fetchTodos())
})
export default connect(mapStateToProps, mapActionsToProps)(TodoApp);