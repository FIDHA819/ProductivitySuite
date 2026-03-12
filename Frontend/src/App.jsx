import { useState } from "react";
import TodoApp from "./apps/Todo/TodoApp";
import Dashboard from "./components/Dashboard";
import Calculator from "./apps/CalculatorApp";

function App(){
  const [page,setPage]=useState('dashboard')
  return(
    <>
  {
    page==='dashboard'&& <Dashboard 
    openTodo={() => setPage("todo")}
    openCalculator={() => setPage("calculator")}
     />

  }
  {
    page==='todo'&&<TodoApp goBack={() => setPage("dashboard")} />
  }
  
  {
    page==='calculator'&&<Calculator goBack={() => setPage("dashboard")} />
  }

  

    </>
  )
}
export default App