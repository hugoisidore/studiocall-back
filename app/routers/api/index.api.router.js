import express from "express";
import messagesRouter from "./messages.router.js";
import musicsRouter from "./musics.router.js";
import sacemRouter from "./sacem.router.js";
import aboutRouter from "./about.router.js";
import partnersRouter from "./partners.router.js";
import advisorRouter from "./advisor.router.js";
import legalRouter from "./legal.router.js";

const router = express.Router();

router.use("/messages", messagesRouter);
router.use("/sacem", sacemRouter);
router.use("/about", aboutRouter);
router.use("/musics", musicsRouter);
router.use("/becoming", partnersRouter);
router.use("/advisor", advisorRouter);
router.use("/legal", legalRouter);

export default router;
