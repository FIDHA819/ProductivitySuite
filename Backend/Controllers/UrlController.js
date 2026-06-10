
import Url from "../Models/UrlModel.js";
import crypto from "crypto";

export const createShortUrl = async (req, res) => {
  try {
    const { originalUrl } = req.body;

    const shortCode = crypto
      .randomBytes(3)
      .toString("hex");

    const newUrl = await Url.create({
      originalUrl,
      shortCode,
    });

    res.status(201).json(newUrl);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getUrls = async (req, res) => {
  try {
    const urls = await Url.find().sort({
      createdAt: -1,
    });

    res.json(urls);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const redirectUrl = async (req, res) => {
  try {
    const url = await Url.findOne({
      shortCode: req.params.code,
    });

    if (!url) {
      return res.status(404).json({
        message: "URL not found",
      });
    }

    url.clicks += 1;

    await url.save();

    res.redirect(url.originalUrl);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteUrl = async (req, res) => {
  try {
    await Url.findByIdAndDelete(req.params.id);

    res.json({
      message: "Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};