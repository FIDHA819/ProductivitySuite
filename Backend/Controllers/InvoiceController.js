import Invoice from "../Models/InvoiceModel.js";

export const createInvoice = async (
  req,
  res
) => {
  try {
    const invoice =
      await Invoice.create(req.body);

    res.status(201).json(invoice);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getInvoices = async (
  req,
  res
) => {
  try {
    const invoices =
      await Invoice.find().sort({
        createdAt: -1,
      });

    res.json(invoices);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteInvoice = async (
  req,
  res
) => {
  try {
    await Invoice.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};