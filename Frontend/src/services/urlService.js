import axios from "axios";

const API =
  "http://localhost:5000/api/url";

export const getUrls = () =>
  axios.get(API);

export const createUrl = (data) =>
  axios.post(API, data);

export const deleteUrl = (id) =>
  axios.delete(`${API}/${id}`);