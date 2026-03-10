import { useEffect, useState } from "react"
import TodoInput from "../../components/TodoInput"


function TodoApp({goBack}) {
   
    const [todo,setTodo]=useState(()=>{
            const storedTodo=localStorage.getItem("todo")
            return storedTodo ? JSON.parse(storedTodo) : []
    })
    const addTodo=(text)=>{
        setTodo([...todo,text])
       
        
    }
    const deleteTodo=(index)=>{
        setTodo(todo.filter((_,i)=>i!==index))
    }
   
  
    useEffect(()=>{
        localStorage.setItem("todo",JSON.stringify(todo))
    },[todo])
   
    return (
        <>
        <h1>To-Do App</h1>
        <h2>this is day1 react app</h2>
      <TodoInput addTodo={addTodo}/>
   
        <ul>
            {todo.map((todo,index)=>(
                   <li key={index}>{index+1}-{todo} -     <button onClick={()=>deleteTodo(index)}>Delete</button></li>
                   
            )
               
             
        )}
        </ul>
        <button onClick={goBack} >Back</button>

        </>
    )
    
}
export default TodoApp