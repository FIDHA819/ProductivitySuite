import { useState } from "react";
import TodoApp from "./apps/Todo/TodoApp";
import Dashboard from "./components/Dashboard";
import Calculator from "./apps/Calculator/CalculatorApp";
import ExpenseCalculatorApp from "./apps/expense/ExpensePage";
import HabitPage from "./apps/HabitTracker/HabitPage";
import URLShortenerPage from "./apps/UrlShortner/UrlShortenerPage";
import InvoicePage from "./apps/InvoiceGenerator/InvoicePage";
import QRCodeGenerator from "./apps/QRGenerator/QRGeneratorPage";
import PromodoroTimer from "./apps/Promodoro/PromodoroPage";
import ContactManager from "./apps/ContactManager/ContactPage";
import AgeCalculator from "./apps/AgeCalculator/AgeCalculatorPage";
import StudentResultPage from "./apps/StudentResult/StudentResultPage";
import BMICalculator from "./apps/BMICalculator/BMICalculatorPage";
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
    openUrl={() => setPage("urlShortener")}
    openInvoice={() => setPage("invoice")}
    openQRCodeGenerator={() => setPage("qrCodeGenerator")}
    openPromodoroTimer={() => setPage("promodoroTimer")}
    openContact={() => setPage("contactManager")} 
    openAgeCalculator={() => setPage("ageCalculator")}
    openStudentResult={() => setPage("studentResult")}
      openBMICalculator={() => setPage("bmiCalculator")}
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
{
  page==='urlShortener'&&<URLShortenerPage goBack={()=>setPage("dashboard")}/>
}
{
  page==='invoice'&&<InvoicePage goBack={()=>setPage("dashboard")}/>
}
{
  page==='qrCodeGenerator'&&<QRCodeGenerator goBack={()=>setPage("dashboard")}/>
}
{
  page==='promodoroTimer'&&<PromodoroTimer goBack={()=>setPage("dashboard")}/>
}
{
  page==='contactManager'&&<ContactManager goBack={()=>setPage("dashboard")}/>
}
{
  page==='ageCalculator'&&<AgeCalculator goBack={()=>setPage("dashboard")}/>
}
{
  page==='studentResult'&&<StudentResultPage goBack={()=>setPage("dashboard")}/>
}
{
  page==='bmiCalculator'&&<BMICalculator goBack={()=>setPage("dashboard")}/>
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