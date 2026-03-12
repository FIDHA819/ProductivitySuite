import { forwardRef } from "react";

const CalculatorInput=forwardRef((props,ref)=>{
    return (
        <>
        <input ref={ref} placeholder="type like 2+3"/>
        </>
    )
})
export default CalculatorInput