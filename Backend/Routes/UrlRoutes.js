import express from "express";

import {
  createShortUrl,
  getUrls,
  redirectUrl,
  deleteUrl,
} from "../Controllers/UrlController.js";

const router = express.Router();

router.post("/", createShortUrl);

router.get("/", getUrls);

router.get("/:code", redirectUrl);

router.delete("/:id", deleteUrl);

export default router;