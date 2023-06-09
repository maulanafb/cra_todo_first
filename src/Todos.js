import { useState } from "react"


function Todo(){
    const [activity,setActivity] = useState('')
    const [message,setMessage] = useState('')
    const [todos,setTodos] = useState([])
    const [edit,setEdit] = useState([])
    function generateId(){
        return Date.now();
    }
    function editTodoHandler(todo){
        setEdit(todo);
        setActivity(todo.activity);
        console.log(activity)
    }

    function saveTodoHandler(e){
        e.preventDefault();
        if(!activity) return setMessage('Harus ada isinya cok baru bisa input :V');
        if(edit.id){
            const updatedTodo = {
                ...edit,
                activity
            }
            const editTodoIndex = todos.findIndex((currentIndex)=>{return currentIndex.id ===edit.id});

            const updatedTodos = [...todos];
            updatedTodos[editTodoIndex] = updatedTodo;
            setTodos(updatedTodos);
            return cancelEditHandler();
        }
        setTodos([...todos,{
            id:generateId(),
            activity,
            done:false
        }]);
        setActivity('');
        setMessage('');
    }
    function doneTodoHandler(todo){
        const updatedTodo = {
            ...todo,
            done: !todo.done
        }
        const doneTodoIndex = todos.findIndex((doneIndex)=>{return doneIndex.id === todo.id});

        const updatedTodos = [...todos];
        updatedTodos[doneTodoIndex] = updatedTodo;
        setTodos(updatedTodos);
    }
    function cancelEditHandler(){
        setEdit([]);
        setActivity('');
        setMessage('');
    }
    function deleteTodoHandler(todoId){
        setTodos(todos.filter((todo)=>{return todo.id !== todoId;}))
        cancelEditHandler();
    }
    return (<>
        <h1>Simpe React Todo List</h1>
        <p style={{ color:"red" }}>{message}</p>
        <form onSubmit={saveTodoHandler}>
            <input value={activity} type="text" onChange={(e)=>{setActivity(e.target.value)}}/>
            <button>{edit.id ? 'Simpan' : 'Tambah'}</button>
            {edit.id && <button onClick={cancelEditHandler}>Batal Edit</button>}
        </form>
        <ul>
            {todos.map(item=><li>
                <input checked={item.done} type="checkbox" onChange={doneTodoHandler.bind(this,item)}/>
                {item.activity}{item.done ? '(selesai)' : '(belum selesai)'}
                <button onClick={deleteTodoHandler.bind(this,item.id)}>Hapus</button>
                <button onClick={editTodoHandler.bind(this,item)}>Edit</button>
                </li>)}
        </ul>
    </>)
}

export default Todo;