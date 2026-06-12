import axios from "axios";

const API =
  "http://localhost:5000/api/contacts";

export const getContacts = () =>
  axios.get(API);

export const createContact = (
  data
) => axios.post(API, data);

export const updateContact = (
  id,
  data
) =>
  axios.put(
    `${API}/${id}`,
    data
  );

export const deleteContact = (id) =>
  axios.delete(`${API}/${id}`);