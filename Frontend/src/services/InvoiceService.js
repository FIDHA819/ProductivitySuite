import axios from "axios";

const API = "http://localhost:5000/api/invoices";

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