export const calculateStreak=(dates)=>{

  if(!dates.length) return 0;

  const sorted=[...dates].sort().reverse();

  let streak=0;

  let current=new Date();

  for(let date of sorted){

    const check=current.toISOString().split("T")[0];

    if(date===check){
      streak++;

      current.setDate(current.getDate()-1);
    }
    else{
      break;
    }
  }

  return streak;
};