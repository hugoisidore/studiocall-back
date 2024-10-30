import express from "express";
import messagesRouter from "./messages.router.js";
import musicsRouter from "./musics.router.js";
import sacemRouter from "./sacem.router.js";
import aboutRouter from "./about.router.js";
import partnersRouter from "./partners.router.js";
import advisorRouter from "./advisor.router.js";
import footerRouter from "./footer.router.js";

const router = express.Router();

// header
router.use("/messages", messagesRouter);
router.use("/sacem", sacemRouter);
router.use("/about", aboutRouter);
router.use("/becoming", partnersRouter);
router.use("/advisor", advisorRouter);

// body
router.use("/musics", musicsRouter);

// footer
router.use("/legal", footerRouter);
router.use("/rgpd", footerRouter);
router.use("/site", footerRouter);
router.use("/contact", footerRouter);

export default router;
