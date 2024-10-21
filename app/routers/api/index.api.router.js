import express from "express";
import messageRouter from "./messages.router.js";
import musicRouter from "./musics.router.js";

const router = express.Router();

router.use("/message", messageRouter);
router.use("/music", musicRouter);

export default router;
