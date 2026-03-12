
import { useState,useRef } from "react"
import CalculatorInput from "../components/CalculatorInput"

function Calculator({goBack}){

const [value,setValue] = useState("")
const [mode,setMode]=useState("state")
const [refResult,setRefResult]=useState("")
const inputRef=useRef(null)

    //    const showValue=()=>{
    //     console.log(inputRef.current.value)
    //    }
       const focusInput=()=>{
        inputRef.current.focus
       }

const handleClick = (val)=>{
setValue(value + val)
}

const calculate = ()=>{
setValue(eval(value))
}

const clear = ()=>{
setValue("")
}
const calculateRef=()=>{
    const result=eval(inputRef.current.value)
    inputRef.current.value=result
    setRefResult(result)
    
}
const clearRef=()=>{
    inputRef.current.value=''
}

return(

<>
<h1>Day 2 Calculator</h1>
<button onClick={()=>{setMode(mode=='state'?'ref':'state')}}>Change mode</button>
<br/>

{mode=='state'&&(
    <>
    <h3>UseState calculator</h3>

    <input value={value} readOnly />

<div>

<button onClick={()=>handleClick("1")}>1</button>
<button onClick={()=>handleClick("2")}>2</button>
<button onClick={()=>handleClick("3")}>3</button>

<button onClick={()=>handleClick("+")}>+</button>
<br></br>
<button onClick={()=>handleClick("4")}>4</button>
<button onClick={()=>handleClick("5")}>5</button>
<button onClick={()=>handleClick("6")}>6</button>

<button onClick={()=>handleClick("-")}>-</button>
<br></br>
<button onClick={()=>handleClick("7")}>7</button>
<button onClick={()=>handleClick("8")}>8</button>
<button onClick={()=>handleClick("9")}>9</button>

<button onClick={()=>handleClick("*")}>*</button>
<br></br>
<button onClick={()=>handleClick("0")}>0</button>

<button onClick={calculate}>=</button>

<button onClick={()=>handleClick("/")}>/</button>

<button onClick={clear}>C</button>

</div>
</>

)}
{mode=='ref'&&(
        <>
   <h3>UseRef calculator</h3>
       
       <CalculatorInput ref={inputRef}/>


<button onClick={calculateRef}>=</button>
<button >{refResult}</button>


<br></br>
<button onClick={clearRef}>Clear </button>
       <button onClick={focusInput}>Focus Result</button>
   
        
        
             </>
)}
<br></br>

<button onClick={goBack}>Back</button>

</>

)

}

export default Calculator