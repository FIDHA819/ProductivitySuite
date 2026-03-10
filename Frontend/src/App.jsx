import { useState } from "react";
import TodoApp from "./apps/Todo/TodoApp";
import Dashboard from "./components/Dashboard";

function App(){
  const [page,setPage]=useState('dashboard')
  return(
    <>
  {
    page==='dashboard'&& <Dashboard openTodo={() => setPage("todo")} />

  }
  {
    page==='todo'&&<TodoApp goBack={() => setPage("dashboard")} />
  }
  

    </>
  )
}
export default App