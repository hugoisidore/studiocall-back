import express from "express";
import apiRouter from "./api/index.api.router.js";
import homeRouter from "./api/home.router.js";
import errorRouter from "./api/error.router.js";

const router = express.Router();

router.use("/", homeRouter);
router.use("/api", apiRouter);
router.use("*", errorRouter);

export default router;