import axios from "axios";
import { API_URL } from "../config/api";

const API = `${API_URL}/api/url`;

export const getUrls = () =>
  axios.get(API);

export const createUrl = (data) =>
  axios.post(API, data);

export const deleteUrl = (id) =>
  axios.delete(`${API}/${id}`);