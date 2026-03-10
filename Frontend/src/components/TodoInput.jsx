import { useState } from "react"

function TodoInput({addTodo}){
    const [text,setText]=useState("")
return(
    <>
<input value={text} onChange={(e)=>setText(e.target.value)}/>
<button onClick={()=>{addTodo(text)} }>Add</button>
    </>
)
}
export default TodoInput