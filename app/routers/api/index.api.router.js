import express from "express";
import messagesRouter from "./messages.router.js";
import musicsRouter from "./musics.router.js";

const router = express.Router();

router.use("/messages", messagesRouter);
router.use("/musics", musicsRouter);

export default router;
