import express from "express";
import messageRouter from "./messages.router.js";

const router = express.Router();

router.use("/message", messageRouter);

export default router;