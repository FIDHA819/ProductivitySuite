import Contact from "../Models/Contact.js";

export const createContact = async (
  req,
  res
) => {
  try {
    const contact =
      await Contact.create(req.body);

    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getContacts = async (
  req,
  res
) => {
  try {
    const contacts =
      await Contact.find().sort({
        createdAt: -1,
      });

    res.json(contacts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateContact = async (
  req,
  res
) => {
  try {
    const contact =
      await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json(contact);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteContact = async (
  req,
  res
) => {
  try {
    await Contact.findByIdAndDelete(
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