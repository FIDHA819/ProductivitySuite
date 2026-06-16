import axios from "axios";
import { API_URL } from "../config/api";

const API =
  `${API_URL}/api/contacts`;

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