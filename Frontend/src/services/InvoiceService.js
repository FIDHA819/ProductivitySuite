import axios from "axios";
import { API_URL } from "../config/api";

const API = `${API_URL}/api/invoices`;

export const getInvoices = () => axios.get(API);

export const createInvoice = (data) =>
  axios.post(API, data);

export const deleteInvoice = (id) =>
  axios.delete(`${API}/${id}`);

export const updateInvoiceStatus = (
  id,
  status
) =>
  axios.patch(`${API}/${id}`, {
    status,
  });