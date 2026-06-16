import axios from "axios";
import { API_URL } from "../config/api";

const API=`${API_URL}/api/habits`;

export const getHabits=()=>axios.get(API);

export const createHabit=(data)=>axios.post(API,data);

export const deleteHabit=(id)=>axios.delete(`${API}/${id}`);

export const updateHabit=(id,data)=>
axios.put(`${API}/${id}`,data);

export const completeHabit=(id)=>
axios.patch(`${API}/${id}/complete`);