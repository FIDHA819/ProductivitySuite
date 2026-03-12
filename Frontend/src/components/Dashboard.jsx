function Dashboard({openTodo,openCalculator}){
    return(
        <>
        <h1>7 day React App</h1>
        <button onClick={openTodo}>Todo App</button>
        <button onClick={openCalculator}>Calculator App</button>
        </>
    )

}
export default Dashboard