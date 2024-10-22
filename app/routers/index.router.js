import express from "express";
import apiRouter from "./api/index.api.router.js";
import homeRouter from "./api/home.router.js";

const router = express.Router();

router.use("/", homeRouter);
router.use("/api", apiRouter);

export default router;