import express from "express";
import homeRouter from "./api/home.router.js";
import apiRouter from "./api/index.api.router.js";
import errorRouter from "./api/error.router.js";
import footerRouter from "./api/footer.router.js";

const router = express.Router();

// footer
router.use("/legal", footerRouter);
router.use("/rgpd", footerRouter);
router.use("/site", footerRouter);
router.use("/contact", footerRouter);

// general
router.use("/", homeRouter);
router.use("/api", apiRouter);
router.use("*", errorRouter); // Warning : Toujours mettre cette ligne en dernière !!!

export default router;