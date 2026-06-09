import axios from "axios";

const API="http://localhost:5000/api/habits";

export const getHabits=()=>axios.get(API);

export const createHabit=(data)=>axios.post(API,data);

export const deleteHabit=(id)=>axios.delete(`${API}/${id}`);

export const updateHabit=(id,data)=>
axios.put(`${API}/${id}`,data);

export const completeHabit=(id)=>
axios.patch(`${API}/${id}/complete`);