import { useState } from "react";
import TodoApp from "./apps/Todo/TodoApp";
import Dashboard from "./components/Dashboard";
import Calculator from "./apps/Calculator/CalculatorApp";
import ExpenseCalculatorApp from "./apps/expense/ExpensePage";
import HabitPage from "./apps/HabitTracker/HabitPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

function App(){
  const [page,setPage]=useState('dashboard')
  return(
    <>
  
  {
    page==='dashboard'&& <Dashboard 
    openTodo={() => setPage("todo")}
    openCalculator={() => setPage("calculator")}
    openExpense={()=>setPage("expense")}
    openHabit={()=>setPage("habit")}
     />

  }
  {
    page==='todo'&&<TodoApp goBack={() => setPage("dashboard")} />
  }
  
  {
    page==='calculator'&&<Calculator goBack={() => setPage("dashboard")} />
  }
{
  page==='expense'&&<ExpenseCalculatorApp goBack={()=>setPage("dashboard")}/>
}
{
  page==='habit'&&<HabitPage goBack={()=>setPage("dashboard")}/>
}
    <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="light"
      />
  

    </>
  )
}
export default App